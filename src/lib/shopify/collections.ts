import { getShopifyClient, hasShopifyConfig } from "./client";
import { mapShopifyCollection } from "./mappers";
import {
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
} from "./queries";
import type {
  ShopifyCollectionNode,
  StorefrontCollection,
} from "./types";

type CollectionsResponse = {
  collections: {
    edges: Array<{
      node: ShopifyCollectionNode;
    }>;
  };
};

type CollectionByHandleResponse = {
  collection: ShopifyCollectionNode | null;
};

export async function getStorefrontCollections(
  first = 20
): Promise<StorefrontCollection[]> {
  if (!hasShopifyConfig()) {
    return [];
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<CollectionsResponse>(
    COLLECTIONS_QUERY,
    {
      variables: { first },
    }
  );

  if (errors) {
    throw new Error(`Shopify collections query failed: ${errors.message}`);
  }

  if (!data) {
    throw new Error("Shopify collections query returned no data.");
  }

  return data.collections.edges.map(({ node }) =>
    mapShopifyCollection(node)
  );
}

export async function getStorefrontCollectionByHandle(
  handle: string
): Promise<StorefrontCollection | null> {
  if (!hasShopifyConfig()) {
    return null;
  }

  const client = getShopifyClient();
  const { data, errors } =
    await client.request<CollectionByHandleResponse>(
      COLLECTION_BY_HANDLE_QUERY,
      {
        variables: { handle },
      }
    );

  if (errors) {
    throw new Error(`Shopify collection query failed: ${errors.message}`);
  }

  if (!data) {
    throw new Error("Shopify collection query returned no data.");
  }

  return data.collection ? mapShopifyCollection(data.collection) : null;
}
