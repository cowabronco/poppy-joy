"use client";

import { useEffect, useState } from "react";

import { Price } from "@/components/poppy/price";
import { ProductQuantitySelect } from "@/components/poppy/product-quantity-select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductPurchaseToolbarProps = {
  action: (formData: FormData) => void | Promise<void>;
  addToCartLabel: string;
  canAddToCart: boolean;
  maxQuantity: number;
  price: string;
  productName: string;
  returnPath: string;
  variantId?: string;
};

export function ProductPurchaseToolbar({
  action,
  addToCartLabel,
  canAddToCart,
  maxQuantity,
  price,
  productName,
  returnPath,
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
          <input type="hidden" name="returnPath" value={returnPath} />
          <ProductQuantitySelect
            id="toolbar-quantity"
            maxQuantity={maxQuantity}
            disabled={!canAddToCart}
            selectClassName="h-12"
          />
          <Button
            type="submit"
            disabled={!canAddToCart}
            className="h-12 w-full rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90 disabled:bg-brand-black/20"
          >
            {addToCartLabel}
          </Button>
        </form>
      </div>
    </div>
  );
}
