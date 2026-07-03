import type { StorefrontProductMetafields } from "./metafields";

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

export type ShopifyMetafield = {
  namespace: string;
  key: string;
  value: string;
  type: string;
};

export type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  featuredImage: ShopifyImage | null;
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  metafields: (ShopifyMetafield | null)[];
};

export type StorefrontProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  metafields: StorefrontProductMetafields;
};

export type ShopifyCollectionNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image: ShopifyImage | null;
  products: {
    edges: Array<{
      node: ShopifyProductNode;
    }>;
  };
};

export type StorefrontCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image: ShopifyImage | null;
  products: StorefrontProduct[];
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: ShopifyProductVariant & {
          product: {
            title: string;
            handle: string;
            featuredImage?: ShopifyImage | null;
          };
        };
      };
    }>;
  };
};
