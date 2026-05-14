# Upload staging folder

Plaats tijdelijke assets hier voor Shopify upload.

Structuur:

- `brand/` voor logo's, merkbestanden en brand assets
- `editorial/` voor sfeerbeelden
- `materials/` voor close-ups en materiaalbeelden
- `products/<collection-handle>/<product-handle>/` voor product-specifieke beelden
- `video/` voor video bestanden en posters

Voor huidige drop:

- `products/celebrate-joy/zig-zag/`
- `products/celebrate-joy/double-joy/`
- `products/celebrate-joy/poppy-dots/`
- `products/celebrate-joy/wavy-joy/`
- `products/celebrate-joy/cobalt-blue/`

Na upload naar Shopify kunnen deze bestanden uit de repository worden verwijderd.

## Brongebruik

- `editorial`, `materials`, `products` en `video` worden geupload naar Shopify en daarna vanuit Shopify ingeladen.
- Uitzondering: `brand/favicon.*` en `brand/featured-image.*` blijven lokaal voor metadata (favicon + social preview image).
- Gebruik `npm run sync:brand` om metadata-bestanden uit `assets/to-upload/brand/` te kopieren naar `public/brand/`.
