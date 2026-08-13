import { getShopifyClient, hasShopifyConfig } from "./client";
import { mapShopifyProduct } from "./mappers";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_HANDLES_QUERY,
  PRODUCTS_QUERY,
  VARIANT_BY_ID_QUERY,
} from "./queries";
import type { ShopifyProductNode, StorefrontProduct } from "./types";

type ProductsResponse = {
  products: {
    edges: Array<{
      node: ShopifyProductNode;
    }>;
  };
};

type ProductHandlesResponse = {
  products: {
    edges: Array<{
      node: {
        handle: string;
      };
    }>;
  };
};

type ProductByHandleResponse = {
  product: ShopifyProductNode | null;
};

type VariantByIdResponse = {
  node: {
    id: string;
    availableForSale: boolean;
    quantityAvailable: number | null;
  } | null;
};

export async function getStorefrontProducts(
  first = 20
): Promise<StorefrontProduct[]> {
  if (!hasShopifyConfig()) {
    return [];
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<ProductsResponse>(
    PRODUCTS_QUERY,
    {
      variables: { first },
    }
  );

  if (errors) {
    throw new Error(`Shopify products query failed: ${errors.message}`);
  }

  if (!data) {
    throw new Error("Shopify products query returned no data.");
  }

  return data.products.edges.map(({ node }) => mapShopifyProduct(node));
}

export async function getStorefrontProductHandles(
  first = 100
): Promise<string[]> {
  if (!hasShopifyConfig()) {
    return [];
  }

  try {
    const client = getShopifyClient();
    const { data, errors } = await client.request<ProductHandlesResponse>(
      PRODUCT_HANDLES_QUERY,
      {
        variables: { first },
      }
    );

    if (errors || !data) {
      return [];
    }

    return data.products.edges
      .map(({ node }) => node.handle)
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function getStorefrontProductByHandle(
  handle: string
): Promise<StorefrontProduct | null> {
  if (!hasShopifyConfig()) {
    return null;
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<ProductByHandleResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    {
      variables: { handle },
    }
  );

  if (errors) {
    throw new Error(`Shopify product query failed: ${errors.message}`);
  }

  if (!data) {
    throw new Error("Shopify product query returned no data.");
  }

  return data.product ? mapShopifyProduct(data.product) : null;
}

export async function getStorefrontVariantById(variantId: string) {
  if (!hasShopifyConfig()) {
    return null;
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<VariantByIdResponse>(
    VARIANT_BY_ID_QUERY,
    {
      variables: { id: variantId },
    }
  );

  if (errors) {
    throw new Error(`Shopify variant query failed: ${errors.message}`);
  }

  return data?.node ?? null;
}

export async function isStorefrontVariantAvailableForSale(
  variantId: string
): Promise<boolean> {
  const variant = await getStorefrontVariantById(variantId).catch(() => null);
  return Boolean(variant?.availableForSale);
}
