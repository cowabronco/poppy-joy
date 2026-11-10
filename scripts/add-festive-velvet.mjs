import { readFile } from "node:fs/promises";
import path from "node:path";

import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const staticAdminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const shop = process.env.SHOPIFY_SHOP;
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
const version = process.env.SHOPIFY_ADMIN_API_VERSION ?? "2025-01";

if (!domain) {
  throw new Error("Missing SHOPIFY_STORE_DOMAIN in .env.local.");
}

if (!staticAdminToken && (!shop || !clientId || !clientSecret)) {
  throw new Error("Missing Shopify Admin API credentials.");
}

const endpoint = `https://${domain}/admin/api/${version}/graphql.json`;
let clientCredentialsToken = null;
let clientCredentialsTokenExpiresAt = 0;

const product = {
  title: "Festive Velvet",
  handle: "festive-velvet",
  descriptionHtml:
    "<p>De <strong>Festive Velvet</strong> is een handgemaakte blikvanger vervaardigd uit een luxueuze, zachte velours stof in een diepe burgundy (bordeauxrode) tint, afgewisseld met een warme zebraprint. De vlaggenlijn is zorgvuldig dubbelzijdig gestikt voor een prachtige afwerking en is vastgenaaid aan een soepel geweven, mosgroene keperband.</p><p>Met een totale lengte van 450 cm en verdeeld over 12 vlaggetjes is dit de ultieme finishing touch voor je woonkamer, feestdagendecoratie of een stijlvol najaarsinterieur.</p>",
  vendor: "Poppy Joy",
  productType: "Fabric bunting",
  tags: [
    "Celebrate Joy",
    "Reusable decoration",
    "Handmade",
    "Festive Velvet",
    "Limited edition",
  ],
  status: "ACTIVE",
  price: "64.65",
  sku: "PJ-LE-FV",
  inventoryQuantity: 17,
  metafields: [
    ["material", "single_line_text_field", "100% zacht velours"],
    ["composition", "multi_line_text_field", "100% zacht velours"],
    ["dimensions", "single_line_text_field", "12 vlaggetjes, 450 cm lang"],
    ["product_length", "number_integer", "450"],
    ["flag_count", "number_integer", "12"],
    [
      "washing_care",
      "multi_line_text_field",
      "Met liefde behandelen: fijne was op 30°C en hangend laten drogen. Niet in de droger, zo blijft de stof mooi voor elk volgend feestje.",
    ],
    ["certifications", "list.single_line_text_field", "[]"],
    ["drop", "single_line_text_field", "Celebrate Joy"],
    [
      "craft_note",
      "multi_line_text_field",
      "Handgemaakt van zacht velours, dubbelzijdig gestikt en vastgezet aan een mosgroene keperband.",
    ],
    [
      "color_story",
      "multi_line_text_field",
      "Diepe burgundy met warme zebraprint en mosgroene keperband",
    ],
    [
      "included_items",
      "list.single_line_text_field",
      JSON.stringify(["1 stoffen vlaggenlijn", "12 dubbelzijdige vlaggetjes"]),
    ],
  ].map(([key, type, value]) => ({
    namespace: "custom",
    key,
    type,
    value,
  })),
};

const imageDir = path.join(process.cwd(), "public/products/festive-velvet");
const images = [
  {
    file: "festive_velvet_product_2611-2611(main image).jpg",
    filename: "festive-velvet-main.jpg",
    alt: "Festive Velvet vlaggenlijn in burgundy velours met zebraprint",
  },
  {
    file: "festive_velvet_living_2665-2665.jpg",
    filename: "festive-velvet-living.jpg",
    alt: "Festive Velvet vlaggenlijn in een woonkamer",
  },
  {
    file: "festive_velvet_closeup_2676-.jpg",
    filename: "festive-velvet-closeup-1.jpg",
    alt: "Detail van de Festive Velvet velours stof",
  },
  {
    file: "festive_velvet_closeup_2679-.jpg",
    filename: "festive-velvet-closeup-2.jpg",
    alt: "Detail van de Festive Velvet zebraprint",
  },
  {
    file: "festive_velvet_closeup-.jpg",
    filename: "festive-velvet-closeup-3.jpg",
    alt: "Detail van de Festive Velvet vlaggenlijn en mosgroene keperband",
  },
  {
    file: "festive_velvet_closeup-2697.jpg",
    filename: "festive-velvet-closeup-4.jpg",
    alt: "Detail van de dubbelzijdige Festive Velvet vlaggetjes",
  },
];

