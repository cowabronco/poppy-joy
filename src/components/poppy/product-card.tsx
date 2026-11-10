import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { buildProductFactList } from "@/lib/shopify/to-product";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Flag, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Price } from "./price";
import { ResponsiveImage } from "./responsive-image";

const badgeClassName =
  "bg-brand-off-white/95 text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-off-white";

const defaultFacts = { flagCount: 12, productLength: 450 };

type ProductCardProps = {
  product: Product;
  imageSrc?: string;
  /** Optional second photo, shown on hover. */
  hoverImageSrc?: string;
  /** Must match the rendered card width in its grid, so the right image size loads. */
  sizes?: string;
  /** Flag count and length shown under the title. Falls back to the standard 12 flags / 450 cm. */
  facts?: { flagCount: number; productLength: number };
  soldOut?: boolean;
};

export function ProductCard({
  product,
  imageSrc,
  hoverImageSrc,
  sizes = "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw",
  facts = defaultFacts,
  soldOut = false,
}: ProductCardProps) {
  const cardFacts = [
    { label: "Vlaggetjes", value: String(facts.flagCount), Icon: Flag },
    { label: "Totale lengte", value: `${facts.productLength} cm`, Icon: Ruler },
  ];
  // Same first USP as the PDP's check list (the material line).
  const leadUsp = buildProductFactList(product)[0];

  return (
    <Link
      href={`/products/${product.handle}`}
      aria-label={`Bekijk ${product.name}`}
      className="group block h-full"
    >
      <Card className="flex h-full gap-0 rounded-[2rem] border-border bg-brand-beige py-0 shadow-none transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(36,32,32,0.14)]">
        <CardHeader className="relative p-0">
          <ResponsiveImage
            media={{
              type: "image",
              src: imageSrc,
              alt: `${product.name} productafbeelding`,
              aspectRatio: "4:5",
            }}
            sizes={sizes}
            quality={90}
            frameClassName="rounded-none border-0"
          />
          {hoverImageSrc ? (
            <Image
              src={hoverImageSrc}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              quality={90}
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          ) : null}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {product.label ? (
              <Badge className="bg-brand-purple text-[10px] uppercase tracking-[0.18em] text-brand-off-white shadow-sm hover:bg-brand-purple">
                {product.label}
              </Badge>
            ) : null}
            {soldOut ? <Badge className={badgeClassName}>Uitverkocht</Badge> : null}
            {product.materialTags.map((material) => (
              <Badge key={material} className={badgeClassName}>
                {material}
              </Badge>
            ))}
          </div>
          <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-off-white/95 text-brand-black/75 opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col pb-6">
          <div className="mt-6 flex items-baseline justify-between gap-3">
            <CardTitle className="serif text-3xl font-semibold text-brand-black transition-colors duration-300 group-hover:text-brand-purple">
              {product.name}
            </CardTitle>
            <Price
              className={cn(
                // Always visible on touch screens; revealed on hover/focus where hover exists.
                "whitespace-nowrap transition-opacity duration-300 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                soldOut && "opacity-50 group-hover:opacity-50 group-focus-visible:opacity-50"
              )}
            >
              {product.price}
            </Price>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {cardFacts.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl bg-brand-off-white/70 p-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2EDE3] text-brand-purple">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.18em] text-brand-black/45">
                    {label}
                  </span>
                  <span className="serif text-xl font-semibold leading-none text-brand-black">
                    {value}
                  </span>
                </span>
              </div>
            ))}
          </div>
          {leadUsp ? (
            <p className="mt-3 rounded-2xl bg-brand-off-white/70 p-3 text-sm leading-5 text-brand-black/72">
              {leadUsp}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
