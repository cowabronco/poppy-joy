"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { CART_COUNT_EVENT } from "@/components/poppy/cart-count-sync";
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

    function handleCountEvent(event: Event) {
      const count = (event as CustomEvent<number>).detail;
      if (typeof count === "number") {
        setItemCount(count);
      }
    }

    // Mobile browsers often restore a closed/backgrounded tab from memory
    // (bfcache) without re-running effects, which left a stale badge.
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        void loadCartCount();
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void loadCartCount();
      }
    }

    void loadCartCount();
    window.addEventListener(CART_COUNT_EVENT, handleCountEvent);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActive = false;
      window.removeEventListener(CART_COUNT_EVENT, handleCountEvent);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
