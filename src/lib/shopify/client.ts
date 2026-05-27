import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const DEFAULT_API_VERSION = "2026-01";

export function hasShopifyConfig() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

export function getShopifyClient() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!storeDomain || !publicAccessToken) {
    throw new Error(
      "Missing Shopify configuration. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  return createStorefrontApiClient({
    storeDomain,
    apiVersion: process.env.SHOPIFY_API_VERSION ?? DEFAULT_API_VERSION,
    publicAccessToken,
  });
}
