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
  throw new Error(
    "Missing Admin API credentials. Set SHOPIFY_ADMIN_ACCESS_TOKEN or SHOPIFY_SHOP, SHOPIFY_CLIENT_ID, and SHOPIFY_CLIENT_SECRET."
  );
}

const endpoint = `https://${domain}/admin/api/${version}/graphql.json`;
let clientCredentialsToken = null;
let clientCredentialsTokenExpiresAt = 0;

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

  if (staticAdminToken) {
    return staticAdminToken;
  }

  throw new Error("No Shopify Admin API credentials available.");
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

const metafieldDefinitions = [
  {
    name: "Material",
    key: "material",
    type: "single_line_text_field",
    description: "Human-readable material summary for the storefront.",
  },
  {
    name: "Composition",
    key: "composition",
    type: "multi_line_text_field",
    description: "Exact fabric composition.",
  },
  {
    name: "Dimensions",
    key: "dimensions",
    type: "single_line_text_field",
    description: "Product dimensions and length.",
  },
  {
    name: "Washing care",
    key: "washing_care",
    type: "multi_line_text_field",
    description: "Washing and care instructions.",
  },
  {
    name: "Certifications",
    key: "certifications",
    type: "list.single_line_text_field",
    description: "Product labels and certifications.",
  },
  {
    name: "Drop",
    key: "drop",
    type: "single_line_text_field",
    description: "Collection or drop name.",
  },
  {
    name: "Craft note",
    key: "craft_note",
    type: "multi_line_text_field",
    description: "Short atelier note for product storytelling.",
  },
  {
    name: "Color story",
    key: "color_story",
    type: "multi_line_text_field",
    description: "Short color and palette description.",
  },
  {
    name: "Included items",
    key: "included_items",
    type: "list.single_line_text_field",
    description: "What the customer receives.",
  },
];

