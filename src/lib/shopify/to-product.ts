import type { Product } from "@/lib/products";
import { formatMoney } from "@/lib/money";

import {
  buildProductDetails,
  deriveMaterialTags,
} from "./metafields";
import type { ShopifyImage, StorefrontProduct } from "./types";

export function getPrimaryImageUrl(product: StorefrontProduct): string | undefined {
  return product.featuredImage?.url ?? product.images[0]?.url;
}

export function mapStorefrontToDisplayProduct(
  product: StorefrontProduct
): Product {
  const { metafields } = product;

  return {
    handle: product.handle,
    name: product.title,
    price:
      formatMoney(product.price) ??
      `€${Number(product.price.amount).toFixed(2).replace(".", ",")}`,
    subtitle: metafields.colorStory ?? "",
    description: product.description,
    details: buildProductDetails(
      metafields.composition,
      metafields.dimensions,
      metafields.certifications
    ),
    materialTags: deriveMaterialTags(metafields.material),
    materials: metafields.material ?? "",
    dimensions: metafields.dimensions ?? "",
    care: metafields.washingCare ?? "",
    story: metafields.craftNote ?? "",
    published: product.availableForSale,
  };
}

export function buildProductFactList(product: Product): string[] {
  const facts: string[] = [];
  const materials = product.materials.replace(/\.$/, "");

  if (materials) {
    facts.push(materials);
  }

  facts.push("Dubbelzijdig gestikt");
  facts.push("Handgemaakt in small batches");

  return facts;
}

export function getProductSummaryFacts(product: StorefrontProduct) {
  return {
    flagCount: product.metafields.flagCount ?? 12,
    productLength: product.metafields.productLength ?? 450,
  };
}

export function getGalleryImages(images: ShopifyImage[], productName: string) {
  return images.map((image, index) => ({
    type: "image" as const,
    src: image.url,
    alt: image.altText ?? `${productName} productafbeelding ${index + 1}`,
    aspectRatio: "4:5" as const,
  }));
}
