import type { Metadata } from "next";

import { CartPageContent } from "@/components/poppy/cart-page-content";
import { getCartIdFromCookies } from "@/lib/cart/cookie";
import { getStorefrontCartById } from "@/lib/shopify/cart";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Winkelwagen",
  pageDescriptions.cart
);

export default async function CartPage() {
  const cartId = await getCartIdFromCookies();
  const cart = cartId ? await getStorefrontCartById(cartId) : null;

  return (
    <main className="bg-brand-off-white pt-28">
      <CartPageContent cart={cart} />
    </main>
  );
}