const products = [
  {
    title: "Zig Zag",
    handle: "zig-zag",
    descriptionHtml:
      "<p>De <strong>Zig Zag</strong> vlaggenlijn is gemaakt van gobelin jacquard, een rijk geweven stof met diepte en textuur. Een levendige zig zag print in warme kleuren die een instant vrolijke en uitgesproken sfeer neerzet. De lijn is vastgenaaid aan een soepel geweven katoenen pistachegroene band.</p><p>De vlaggen zijn dubbelzijdig gestikt, waardoor de lijn van beide kanten mooi is. Met 12 vlaggetjes en een lengte van 450 cm.</p>",
    material: "Gobelin jacquard met katoenen band",
    composition: "50% polyester en 50% katoen",
    dimensions: "12 vlaggetjes, 450 cm lang",
    colorStory:
      "Een levendige zig zag print in warme kleuren met een pistachegroene katoenen band.",
    certifications: [],
  },
  {
    title: "Double Joy",
    handle: "double-joy",
    descriptionHtml:
      "<p>De <strong>Double Joy</strong> vlaggenlijn is uitgevoerd in linnen, met pistachegroene en paarse vlaggetjes die elkaar afwisselen, en een soepel geweven katoenen ecru band.</p><p>De dubbelzijdige afwerking zorgt ervoor dat de vlaggenlijn van beide kanten mooi valt. Voorzien van 12 vlaggetjes en een lengte van 450 cm.</p>",
    material: "Linnen met katoenen band",
    composition: "75% linnen en 25% katoen",
    dimensions: "12 vlaggetjes, 450 cm lang",
    colorStory:
      "Pistachegroene en paarse linnen vlaggetjes met een rustige ecru katoenen band.",
    certifications: ["Oeko-Tex Standard 100 Product class 2"],
  },
  {
    title: "Poppy Dots",
    handle: "poppy-dots",
    descriptionHtml:
      "<p>Een zachte, aaibare velours stof met een speelse zwart-witte dalmatiër stippenprint. Minimalistisch, maar met een twist.</p><p>De <strong>Poppy Dots</strong> is dubbelzijdig gestikt, vastgenaaid aan een soepel geweven turquoise katoenen band, en bestaat uit 12 vlaggetjes met een lengte van 450 cm.</p>",
    material: "Velours met katoenen band",
    composition: "100% polyester",
    dimensions: "12 vlaggetjes, 450 cm lang",
    colorStory:
      "Zwart-witte dalmatiër stippenprint met een turquoise katoenen band.",
    certifications: [],
  },
  {
    title: "Wavy Joy",
    handle: "wavy-joy",
    descriptionHtml:
      "<p>De <strong>Wavy Joy</strong> vlaggenlijn is gemaakt van gobelin jacquard, een rijk geweven stof met een zachte flow van aardse tinten.</p><p>De golvende organische print brengt rust en karakter. Door de dubbelzijdige afwerking is de vlaggenlijn van beide kanten mooi. Wavy Joy heeft 12 vlaggetjes en een lengte van 450 cm.</p>",
    material: "Gobelin jacquard",
    composition: "50% polyester en 50% katoen",
    dimensions: "12 vlaggetjes, 450 cm lang",
    colorStory:
      "Een golvende organische print in warme aardetinten en subtiele kleuraccenten.",
    certifications: [],
  },
  {
    title: "Cobalt Blue",
    handle: "cobalt-blue",
    descriptionHtml:
      "<p>De <strong>Cobalt Blue</strong> vlaggenlijn is een zachte velours stof met een golfprint. De vlaggenlijn is dubbelzijdig gestikt, vastgenaaid aan een soepel geweven ecru katoenen band, en bestaat uit 12 vlaggetjes met een lengte van 450 cm.</p>",
    material: "Velours met katoenen band",
    composition: "50% polyester en 50% katoen",
    dimensions: "12 vlaggetjes, 450 cm lang",
    colorStory: "Een zachte velours golfprint in kobaltblauw met ecru band.",
    certifications: [],
  },
].map((product) => ({
  ...product,
  vendor: "Poppy Joy",
  productType: "Fabric bunting",
  tags: ["Celebrate Joy", "Reusable decoration", "Handmade", product.title],
  price: "49.95",
  drop: "Celebrate Joy",
  washingCare: "Wassen op 30 graden. Laat bij voorkeur liggend drogen.",
  craftNote:
    "Met zorg samengesteld en dubbelzijdig afgewerkt voor momenten die mogen blijven.",
  includedItems: ["1 stoffen vlaggenlijn", "12 dubbelzijdige vlaggetjes"],
}));

async function findMetafieldDefinition(key) {
  const data = await adminRequest(
    `#graphql
      query MetafieldDefinition($ownerType: MetafieldOwnerType!, $namespace: String!, $key: String!) {
        metafieldDefinitions(first: 1, ownerType: $ownerType, namespace: $namespace, key: $key) {
          nodes {
            id
            key
            namespace
          }
        }
      }
    `,
    { ownerType: "PRODUCT", namespace: "custom", key }
  );

  return data.metafieldDefinitions.nodes[0] ?? null;
}

