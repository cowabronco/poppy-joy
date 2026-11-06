import { Flag, Ruler, Scissors, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductFactsProps = {
  flagCount: number;
  productLength: number;
  /** Shown as a third fact when given (e.g. on product cards). */
  materials?: string[];
  size?: "default" | "compact";
  className?: string;
};

type Fact = { label: string; value: string; Icon: LucideIcon };

export function ProductFacts({
  flagCount,
  productLength,
  materials,
  size = "default",
  className,
}: ProductFactsProps) {
  const facts: Fact[] = [
    { label: "Vlaggetjes", value: String(flagCount), Icon: Flag },
    { label: "Totale lengte", value: `${productLength} cm`, Icon: Ruler },
  ];

  if (materials && materials.length > 0) {
    facts.push({ label: "Materiaal", value: materials.join(" · "), Icon: Scissors });
  }

  const isCompact = size === "compact";

  if (isCompact) {
    return (
      <div
        className={cn(
          "flex items-center divide-x divide-border text-[15px] text-brand-black/80",
          className
        )}
      >
        {facts.map(({ label, value, Icon }) => (
          <div
            key={label}
            aria-label={`${label} ${value}`}
            title={label}
            className="flex shrink-0 items-center gap-2 px-3 first:pl-0 last:min-w-0 last:shrink last:pr-0"
          >
            <Icon className="h-[18px] w-[18px] shrink-0 text-brand-purple" aria-hidden="true" />
            <span className="truncate">{value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        facts.length === 3 ? "grid-cols-3" : "grid-cols-2",
        isCompact && "gap-2",
        className
      )}
    >
      {facts.map(({ label, value, Icon }) => (
        <div
          key={label}
          aria-label={`${label} ${value}`}
          title={label}
          className={cn(
            "flex min-w-0 items-center rounded-2xl",
            isCompact
              ? "gap-2 bg-brand-beige px-2.5 py-2"
              : "gap-3 bg-brand-off-white/70 px-4 py-3"
          )}
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full text-brand-purple",
              isCompact ? "h-7 w-7 bg-brand-off-white" : "h-9 w-9 bg-[#F2EDE3]"
            )}
          >
            <Icon className={isCompact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
          </span>
          <span
            className={cn(
              "serif truncate font-semibold leading-none text-brand-black",
              isCompact ? "text-base" : "text-2xl"
            )}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
