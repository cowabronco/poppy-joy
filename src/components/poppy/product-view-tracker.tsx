"use client";

import { useEffect } from "react";

import { CONSENT_CHANGE_EVENT, PIXEL_READY_EVENT } from "@/lib/meta/constants";
import { trackViewContent } from "@/lib/meta/pixel";

type ProductViewTrackerProps = {
  contentId: string;
  contentName: string;
  currency?: string;
  value?: number;
};

export function ProductViewTracker({
  contentId,
  contentName,
  currency,
  value,
}: ProductViewTrackerProps) {
  useEffect(() => {
    const fire = () => {
      trackViewContent({
        contentIds: [contentId],
        contentName,
        contentType: "product",
        currency,
        value,
      });
    };

    fire();
    window.addEventListener(CONSENT_CHANGE_EVENT, fire);
    window.addEventListener(PIXEL_READY_EVENT, fire);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, fire);
      window.removeEventListener(PIXEL_READY_EVENT, fire);
    };
  }, [contentId, contentName, currency, value]);

  return null;
}
