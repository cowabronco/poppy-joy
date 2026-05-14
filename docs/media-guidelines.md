# Media Guidelines

Poppy Joy will receive client photography and video later. Until then, pages and
templates should use calm placeholders that preserve layout, aspect ratio, and
editorial rhythm.

## Asset Types

- **Hero media**: atmospheric photo or short muted video loop.
- **Editorial story media**: lifestyle images around dinners, gardens,
  birthdays, interiors, and textile details.
- **Product media**: product cutouts, close-up details, styled product shots,
  and optional product video.
- **Care/material media**: fabric texture, stitching, label, washing/care
  details.

## Recommended Aspect Ratios

- Hero: `16:9` or `4:5` depending on page composition.
- Product cards: `4:5`.
- Product detail gallery: mix of `4:5`, `1:1`, and detail crops.
- Editorial rows: `3:2`, `4:5`, or `16:9`.
- Short video loops: `4:5` or `16:9`, always with a poster image.

## Naming Convention

Use clear, lowercase filenames:

- `product-zig-zag-hero.jpg`
- `product-zig-zag-detail-stitching.jpg`
- `editorial-garden-table-01.jpg`
- `story-amsterdam-summer-01.jpg`
- `video-zig-zag-loop.mp4`
- `poster-zig-zag-loop.jpg`

## Placeholder Rules

- Use placeholders while real media is missing.
- Preserve final aspect ratios to avoid layout shift.
- Keep placeholders neutral: off-white/beige surfaces, subtle label text, no
  saturated gradients.
- Always provide meaningful labels so templates remain understandable.

## Alt Text And Captions

Every final image should have:

- **Alt text**: describe the image plainly for accessibility.
- **Optional caption**: use only when it adds editorial value.
- **Context**: product, editorial, care, or story.

Examples:

- `Zig Zag fabric bunting hanging above a summer dinner table.`
- `Close-up of double-sided stitching on the Double Joy linen bunting.`

## Storage Direction

- Product media should live in Shopify product media.
- Editorial and brand media should also be uploaded to Shopify Files or connected
  Shopify media sources so the frontend has one media source of truth.
- Video should use compressed MP4/WebM files with poster images.
- Avoid loading video above the fold unless it is central to the hero.
- Exception for global metadata: keep favicon and social preview image local in
  `public/brand/` (synced from `assets/to-upload/brand/`).
