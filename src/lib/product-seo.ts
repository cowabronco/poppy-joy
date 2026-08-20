import { formatProductDescription } from "@/lib/products";
import type { StorefrontProduct } from "@/lib/shopify/types";
import { getProductSummaryFacts } from "@/lib/shopify/to-product";

export function productMetaTitle(name: string) {
  if (/\bvlaggenlijn(en)?\b/i.test(name)) {
    return name;
  }

  return `${name} vlaggenlijn`;
}

export function productMetaDescription(product: StorefrontProduct) {
  const { flagCount, productLength } = getProductSummaryFacts(product);
  const formatted = formatProductDescription(product.description);
  const firstStop = formatted.indexOf(". ");
  const firstSentence =
    firstStop === -1 ? formatted : formatted.slice(0, firstStop + 1);
  const facts = `Handgemaakt, ${flagCount} vlaggetjes, ${productLength} cm.`;

  return [firstSentence, facts].filter(Boolean).join(" ");
}
