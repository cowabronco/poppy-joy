import { cookies } from "next/headers";

import {
  appendAttributionToCheckoutUrl,
  isValidFbclid,
  toMetaCartAttributes,
  type MetaAttribution,
} from "./attribution";
import {
  CONSENT_COOKIE_NAME,
  FBC_COOKIE_NAME,
  FBCLID_COOKIE_NAME,
  FBP_COOKIE_NAME,
  type CookieConsentState,
} from "./constants";

function parseConsent(value: string | undefined): CookieConsentState {
  if (value === "marketing" || value === "essential") {
    return value;
  }

  return "unset";
}

export async function getCookieConsent(): Promise<CookieConsentState> {
  const cookieStore = await cookies();
  return parseConsent(cookieStore.get(CONSENT_COOKIE_NAME)?.value);
}

export async function getMetaAttribution(
  fallbackFbclid?: string | null
): Promise<MetaAttribution> {
  const cookieStore = await cookies();
  const cookieFbclid = cookieStore.get(FBCLID_COOKIE_NAME)?.value ?? null;
  const fbclid = isValidFbclid(cookieFbclid)
    ? cookieFbclid
    : isValidFbclid(fallbackFbclid)
      ? fallbackFbclid
      : null;

  return {
    fbclid,
    fbc: cookieStore.get(FBC_COOKIE_NAME)?.value ?? null,
    fbp: cookieStore.get(FBP_COOKIE_NAME)?.value ?? null,
  };
}

export async function getMetaCartAttributes(fallbackFbclid?: string | null) {
  return toMetaCartAttributes(await getMetaAttribution(fallbackFbclid));
}

export async function withCheckoutAttribution(
  checkoutUrl: string,
  fallbackFbclid?: string | null
): Promise<string> {
  const attribution = await getMetaAttribution(fallbackFbclid);
  return appendAttributionToCheckoutUrl(checkoutUrl, attribution.fbclid);
}
