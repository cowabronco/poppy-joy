"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addLinesToStorefrontCart,
  createStorefrontCart,
  removeLinesFromStorefrontCart,
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

  const existingCartId = await getCartIdFromCookies();
  let cart =
    existingCartId !== null
      ? await addLinesToStorefrontCart(existingCartId, lines).catch(() => null)
      : null;

  if (!cart) {
    cart = await createStorefrontCart(lines);
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

export async function goToCheckout() {
  const cartId = await getCartIdFromCookies();

  if (!cartId) {
    redirect("/cart");
  }

  const { getStorefrontCartById } = await import("@/lib/shopify/cart");
  const cart = await getStorefrontCartById(cartId);

  if (cart?.checkoutUrl) {
    redirect(cart.checkoutUrl);
  }

  redirect("/cart");
}
