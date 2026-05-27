"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";

type CartNavLinkProps = {
  className?: string;
};

export function CartNavLink({ className }: CartNavLinkProps) {
  const pathname = usePathname();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadCartCount() {
      try {
        const response = await fetch("/api/cart", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { totalQuantity?: number };

        if (isActive) {
          setItemCount(data.totalQuantity ?? 0);
        }
      } catch {
        if (isActive) {
          setItemCount(0);
        }
      }
    }

    void loadCartCount();

    return () => {
      isActive = false;
    };
  }, [pathname]);

  return (
    <Link
      href="/cart"
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300",
        className
      )}
      aria-label={
        itemCount > 0
          ? `Winkelwagen, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
          : "Winkelwagen"
      }
    >
      <ShoppingBag size={22} />
      {itemCount > 0 ? (
        <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-purple px-1 text-[10px] font-semibold leading-none text-brand-off-white">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
