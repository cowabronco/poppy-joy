"use client";

import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

type ProductQuantitySelectProps = {
  id: string;
  name?: string;
  maxQuantity: number;
  disabled?: boolean;
  selectClassName?: string;
};

export function ProductQuantitySelect({
  id,
  name = "quantity",
  maxQuantity,
  disabled = false,
  selectClassName,
}: ProductQuantitySelectProps) {
  const options = Array.from(
    { length: Math.max(maxQuantity, 0) },
    (_, index) => index + 1
  );

  return (
    <SelectPrimitive.Root
      name={name}
      defaultValue="1"
      disabled={disabled || maxQuantity < 1}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-label="Aantal"
        className={cn(
          "group relative flex h-13 w-full cursor-pointer items-center justify-center rounded-full border border-brand-purple/35 bg-brand-off-white px-7 text-sm font-medium tabular-nums text-brand-black outline-none transition hover:border-brand-purple hover:bg-brand-purple/5 focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/20 data-[state=open]:border-brand-purple disabled:cursor-not-allowed disabled:opacity-50",
          selectClassName
        )}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 text-brand-purple/70 transition-transform duration-150 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={8}
          className="z-50 max-h-64 min-w-(--radix-select-trigger-width) overflow-hidden rounded-2xl border border-brand-purple/20 bg-brand-off-white p-1.5 shadow-[0_12px_32px_-12px_rgba(40,20,50,0.25)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97]"
        >
          <SelectPrimitive.Viewport>
            {options.map((quantity) => (
              <SelectPrimitive.Item
                key={quantity}
                value={String(quantity)}
                className="relative flex h-9 cursor-pointer select-none items-center justify-center rounded-xl px-7 text-sm font-medium tabular-nums text-brand-black outline-none transition-colors data-highlighted:bg-brand-purple/10 data-[state=checked]:text-brand-purple"
              >
                <SelectPrimitive.ItemText>{quantity}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2.5">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
