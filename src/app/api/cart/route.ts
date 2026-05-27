import { NextResponse } from "next/server";

import { getCartIdFromCookies } from "@/lib/cart/cookie";
import { getStorefrontCartById } from "@/lib/shopify/cart";

export async function GET() {
  const cartId = await getCartIdFromCookies();

  if (!cartId) {
    return NextResponse.json({ totalQuantity: 0, cart: null });
  }

  try {
    const cart = await getStorefrontCartById(cartId);

    if (!cart) {
      return NextResponse.json({ totalQuantity: 0, cart: null });
    }

    return NextResponse.json({
      totalQuantity: cart.totalQuantity,
      cart,
    });
  } catch {
    return NextResponse.json({ totalQuantity: 0, cart: null });
  }
}
