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
    <>
      <label className="sr-only" htmlFor={id}>
        Aantal
      </label>
      <span className="relative">
      <select
        id={id}
        name={name}
        defaultValue="1"
        disabled={disabled || maxQuantity < 1}
        className={cn(
          "h-13 w-full appearance-none rounded-full border border-border bg-brand-off-white px-5 pr-10 text-center text-sm font-medium text-brand-black outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 disabled:opacity-50",
          selectClassName
        )}
      >
        {options.map((quantity) => (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-black/45" />
      </span>
    </>
  );
}
