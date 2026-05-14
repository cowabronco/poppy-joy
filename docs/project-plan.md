# Poppy Joy Project Plan

This document tracks the build order for the Poppy Joy website.

## Current Status

- [x] Repository initialized and connected to GitHub.
- [x] Next.js App Router project created.
- [x] Cursor rules added for project brief, technical approach, and design direction.
- [x] shadcn/ui initialized.
- [x] Definitive brand palette added to theme tokens.
- [x] Initial Poppy Joy component foundation created.
- [ ] Latest foundation work committed and pushed.

## Phase 1 - Brand And UI Foundation

- [x] Define brand palette:
  - `#FEFDFC` off-white background
  - `#F2EDE3` beige surfaces
  - `#242020` text
  - `#A3AE65` green accent
  - `#82569F` purple accent
- [x] Use option 11 as primary logo direction.
- [x] Record design direction in `docs/design-direction.md`.
- [x] Record design direction in `.cursor/rules/design-direction.mdc`.
- [x] Add minimal shadcn primitives: button, card, badge, accordion, sheet.
- [x] Create Poppy Joy component layer:
  - `Container`
  - `EditorialHeading`
  - `MediaFrame`
  - `Price`
  - `ProductCard`
- [ ] Add actual logo assets to `public/brand`.
- [ ] Replace text logo in header/footer with selected logo asset.

## Phase 2 - Commerce Foundation

- [x] Create Shopify store and confirm store domain.
- [x] Create Storefront API access token.
- [x] Define required product fields:
  - title
  - handle
  - price
  - description
  - images/video
  - material
  - dimensions
  - washing care
  - labels/certifications
  - collection/drop
  - availability
- [x] Add environment variable names:
  - `SHOPIFY_STORE_DOMAIN`
  - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
  - `SHOPIFY_API_VERSION`
- [x] Add Admin API environment variable names for setup automation:
  - `SHOPIFY_ADMIN_ACCESS_TOKEN`
  - `SHOPIFY_ADMIN_API_VERSION`
- [x] Create `src/lib/shopify` client.
- [x] Add typed product query and mapper foundation.
- [x] Keep local product data as fallback until Shopify content is live.
- [x] Document Shopify setup in `docs/shopify-setup.md`.
- [x] Document Shopify product model and metafields in `docs/shopify-product-model.md`.
- [x] Create product metafield definitions in Shopify.
- [x] Add products and publish them to the Headless sales channel.
- [ ] Add collection query and mapper.
- [ ] Add cart mutations for Shopify checkout handoff.

## Phase 3 - Media Foundation

- [ ] Define asset intake conventions for client photos and videos.
- [ ] Add reusable media components for image, video, poster, gallery, and product media.
- [ ] Use stable aspect ratios to avoid layout shift.
- [ ] Add alt text and SEO caption fields.
- [ ] Decide whether media comes from Shopify CDN, local assets, or another storage provider.

## Phase 4 - Page Build Order

- [ ] Homepage refinement with real media.
- [ ] Collection/shop page.
- [ ] Product detail page at `/products/[handle]`.
- [ ] Cart or mini-cart.
- [ ] Shopify hosted checkout handoff.
- [ ] Care page.
- [ ] Shipping and returns page.
- [ ] FAQ page.
- [ ] Contact page.
- [ ] Privacy policy page.
- [ ] Terms and conditions page.

## Phase 5 - Vercel And Domain

- [ ] Link repository to Vercel.
- [ ] Configure preview deployments.
- [ ] Configure production deployments from `main`.
- [ ] Add Shopify environment variables in Vercel.
- [ ] Add domain to Vercel.
- [ ] Configure DNS.
- [ ] Verify HTTPS, canonical domain, and redirects.

## Phase 6 - SEO, Analytics, And Launch QA

- [ ] Add metadata per page.
- [ ] Add Open Graph image.
- [ ] Add sitemap.
- [ ] Add robots.txt.
- [ ] Add product JSON-LD once Shopify data is live.
- [ ] Add analytics if desired.
- [ ] Test mobile and desktop layouts.
- [ ] Test full flow: homepage -> product -> cart -> Shopify checkout.
- [ ] Run production build before launch.

## Immediate Next Steps

1. Commit the latest foundation work.
2. Add option 11 logo assets to `public/brand`.
3. Replace text logo with the actual logo asset.
4. Start Phase 2 by preparing the Shopify env/client structure.
