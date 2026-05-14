# Shopify Product Model

This document defines how Poppy Joy products should be modeled in Shopify for
the headless Next.js storefront.

## Storefront Audit

Current Storefront API audit result:

- The Storefront API connection works.
- No products are currently returned by the Storefront API.
- This usually means products have not been created yet, are unpublished, or are
  not published to the Headless sales channel.

## Standard Shopify Fields To Use

Use Shopify's built-in product fields wherever possible:

- **Title**: product name, for example `Zig Zag`.
- **Handle**: URL slug, for example `zig-zag`.
- **Description / Description HTML**: main product copy.
- **Images**: product, detail, and lifestyle images.
- **Media**: videos and additional product media when available.
- **Price**: configured on the product variant.
- **Availability / inventory**: managed through variants.
- **Options and variants**: only needed if a product has options such as size,
  color, or length.
- **Tags**: lightweight filtering or grouping, for example `drop:celebrate-joy`
  or `material:linen`.
- **Product type**: optional, for example `Fabric bunting`.
- **Vendor**: `Poppy Joy`.

## Recommended Product Metafields

Create these product-level metafield definitions in Shopify under:

**Settings -> Custom data -> Products -> Add definition**

Use namespace `custom` for all fields.

| Name | Namespace and key | Type | Required | Purpose |
| --- | --- | --- | --- | --- |
| Material | `custom.material` | Single line text or rich text | Yes | Human-readable material summary. |
| Composition | `custom.composition` | Single line text or rich text | Yes | Exact composition, for example `75% linnen, 25% katoen`. |
| Dimensions | `custom.dimensions` | Single line text | Yes | Product size, for example `12 vlaggetjes, 450 cm lang`. |
| Washing care | `custom.washing_care` | Multi-line text or rich text | Yes | Washing and care instructions. |
| Certifications | `custom.certifications` | List of single line text | No | Labels such as `Oeko-Tex Standard 100`. |
| Drop | `custom.drop` | Single line text | Yes | Collection/drop name, for example `Celebrate Joy`. |
| Craft note | `custom.craft_note` | Multi-line text or rich text | No | Short handmade/atelier note for PDP storytelling. |
| Color story | `custom.color_story` | Single line text or rich text | No | Short color/palette description. |
| Included items | `custom.included_items` | List of single line text | No | What the customer receives. |

## Recommended Product Handles

- `zig-zag`
- `double-joy`
- `poppy-dots`
- `wavy-joy`
- `cobalt-blue`

## Publishing Checklist

For each product:

- [ ] Product status is active.
- [ ] Product is published to the Headless sales channel.
- [ ] Product has at least one variant with price.
- [ ] Product has inventory/availability configured.
- [ ] Product has product images.
- [ ] Required product metafields are filled.
- [ ] Handle matches the expected slug.

## Notes

The storefront should use standard Shopify fields first and only use metafields
for Poppy Joy-specific product storytelling and specifications. This keeps the
Shopify admin easy for the client to manage.