async function createMetafieldDefinition(definition) {
  const data = await adminRequest(
    `#graphql
      mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition {
            id
            namespace
            key
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      definition: {
        namespace: "custom",
        key: definition.key,
        name: definition.name,
        description: definition.description,
        ownerType: "PRODUCT",
        type: definition.type,
        pin: true,
        access: {
          storefront: "PUBLIC_READ",
        },
      },
    }
  );

  const errors = data.metafieldDefinitionCreate.userErrors;
  if (errors.length) {
    throw new Error(
      `Failed to create metafield ${definition.key}: ${JSON.stringify(errors)}`
    );
  }

  return data.metafieldDefinitionCreate.createdDefinition;
}

async function ensureMetafieldDefinitions() {
  for (const definition of metafieldDefinitions) {
    const existing = await findMetafieldDefinition(definition.key);
    if (existing) {
      console.log(`Metafield definition exists: custom.${definition.key}`);
      continue;
    }

    const created = await createMetafieldDefinition(definition);
    console.log(`Created metafield definition: ${created.namespace}.${created.key}`);
  }
}

async function findProductByHandle(handle) {
  const data = await adminRequest(
    `#graphql
      query ProductByHandle($query: String!) {
        products(first: 1, query: $query) {
          nodes {
            id
            handle
            title
            variants(first: 10) {
              nodes {
                id
                title
              }
            }
          }
        }
      }
    `,
    { query: `handle:${handle}` }
  );

  return data.products.nodes[0] ?? null;
}

function productMetafields(product) {
  return [
    ["material", "single_line_text_field", product.material],
    ["composition", "multi_line_text_field", product.composition],
    ["dimensions", "single_line_text_field", product.dimensions],
    ["washing_care", "multi_line_text_field", product.washingCare],
    ["certifications", "list.single_line_text_field", JSON.stringify(product.certifications)],
    ["drop", "single_line_text_field", product.drop],
    ["craft_note", "multi_line_text_field", product.craftNote],
    ["color_story", "multi_line_text_field", product.colorStory],
    ["included_items", "list.single_line_text_field", JSON.stringify(product.includedItems)],
  ].map(([key, type, value]) => ({
    namespace: "custom",
    key,
    type,
    value,
  }));
}

async function createProduct(product) {
  const data = await adminRequest(
    `#graphql
      mutation ProductCreate($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            handle
            title
            variants(first: 10) {
              nodes {
                id
                title
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      product: {
        title: product.title,
        handle: product.handle,
        descriptionHtml: product.descriptionHtml,
        vendor: product.vendor,
        productType: product.productType,
        tags: product.tags,
        status: "ACTIVE",
        metafields: productMetafields(product),
      },
    }
  );

  const errors = data.productCreate.userErrors;
  if (errors.length) {
    throw new Error(
      `Failed to create product ${product.title}: ${JSON.stringify(errors)}`
    );
  }

  return data.productCreate.product;
}

async function updateProduct(existing, product) {
  const data = await adminRequest(
    `#graphql
      mutation ProductUpdate($product: ProductInput!) {
        productUpdate(product: $product) {
          product {
            id
            handle
            title
            variants(first: 10) {
              nodes {
                id
                title
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      product: {
        id: existing.id,
        title: product.title,
        handle: product.handle,
        descriptionHtml: product.descriptionHtml,
        vendor: product.vendor,
        productType: product.productType,
        tags: product.tags,
        status: "ACTIVE",
        metafields: productMetafields(product),
      },
    }
  );

  const errors = data.productUpdate.userErrors;
  if (errors.length) {
    throw new Error(
      `Failed to update product ${product.title}: ${JSON.stringify(errors)}`
    );
  }

  return data.productUpdate.product;
}

async function updateVariantPrice(productId, variantId, price) {
  const data = await adminRequest(
    `#graphql
      mutation ProductVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          product {
            id
          }
          productVariants {
            id
            price
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      productId,
      variants: [
        {
          id: variantId,
          price,
        },
      ],
    }
  );

  const errors = data.productVariantsBulkUpdate.userErrors;
  if (errors.length) {
    throw new Error(
      `Failed to update variant price: ${JSON.stringify(errors)}`
    );
  }
}

async function ensureProducts() {
  for (const product of products) {
    const existing = await findProductByHandle(product.handle);
    const saved = existing
      ? await updateProduct(existing, product)
      : await createProduct(product);

    const variantId = saved.variants.nodes[0]?.id;
    if (variantId) {
      await updateVariantPrice(saved.id, variantId, product.price);
    }

    console.log(`${existing ? "Updated" : "Created"} product: ${saved.title}`);
  }
}

await ensureMetafieldDefinitions();
await ensureProducts();

console.log("Shopify seed complete.");
