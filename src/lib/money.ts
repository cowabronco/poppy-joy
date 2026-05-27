import type { ShopifyMoney } from "@/lib/shopify/types";

export function formatMoney(price?: ShopifyMoney | null) {
  if (!price) {
    return null;
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: price.currencyCode,
  }).format(Number(price.amount));
}
