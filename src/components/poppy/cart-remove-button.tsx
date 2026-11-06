"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/lib/cart/actions";

export function CartRemoveButton({ lineId }: { lineId: string }) {
  return (
    <form action={removeFromCart}>
      <input type="hidden" name="lineId" value={lineId} />
      <RemoveSubmit />
    </form>
  );
}

function RemoveSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      disabled={pending}
      aria-busy={pending}
      className="h-10 rounded-full px-4 text-xs uppercase tracking-[0.18em] text-brand-black/55 hover:bg-brand-black/5 hover:text-brand-black disabled:opacity-50"
    >
      {pending ? "Bezig…" : "Verwijderen"}
    </Button>
  );
}
