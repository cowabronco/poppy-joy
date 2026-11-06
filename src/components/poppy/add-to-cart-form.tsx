"use client";

import { useRef, type ComponentProps } from "react";

import { trackAddToCart, type MetaCommerceEvent } from "@/lib/meta/pixel";

type AddToCartFormProps = Omit<ComponentProps<"form">, "action"> & {
  action: (formData: FormData) => void | Promise<void>;
  event?: MetaCommerceEvent;
};

export function AddToCartForm({
  action,
  event,
  ...props
}: AddToCartFormProps) {
  const pendingRef = useRef(false);

  // Ignore extra submits (double-click / double-tap) while one is in flight,
  // otherwise each click adds another banner to the cart.
  async function guardedAction(formData: FormData) {
    if (pendingRef.current) {
      return;
    }

    pendingRef.current = true;
    if (event) {
      trackAddToCart(event);
    }

    try {
      await action(formData);
    } finally {
      pendingRef.current = false;
    }
  }

  return <form {...props} action={guardedAction} />;
}
