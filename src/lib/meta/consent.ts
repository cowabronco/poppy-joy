import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE_MAX_AGE,
  CONSENT_COOKIE_NAME,
  CONSENT_OPEN_EVENT,
  type CookieConsentState,
  type CookieConsentValue,
} from "./constants";

function readConsentCookie(): CookieConsentState {
  if (typeof document === "undefined") {
    return "unset";
  }

  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const match = document.cookie
    .split("; ")
    .find((part) => part.startsWith(prefix));

  const value = match?.slice(prefix.length);
  return value === "marketing" || value === "essential" ? value : "unset";
}

export function getClientConsent(): CookieConsentState {
  return readConsentCookie();
}

export function setClientConsent(value: CookieConsentValue) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value })
  );
}

export function openConsentBanner() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

const PIXEL_ID_PATTERN = /^\d{5,20}$/;

export function hasMetaPixelId(pixelId?: string): pixelId is string {
  return Boolean(pixelId && PIXEL_ID_PATTERN.test(pixelId));
}
