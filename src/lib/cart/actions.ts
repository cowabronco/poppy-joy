"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addLinesToStorefrontCart,
  createStorefrontCart,
} from "@/lib/shopify/cart";

import { getCartIdFromCookies, setCartIdCookie } from "./cookie";

function parseQuantity(rawQuantity: FormDataEntryValue | null) {
  const quantity = Number(rawQuantity);
  if (!Number.isFinite(quantity)) {
    return 1;
  }

  return Math.min(Math.max(Math.trunc(quantity), 1), 12);
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

  const quantity = parseQuantity(formData.get("quantity"));
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