async function getAdminAccessToken() {
  if (shop && clientId && clientSecret) {
    if (
      clientCredentialsToken &&
      Date.now() < clientCredentialsTokenExpiresAt - 60_000
    ) {
      return clientCredentialsToken;
    }

    const response = await fetch(
      `https://${shop}.myshopify.com/admin/oauth/access_token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      }
    );
    const text = await response.text();
    const body = JSON.parse(text);

    if (!response.ok || !body.access_token) {
      throw new Error(
        `Failed to request Shopify Admin token: ${response.status} ${text}`
      );
    }

    clientCredentialsToken = body.access_token;
    clientCredentialsTokenExpiresAt = Date.now() + body.expires_in * 1000;
    return clientCredentialsToken;
  }

  return staticAdminToken;
}

async function adminRequest(query, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": await getAdminAccessToken(),
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json();

  if (!response.ok || body.errors) {
    throw new Error(
      `Shopify Admin API error: ${JSON.stringify(body.errors ?? body)}`
    );
  }

  return body.data;
}

function assertNoUserErrors(payload, label) {
  const errors = payload?.userErrors ?? payload?.mediaUserErrors ?? [];
  if (errors.length) {
    throw new Error(`${label}: ${JSON.stringify(errors)}`);
  }
}

async function findProduct() {
  const data = await adminRequest(
    `#graphql
      query ProductByHandle($query: String!) {
        products(first: 1, query: $query) {
          nodes {
            id
            handle
            title
            media(first: 20) {
              nodes { id }
            }
            variants(first: 10) {
              nodes { id }
            }
          }
        }
      }
    `,
    { query: `handle:${product.handle}` }
  );

  return data.products.nodes[0] ?? null;
}

async function saveProduct(existing) {
  const input = {
    title: product.title,
    handle: product.handle,
    descriptionHtml: product.descriptionHtml,
    vendor: product.vendor,
    productType: product.productType,
    tags: product.tags,
    status: product.status,
    metafields: product.metafields,
  };

  if (existing) {
    const data = await adminRequest(
      `#graphql
        mutation ProductUpdate($product: ProductUpdateInput!) {
          productUpdate(product: $product) {
            product {
              id
              handle
              variants(first: 10) { nodes { id } }
              media(first: 20) { nodes { id } }
            }
            userErrors { field message }
          }
        }
      `,
      { product: { id: existing.id, ...input } }
    );
    assertNoUserErrors(data.productUpdate, "productUpdate");
    return data.productUpdate.product;
  }

  const data = await adminRequest(
    `#graphql
      mutation ProductCreate($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            handle
            variants(first: 10) { nodes { id } }
            media(first: 20) { nodes { id } }
          }
          userErrors { field message }
        }
      }
    `,
    { product: input }
  );
  assertNoUserErrors(data.productCreate, "productCreate");
  return data.productCreate.product;
}

async function updateVariant(productId, variantId) {
  const data = await adminRequest(
    `#graphql
      mutation ProductVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          productVariants { id sku price }
          userErrors { field message }
        }
      }
    `,
    {
      productId,
      variants: [
        {
          id: variantId,
          price: product.price,
          inventoryItem: { sku: product.sku, tracked: true },
        },
      ],
    }
  );
  assertNoUserErrors(data.productVariantsBulkUpdate, "variant update");
}

async function setInventory(variantId) {
  const [locationData, variantData] = await Promise.all([
    adminRequest(`#graphql
      query Locations {
        locations(first: 1) { nodes { id } }
      }
    `),
    adminRequest(
      `#graphql
        query VariantInventoryItem($id: ID!) {
          productVariant(id: $id) { inventoryItem { id } }
        }
      `,
      { id: variantId }
    ),
  ]);

  const locationId = locationData.locations.nodes[0]?.id;
  const inventoryItemId = variantData.productVariant?.inventoryItem?.id;
  if (!locationId || !inventoryItemId) {
    throw new Error("Missing location or inventory item.");
  }

  const data = await adminRequest(
    `#graphql
      mutation InventorySetQuantities($input: InventorySetQuantitiesInput!) {
        inventorySetQuantities(input: $input) {
          userErrors { field message }
        }
      }
    `,
    {
      input: {
        name: "available",
        reason: "correction",
        ignoreCompareQuantity: true,
        quantities: [
          {
            inventoryItemId,
            locationId,
            quantity: product.inventoryQuantity,
          },
        ],
      },
    }
  );
  assertNoUserErrors(data.inventorySetQuantities, "inventory");
}

async function stageImage(image) {
  const filePath = path.join(imageDir, image.file);
  const bytes = await readFile(filePath);
  const staged = await adminRequest(
    `#graphql
      mutation StagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters { name value }
          }
          userErrors { field message }
        }
      }
    `,
    {
      input: [
        {
          filename: image.filename,
          mimeType: "image/jpeg",
          resource: "PRODUCT_IMAGE",
          fileSize: String(bytes.length),
          httpMethod: "POST",
        },
      ],
    }
  );
  assertNoUserErrors(staged.stagedUploadsCreate, `stage ${image.filename}`);

  const target = staged.stagedUploadsCreate.stagedTargets[0];
  const form = new FormData();
  for (const parameter of target.parameters) {
    form.append(parameter.name, parameter.value);
  }
  form.append(
    "file",
    new Blob([bytes], { type: "image/jpeg" }),
    image.filename
  );

  const upload = await fetch(target.url, { method: "POST", body: form });
  if (!upload.ok) {
    throw new Error(
      `Upload failed for ${image.filename}: ${upload.status} ${await upload.text()}`
    );
  }

  return target.resourceUrl;
}

async function attachImages(productId) {
  const sources = [];
  for (const image of images) {
    const originalSource = await stageImage(image);
    sources.push({
      originalSource,
      alt: image.alt,
      mediaContentType: "IMAGE",
    });
    console.log(`Staged ${image.filename}`);
  }

  const data = await adminRequest(
    `#graphql
      mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
        productCreateMedia(productId: $productId, media: $media) {
          media { alt status }
          mediaUserErrors { field message }
        }
      }
    `,
    { productId, media: sources }
  );
  assertNoUserErrors(data.productCreateMedia, "productCreateMedia");
}

async function publishLikeReference(productId) {
  const data = await adminRequest(
    `#graphql
      query ReferencePublications {
        products(first: 1, query: "handle:zig-zag") {
          nodes {
            resourcePublications(first: 20) {
              nodes {
                isPublished
                publication { id name }
              }
            }
          }
        }
      }
    `
  );

  const publicationIds = data.products.nodes[0].resourcePublications.nodes
    .filter((node) => node.isPublished)
    .map((node) => node.publication.id);

  if (!publicationIds.length) {
    throw new Error("Zig Zag has no publications to copy.");
  }

  const published = await adminRequest(
    `#graphql
      mutation PublishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          userErrors { field message }
        }
      }
    `,
    {
      id: productId,
      input: publicationIds.map((publicationId) => ({ publicationId })),
    }
  );
  assertNoUserErrors(published.publishablePublish, "publish");
  console.log(`Published to ${publicationIds.length} sales channels.`);
}

async function addToCelebrateJoy(productId) {
  const data = await adminRequest(
    `#graphql
      query CelebrateJoy {
        collections(first: 5, query: "title:Celebrate Joy") {
          nodes { id title handle }
        }
      }
    `
  );
  const collection = data.collections.nodes.find(
    (node) => node.handle === "celebrate-joy" || node.title === "Celebrate Joy"
  );
  if (!collection) {
    throw new Error("Celebrate Joy collection was not found.");
  }

  const added = await adminRequest(
    `#graphql
      mutation CollectionAddProducts($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) {
          userErrors { field message }
        }
      }
    `,
    { id: collection.id, productIds: [productId] }
  );
  assertNoUserErrors(added.collectionAddProducts, "collection");
  console.log(`Added to collection ${collection.title}.`);
}

const existing = await findProduct();
const saved = await saveProduct(existing);
const variantId = saved.variants.nodes[0]?.id;
if (!variantId) {
  throw new Error("Created product has no variant.");
}

await updateVariant(saved.id, variantId);
await setInventory(variantId);

const mediaCount = saved.media?.nodes?.length ?? existing?.media?.nodes?.length ?? 0;
if (mediaCount > 0) {
  console.log(`Product already has ${mediaCount} images; leaving them in place.`);
} else {
  await attachImages(saved.id);
}

await publishLikeReference(saved.id);
await addToCelebrateJoy(saved.id);

console.log(
  `${existing ? "Updated" : "Created"} ${product.title} (${product.handle}) at €${product.price} with stock ${product.inventoryQuantity}.`
);
