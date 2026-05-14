import type {
  ShopifyCollectionNode,
  ShopifyProductNode,
  StorefrontCollection,
  StorefrontProduct,
} from "./types";

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

export function mapShopifyCollection(
  collection: ShopifyCollectionNode
): StorefrontCollection {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    descriptionHtml: collection.descriptionHtml,
    image: collection.image,
    products: collection.products.edges.map(({ node }) =>
      mapShopifyProduct(node)
    ),
  };
}
