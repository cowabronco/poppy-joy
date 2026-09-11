"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { CONSENT_CHANGE_EVENT, type CookieConsentState } from "@/lib/meta/constants";
import { initMetaPixel, trackPageView } from "@/lib/meta/pixel";

type MetaPixelProps = {
  pixelId: string;
  initialConsent: CookieConsentState;
};

export function MetaPixel({ pixelId, initialConsent }: MetaPixelProps) {
  const pathname = usePathname();
  const [consent, setConsent] = useState(initialConsent);

  useEffect(() => {
    const handleConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentState>).detail;
      if (detail === "marketing" || detail === "essential") {
        setConsent(detail);
      }
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (consent !== "marketing") {
      return;
    }

    initMetaPixel(pixelId);
    trackPageView();
  }, [consent, pathname, pixelId]);

  return null;
}
