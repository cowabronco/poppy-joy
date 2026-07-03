import {
  createStorefrontApiClient,
  type StorefrontApiClient,
} from "@shopify/storefront-api-client";

const DEFAULT_API_VERSION = "2026-01";

const shopifyFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

let shopifyClient: StorefrontApiClient | null = null;

export function hasShopifyConfig() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

export function getShopifyClient() {
  if (shopifyClient) {
    return shopifyClient;
  }

  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!storeDomain || !publicAccessToken) {
    throw new Error(
      "Missing Shopify configuration. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  shopifyClient = createStorefrontApiClient({
    storeDomain,
    apiVersion: process.env.SHOPIFY_API_VERSION ?? DEFAULT_API_VERSION,
    publicAccessToken,
    customFetchApi: shopifyFetch,
  });

  return shopifyClient;
}
