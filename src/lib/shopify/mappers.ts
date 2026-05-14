import type { ShopifyProductNode, StorefrontProduct } from "./types";

export function mapShopifyProduct(
  product: ShopifyProductNode
): StorefrontProduct {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    availableForSale: product.availableForSale,
    price: product.priceRange.minVariantPrice,
    featuredImage: product.featuredImage,
    images: product.images.edges.map(({ node }) => node),
    variants: product.variants.edges.map(({ node }) => node),
  };
}
