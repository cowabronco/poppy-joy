"use client";

import { useRef, type ReactNode } from "react";

import { goToCheckout } from "@/lib/cart/actions";
import { readStoredFbclid } from "@/lib/meta/click-id";
import { trackInitiateCheckout, type MetaCommerceEvent } from "@/lib/meta/pixel";

type CheckoutFormProps = {
  children: ReactNode;
  className?: string;
  event?: MetaCommerceEvent;
};

export function CheckoutForm({ children, className, event }: CheckoutFormProps) {
  const fbclidInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action={goToCheckout}
      className={className}
      onSubmit={() => {
        if (fbclidInputRef.current) {
          fbclidInputRef.current.value = readStoredFbclid() ?? "";
        }
        trackInitiateCheckout(event);
      }}
    >
      <input ref={fbclidInputRef} type="hidden" name="fbclid" defaultValue="" />
      {children}
    </form>
  );
}
