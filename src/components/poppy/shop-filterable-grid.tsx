"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";

import type { Product } from "@/lib/products";

import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

type FilterGroupKey = "materials" | "colors" | "availability";

type ShopProduct = {
  product: Product;
  imageSrc?: string;
  filters: {
    collection: "Celebrate Joy";
    materials: string[];
    colors: string[];
    availability: "Op voorraad" | "Binnenkort";
  };
};

type ShopFilterableGridProps = {
  products: ShopProduct[];
};

const filterGroupConfig: Array<{
  key: FilterGroupKey;
  label: string;
  optionOrder: string[];
}> = [
  {
    key: "materials",
    label: "Materiaal",
    optionOrder: ["Linnen", "Jacquard", "Velours"],
  },
  {
    key: "colors",
    label: "Kleur",
    optionOrder: [
      "Warm",
      "Pistache",
      "Paars",
      "Limoen",
      "Mosgroen",
      "Turquoise",
      "Aardetinten",
      "Cobalt",
    ],
  },
  {
    key: "availability",
    label: "Beschikbaarheid",
    optionOrder: ["Op voorraad", "Binnenkort"],
  },
];

function getProductFilterValues(
  product: ShopProduct,
  groupKey: FilterGroupKey
): string[] {
  if (groupKey === "availability") {
    return [product.filters.availability];
  }

  return product.filters[groupKey];
}

function buildFilterGroups(products: ShopProduct[]) {
  return filterGroupConfig
    .map((group) => {
      const presentValues = new Set<string>();

      for (const product of products) {
        for (const value of getProductFilterValues(product, group.key)) {
          presentValues.add(value);
        }
      }

      const options = group.optionOrder.filter((option) =>
        presentValues.has(option)
      );

      for (const value of presentValues) {
        if (!options.includes(value)) {
          options.push(value);
        }
      }

      return { ...group, options };
    })
    .filter((group) => group.options.length > 1);
}

type Selection = Record<FilterGroupKey, string | null>;

const initialSelection: Selection = {
  materials: null,
  colors: null,
  availability: null,
};

function productMatches(product: ShopProduct, selection: Selection) {
  return (Object.keys(selection) as FilterGroupKey[]).every((groupKey) => {
    const selectedValue = selection[groupKey];

    if (!selectedValue) {
      return true;
    }

    if (groupKey === "availability") {
      return product.filters.availability === selectedValue;
    }

    return product.filters[groupKey].includes(selectedValue);
  });
}

export function ShopFilterableGrid({ products }: ShopFilterableGridProps) {
  const [selection, setSelection] = useState<Selection>(initialSelection);

  const filterGroups = useMemo(() => buildFilterGroups(products), [products]);

  const visibleProducts = useMemo(
    () => products.filter((product) => productMatches(product, selection)),
    [products, selection]
  );

  const countWithSelection = (nextSelection: Selection) =>
    products.filter((product) => productMatches(product, nextSelection)).length;

  const handleFilterClick = (groupKey: FilterGroupKey, option: string) => {
    setSelection((previousSelection) => {
      const toggledValue = previousSelection[groupKey] === option ? null : option;
      const nextSelection: Selection = {
        ...previousSelection,
        [groupKey]: toggledValue,
      };

      if (countWithSelection(nextSelection) > 0) {
        return nextSelection;
      }

      // If a new choice leads to no products, clear other groups so the chosen
      // filter can stay active and conflicting options are deselected.
      const resolvedSelection: Selection = {
        materials: null,
        colors: null,
        availability: null,
        [groupKey]: toggledValue,
      };

      if (countWithSelection(resolvedSelection) > 0) {
        return resolvedSelection;
      }

      return previousSelection;
    });
  };

  const getOptionDisabled = (groupKey: FilterGroupKey, option: string) => {
    const candidateSelection: Selection = {
      ...selection,
      [groupKey]: option,
    };

    return countWithSelection(candidateSelection) === 0;
  };

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="h-fit rounded-[2rem] border border-border bg-[#F2EDE3] p-6 lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-black/55">Filters</p>
        <p className="mt-3 text-sm leading-6 text-brand-black/65">
          {filterGroups.length > 0
            ? "Selecteer materiaal, kleur of beschikbaarheid. Onmogelijke combinaties worden automatisch uitgezet."
            : "Alle producten staan hieronder."}
        </p>

        <div className="mt-8 space-y-7">
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-brand-black/55">
              Collection
            </h2>
            <button
              type="button"
              disabled
              className="mt-3 flex w-full items-center justify-between rounded-full border border-brand-green/50 bg-brand-off-white px-3 py-2 text-left text-sm text-brand-black/78"
            >
              <span>Celebrate Joy</span>
              <Check size={15} className="text-brand-green" />
            </button>
          </section>

          {filterGroups.map((group) => (
            <section key={group.key}>
              <h2 className="text-xs uppercase tracking-[0.2em] text-brand-black/55">
                {group.label}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.options.map((option) => {
                  const isSelected = selection[group.key] === option;
                  const isDisabled = !isSelected && getOptionDisabled(group.key, option);

                  return (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => handleFilterClick(group.key, option)}
                        disabled={isDisabled}
                        className={`flex w-full items-center justify-between rounded-full border px-3 py-2 text-left text-sm transition ${
                          isSelected
                            ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                            : "border-border bg-brand-off-white/80 text-brand-black/72 hover:border-brand-purple/40 hover:text-brand-purple"
                        } ${isDisabled ? "cursor-not-allowed opacity-45 hover:border-border hover:text-brand-black/72" : ""}`}
                      >
                        <span>{option}</span>
                        {isSelected ? <Check size={15} /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      <section aria-label="Producten" className="grid gap-8 md:grid-cols-2">
        {visibleProducts.map((entry, index) => (
          <Reveal key={entry.product.handle} delayMs={index * 60}>
            <ProductCard
              product={entry.product}
              imageSrc={entry.imageSrc}
            />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
