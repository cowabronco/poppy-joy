"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Price } from "@/components/poppy/price";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductPurchaseToolbarProps = {
  action: (formData: FormData) => void | Promise<void>;
  canAddToCart: boolean;
  price: string;
  productName: string;
  variantId?: string;
};

export function ProductPurchaseToolbar({
  action,
  canAddToCart,
  price,
  productName,
  variantId = "",
}: ProductPurchaseToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 560);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-brand-off-white/95 px-4 py-3 shadow-[0_-18px_50px_rgba(36,32,32,0.12)] backdrop-blur transition duration-300",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="serif text-2xl font-semibold leading-none text-brand-black">
            {productName}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <Price className="text-base">{price}</Price>
            <span className="text-[11px] text-brand-black/50">Inclusief BTW</span>
          </div>
        </div>

        <form action={action} className="grid gap-3 sm:min-w-[420px] sm:grid-cols-[112px_minmax(0,1fr)]">
          <input type="hidden" name="variantId" value={variantId} />
          <label className="sr-only" htmlFor="toolbar-quantity">
            Aantal
          </label>
          <span className="relative">
            <select
              id="toolbar-quantity"
              name="quantity"
              defaultValue="1"
              disabled={!canAddToCart}
              className="h-12 w-full appearance-none rounded-full border border-border bg-brand-off-white px-5 pr-10 text-center text-sm font-medium text-brand-black outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 disabled:opacity-50"
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                )
              )}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-black/45" />
          </span>
          <Button
            type="submit"
            disabled={!canAddToCart}
            className="h-12 w-full rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90 disabled:bg-brand-black/20"
          >
            {canAddToCart ? "In winkelwagen" : "Binnenkort beschikbaar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
