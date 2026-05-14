# Shopify Setup

Poppy Joy uses Shopify Headless with the Storefront API. Shopify remains the
source of truth for products, collections, pricing, inventory, carts, and hosted
checkout.

## 1. Create The Storefront API Token

1. Log in to the Shopify admin for the Poppy Joy store.
2. Go to **Settings**.
3. Go to **Apps and sales channels**.
4. Click **Develop apps**.
5. If prompted, enable custom app development for the store.
6. Click **Create an app**.
7. Name it something like `Poppy Joy Headless Storefront`.
8. Open the app and go to **Configuration**.
9. Under **Storefront API integration**, click **Configure**.
10. Enable Storefront API access.
11. Select the minimum permissions needed:
    - Read products
    - Read product listings/collections
    - Read inventory/availability
    - Write cart / manage cart if shown as a Storefront permission
12. Save the configuration.
13. Go to **API credentials**.
14. Copy the **Storefront API access token**.

Important: this is not the Admin API token. It should not start with `shpat_`.

## 2. Local Environment

Create `.env.local` locally using `.env.example` as a template:

```bash
SHOPIFY_STORE_DOMAIN=poppy-joy.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_API_VERSION=2025-01
```

Never commit `.env.local`.

## 3. Create The Admin API Token

The Storefront API token is enough for the public website, but not for creating
metafield definitions or products. For setup scripts, create an Admin API access
token.

1. Open the Shopify app used for Poppy Joy development.
2. Configure **Admin API scopes**.
3. Enable the minimum scopes needed for setup:
   - `read_products`
   - `write_products`
   - `read_files`
   - `write_files`
   - `read_inventory`
   - `write_inventory`
   - `read_metaobject_definitions`
   - `write_metaobject_definitions`
4. If Shopify shows separate metafield scopes, also enable:
   - `read_metafields`
   - `write_metafields`
5. Save the configuration.
6. Install or reinstall the app on the store if Shopify prompts you.
7. Go to **API credentials**.
8. Copy the **Admin API access token**.

The Admin API token often starts with `shpat_`. Never expose it to the frontend
and never commit it.

Add it only to `.env.local`:

```bash
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_api_access_token
SHOPIFY_ADMIN_API_VERSION=2025-01
```

## 4. Vercel Environment

Add the same variables in Vercel:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION`

Add them to Preview and Production environments.

Do not add `SHOPIFY_ADMIN_ACCESS_TOKEN` to client-side code. Only add it to
Vercel if server-side admin automation is intentionally needed.

## 5. Product Fields To Prepare In Shopify

Each product should eventually include:

- Title
- Handle
- Price
- Description
- Product images
- Product video if available
- Material
- Dimensions / length
- Washing care
- Labels or certifications, such as Oeko-Tex
- Collection/drop, such as `Celebrate Joy`
- Availability

## 6. First Products

Recommended handles:

- `zig-zag`
- `double-joy`
- `poppy-dots`
- `wavy-joy`
- `cobalt-blue`
