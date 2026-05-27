import { getShopifyClient, hasShopifyConfig } from "./client";
import { mapShopifyProduct } from "./mappers";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "./queries";
import type { ShopifyProductNode, StorefrontProduct } from "./types";

type ProductsResponse = {
  products: {
    edges: Array<{
      node: ShopifyProductNode;
    }>;
  };
};

type ProductByHandleResponse = {
  product: ShopifyProductNode | null;
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

export async function getFeaturedImageByHandle(): Promise<Record<string, string>> {
  try {
    const storefrontProducts = await getStorefrontProducts(20);

    return storefrontProducts.reduce<Record<string, string>>((acc, product) => {
      const imageUrl =
        product.featuredImage?.url ?? product.images[0]?.url ?? null;

      if (imageUrl) {
        acc[product.handle] = imageUrl;
      }

      return acc;
    }, {});
  } catch (error) {
    console.error("Unable to load Shopify product images.", error);
    return {};
  }
}
