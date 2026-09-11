import { getClientConsent } from "./consent";
import { PIXEL_READY_EVENT } from "./constants";

export type MetaCommerceEvent = {
  contentIds?: string[];
  contentName?: string;
  contentType?: "product";
  currency?: string;
  numItems?: number;
  value?: number;
};

type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

let didInitPixel = false;

function canTrack() {
  return getClientConsent() === "marketing" && typeof window.fbq === "function";
}

export function initMetaPixel(pixelId: string) {
  if (typeof window === "undefined" || didInitPixel) {
    return typeof window.fbq === "function";
  }

  didInitPixel = true;

  const fbq: FbqFn = (...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
      return;
    }

    fbq.queue?.push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
  window.dispatchEvent(new Event(PIXEL_READY_EVENT));
  return true;
}

function toPixelPayload(event: MetaCommerceEvent) {
  return {
    ...(event.contentIds && event.contentIds.length > 0
      ? { content_ids: event.contentIds }
      : {}),
    ...(event.contentName ? { content_name: event.contentName } : {}),
    ...(event.contentType ? { content_type: event.contentType } : {}),
    ...(event.currency ? { currency: event.currency } : {}),
    ...(typeof event.numItems === "number" ? { num_items: event.numItems } : {}),
    ...(typeof event.value === "number" ? { value: event.value } : {}),
  };
}

export function trackPageView() {
  if (!canTrack()) {
    return;
  }

  window.fbq?.("track", "PageView");
}

export function trackViewContent(event: MetaCommerceEvent) {
  if (!canTrack()) {
    return;
  }

  window.fbq?.("track", "ViewContent", toPixelPayload(event));
}

export function trackAddToCart(event: MetaCommerceEvent) {
  if (!canTrack()) {
    return;
  }

  window.fbq?.("track", "AddToCart", toPixelPayload(event));
}

export function trackInitiateCheckout(event: MetaCommerceEvent = {}) {
  if (!canTrack()) {
    return;
  }

  window.fbq?.("track", "InitiateCheckout", toPixelPayload(event));
}
