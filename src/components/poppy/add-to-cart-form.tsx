"use client";

import type { ComponentProps } from "react";

import { trackAddToCart, type MetaCommerceEvent } from "@/lib/meta/pixel";

type AddToCartFormProps = ComponentProps<"form"> & {
  action: (formData: FormData) => void | Promise<void>;
  event?: MetaCommerceEvent;
};

export function AddToCartForm({
  action,
  event,
  onSubmit,
  ...props
}: AddToCartFormProps) {
  return (
    <form
      {...props}
      action={action}
      onSubmit={(submitEvent) => {
        if (event) {
          trackAddToCart(event);
        }
        onSubmit?.(submitEvent);
      }}
    />
  );
}
