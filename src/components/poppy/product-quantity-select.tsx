import { ChevronDown } from "lucide-react";

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
    <div className={cn("relative h-13", selectClassName)}>
      <label className="sr-only" htmlFor={id}>
        Aantal
      </label>
      <select
        id={id}
        name={name}
        defaultValue="1"
        disabled={disabled || maxQuantity < 1}
        className="h-full w-full cursor-pointer appearance-none rounded-full border border-brand-purple/35 bg-brand-off-white px-7 text-center text-sm font-medium tabular-nums text-brand-black outline-none transition focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((quantity) => (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-brand-black/40"
        aria-hidden
      />
    </div>
  );
}
