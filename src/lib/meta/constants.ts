export const FBCLID_COOKIE_NAME = "pj_fbclid";
export const FBC_COOKIE_NAME = "pj_fbc";
export const FBP_COOKIE_NAME = "_fbp";
export const CONSENT_COOKIE_NAME = "pj_cookie_consent";
export const FBCLID_STORAGE_KEY = "pj_fbclid";

export const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export const CONSENT_CHANGE_EVENT = "pj-consent-change";
export const CONSENT_OPEN_EVENT = "pj-consent-open";
export const PIXEL_READY_EVENT = "pj-pixel-ready";

export const FBCLID_PATTERN = /^[A-Za-z0-9._-]{1,512}$/;

export type CookieConsentValue = "marketing" | "essential";
export type CookieConsentState = CookieConsentValue | "unset";
