"use client";

import { useEffect } from "react";

export const CART_COUNT_EVENT = "poppy:cart-count";

/**
 * Broadcasts the server-rendered cart quantity so the header badge updates
 * after a cart mutation that doesn't change the URL (remove / quantity edits).
 */
export function CartCountSync({ totalQuantity }: { totalQuantity: number }) {
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(CART_COUNT_EVENT, { detail: totalQuantity })
    );
  }, [totalQuantity]);

  return null;
}
