import { FBCLID_PATTERN } from "./constants";

export type MetaAttribution = {
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
};

export type MetaCartAttribute = {
  key: string;
  value: string;
};

export function isValidFbclid(value: string | null | undefined): value is string {
  return typeof value === "string" && FBCLID_PATTERN.test(value);
}

export function buildFbc(fbclid: string, createdAt = Date.now()): string {
  return `fb.1.${createdAt}.${fbclid}`;
}

export function appendAttributionToCheckoutUrl(
  checkoutUrl: string,
  fbclid: string | null | undefined
): string {
  if (!isValidFbclid(fbclid)) {
    return checkoutUrl;
  }

  try {
    const url = new URL(checkoutUrl);

    if (!url.searchParams.has("fbclid")) {
      url.searchParams.set("fbclid", fbclid);
    }

    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

export function toMetaCartAttributes(
  attribution: MetaAttribution
): MetaCartAttribute[] {
  const attributes: MetaCartAttribute[] = [];

  if (attribution.fbclid) {
    attributes.push({ key: "fbclid", value: attribution.fbclid });
  }

  if (attribution.fbc) {
    attributes.push({ key: "_fbc", value: attribution.fbc });
  }

  if (attribution.fbp) {
    attributes.push({ key: "_fbp", value: attribution.fbp });
  }

  return attributes;
}

export function shopifyNumericId(gid: string): string {
  const segments = gid.split("/");
  return segments[segments.length - 1] || gid;
}
