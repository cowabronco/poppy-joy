"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getMetaCartAttributes,
  withCheckoutAttribution,
} from "@/lib/meta/cookies";
import { isValidFbclid } from "@/lib/meta/attribution";
import {
  addLinesToStorefrontCart,
  createStorefrontCart,
  removeLinesFromStorefrontCart,
  updateStorefrontCartAttributes,
} from "@/lib/shopify/cart";
import { getMaxPurchasableQuantity } from "@/lib/shopify/availability";
import { getStorefrontVariantById } from "@/lib/shopify/products";

import { getCartIdFromCookies, setCartIdCookie } from "./cookie";

function parseQuantity(
  rawQuantity: FormDataEntryValue | null,
  maxQuantity: number
) {
  const quantity = Number(rawQuantity);
  if (!Number.isFinite(quantity) || maxQuantity < 1) {
    return 1;
  }

  return Math.min(Math.max(Math.trunc(quantity), 1), maxQuantity);
}

function parseReturnPath(rawReturnPath: FormDataEntryValue | null) {
  if (typeof rawReturnPath !== "string" || !rawReturnPath.startsWith("/")) {
    return "/cart";
  }

  return rawReturnPath;
}

export async function addToCart(formData: FormData) {
  const variantId = formData.get("variantId");

  if (typeof variantId !== "string" || !variantId) {
    return;
  }

  const variant = await getStorefrontVariantById(variantId).catch(() => null);

  if (!variant?.availableForSale) {
    return;
  }

  const maxQuantity = getMaxPurchasableQuantity(variant);
  const quantity = parseQuantity(formData.get("quantity"), maxQuantity);

  if (quantity < 1 || quantity > maxQuantity) {
    return;
  }

  const returnPath = parseReturnPath(formData.get("returnPath"));
  const lines = [{ merchandiseId: variantId, quantity }];

  const [existingCartId, attributes] = await Promise.all([
    getCartIdFromCookies(),
    getMetaCartAttributes(),
  ]);
  let cart =
    existingCartId !== null
      ? await addLinesToStorefrontCart(existingCartId, lines).catch(() => null)
      : null;

  if (cart?.id && attributes.length > 0) {
    await updateStorefrontCartAttributes(cart.id, attributes).catch(() => null);
  }

  if (!cart) {
    cart = await createStorefrontCart(lines, attributes);
  }

  if (cart?.id) {
    await setCartIdCookie(cart.id);
  }

  revalidatePath("/cart");
  redirect(returnPath);
}

export async function removeFromCart(formData: FormData) {
  const lineId = formData.get("lineId");

  if (typeof lineId !== "string" || !lineId) {
    return;
  }

  const cartId = await getCartIdFromCookies();

  if (!cartId) {
    return;
  }

  const cart = await removeLinesFromStorefrontCart(cartId, [lineId]).catch(
    () => null
  );

  if (cart?.id) {
    await setCartIdCookie(cart.id);
  }

  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function goToCheckout(formData?: FormData) {
  const cartId = await getCartIdFromCookies();

  if (!cartId) {
    redirect("/cart");
  }

  const rawFbclid = formData?.get("fbclid");
  const fallbackFbclid =
    typeof rawFbclid === "string" && isValidFbclid(rawFbclid)
      ? rawFbclid
      : null;
  const attributes = await getMetaCartAttributes(fallbackFbclid);

  if (attributes.length > 0) {
    await updateStorefrontCartAttributes(cartId, attributes).catch(() => null);
  }

  const { getStorefrontCartById } = await import("@/lib/shopify/cart");
  const cart = await getStorefrontCartById(cartId);

  if (cart?.checkoutUrl) {
    redirect(await withCheckoutAttribution(cart.checkoutUrl, fallbackFbclid));
  }

  redirect("/cart");
}
