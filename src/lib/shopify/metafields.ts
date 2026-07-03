export const PRODUCT_METAFIELD_IDENTIFIERS = [
  { namespace: "custom", key: "material" },
  { namespace: "custom", key: "composition" },
  { namespace: "custom", key: "dimensions" },
  { namespace: "custom", key: "product_length" },
  { namespace: "custom", key: "flag_count" },
  { namespace: "custom", key: "washing_care" },
  { namespace: "custom", key: "craft_note" },
  { namespace: "custom", key: "color_story" },
  { namespace: "custom", key: "drop" },
  { namespace: "custom", key: "certifications" },
] as const;

export type ShopifyMetafieldNode = {
  namespace: string;
  key: string;
  value: string;
  type: string;
};

export type StorefrontProductMetafields = {
  material: string | null;
  composition: string | null;
  dimensions: string | null;
  productLength: number | null;
  flagCount: number | null;
  washingCare: string | null;
  craftNote: string | null;
  colorStory: string | null;
  drop: string | null;
  certifications: string[];
};

const EMPTY_METAFIELDS: StorefrontProductMetafields = {
  material: null,
  composition: null,
  dimensions: null,
  productLength: null,
  flagCount: null,
  washingCare: null,
  craftNote: null,
  colorStory: null,
  drop: null,
  certifications: [],
};

function parseMetafieldList(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function parseMetafieldInteger(value: string): number | null {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseProductMetafields(
  metafields: ShopifyMetafieldNode[] | null | undefined
): StorefrontProductMetafields {
  if (!metafields?.length) {
    return EMPTY_METAFIELDS;
  }

  const byKey = new Map(metafields.map((metafield) => [metafield.key, metafield]));

  return {
    material: byKey.get("material")?.value ?? null,
    composition: byKey.get("composition")?.value ?? null,
    dimensions: byKey.get("dimensions")?.value ?? null,
    productLength: parseMetafieldInteger(byKey.get("product_length")?.value ?? ""),
    flagCount: parseMetafieldInteger(byKey.get("flag_count")?.value ?? ""),
    washingCare: byKey.get("washing_care")?.value ?? null,
    craftNote: byKey.get("craft_note")?.value ?? null,
    colorStory: byKey.get("color_story")?.value ?? null,
    drop: byKey.get("drop")?.value ?? null,
    certifications: parseMetafieldList(
      byKey.get("certifications")?.value ?? "[]"
    ),
  };
}

export function buildProductDetails(
  composition: string | null,
  dimensions: string | null,
  certifications: string[]
): string {
  const parts: string[] = [];

  if (dimensions) {
    parts.push(dimensions.endsWith(".") ? dimensions : `${dimensions}.`);
  }

  if (composition) {
    parts.push(`Samenstelling: ${composition.replace(/\.$/, "")}.`);
  }

  if (certifications.length) {
    parts.push(certifications.join(". ") + (certifications.length ? "." : ""));
  }

  return parts.join(" ").trim();
}

export function deriveMaterialTags(material: string | null): string[] {
  if (!material) {
    return [];
  }

  const lower = material.toLowerCase();

  if (lower.includes("linnen")) {
    return ["Linnen"];
  }

  if (lower.includes("velours")) {
    return ["Velours"];
  }

  if (lower.includes("jacquard") || lower.includes("gobelin")) {
    return ["Jacquard"];
  }

  return [];
}
