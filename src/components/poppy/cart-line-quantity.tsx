"use client";

import { Minus, Plus } from "lucide-react";
import { useFormStatus } from "react-dom";

import { updateCartLineQuantity } from "@/lib/cart/actions";
import { cn } from "@/lib/utils";

type CartLineQuantityProps = {
  lineId: string;
  quantity: number;
  maxQuantity: number;
  productTitle: string;
};

export function CartLineQuantity({
  lineId,
  quantity,
  maxQuantity,
  productTitle,
}: CartLineQuantityProps) {
  return (
    <form action={updateCartLineQuantity}>
      <input type="hidden" name="lineId" value={lineId} />
      <QuantityStepper
        quantity={quantity}
        maxQuantity={maxQuantity}
        productTitle={productTitle}
      />
    </form>
  );
}

function QuantityStepper({
  quantity,
  maxQuantity,
  productTitle,
}: Omit<CartLineQuantityProps, "lineId">) {
  const { pending, data } = useFormStatus();
  const pendingQuantity = pending ? Number(data?.get("quantity")) : NaN;
  const displayQuantity = Number.isFinite(pendingQuantity)
    ? pendingQuantity
    : quantity;

  const buttonClassName =
    "flex h-full w-10 items-center justify-center text-brand-black/70 transition hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center rounded-full border border-brand-purple/35 bg-brand-off-white",
        pending && "opacity-70"
      )}
    >
      <button
        type="submit"
        name="quantity"
        value={quantity - 1}
        disabled={pending || quantity <= 1}
        aria-label={`Eén minder ${productTitle}`}
        className={buttonClassName}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span
        aria-live="polite"
        aria-label={`Aantal: ${displayQuantity}`}
        className="min-w-6 text-center text-sm font-medium tabular-nums text-brand-black"
      >
        {displayQuantity}
      </span>
      <button
        type="submit"
        name="quantity"
        value={quantity + 1}
        disabled={pending || quantity >= maxQuantity}
        aria-label={`Eén extra ${productTitle}`}
        className={buttonClassName}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
