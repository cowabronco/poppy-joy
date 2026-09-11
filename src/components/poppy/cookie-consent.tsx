"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { openConsentBanner, setClientConsent } from "@/lib/meta/consent";
import {
  CONSENT_OPEN_EVENT,
  type CookieConsentState,
  type CookieConsentValue,
} from "@/lib/meta/constants";

type CookieConsentProps = {
  initialConsent: CookieConsentState;
};

export function CookieConsent({ initialConsent }: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(initialConsent === "unset");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen);
  }, []);

  function choose(value: CookieConsentValue) {
    setClientConsent(value);
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-[1.75rem] border border-border bg-brand-off-white/97 p-5 shadow-[0_-18px_50px_rgba(36,32,32,0.12)] backdrop-blur sm:p-6">
        <div className="grid gap-2">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-purple">
            Cookies
          </p>
          <p className="text-sm leading-6 text-brand-black/72">
            We gebruiken cookies zodat de shop werkt. Met jouw toestemming meten
            we ook welke campagnes tot een bestelling leiden. Meer hierover
            lees je in ons{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacybeleid
            </Link>
            .
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => choose("essential")}
            className="h-12 rounded-full border-border px-6 text-xs uppercase tracking-[0.18em]"
          >
            Alleen noodzakelijk
          </Button>
          <Button
            type="button"
            onClick={() => choose("marketing")}
            className="h-12 rounded-full bg-brand-purple px-6 text-xs uppercase tracking-[0.18em] text-brand-off-white hover:bg-brand-purple/90"
          >
            Accepteren
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="text-left transition hover:text-brand-purple"
    >
      Cookies
    </button>
  );
}
