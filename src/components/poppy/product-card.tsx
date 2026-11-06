import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Flag, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Price } from "./price";
import { ProductFacts } from "./product-facts";
import { ResponsiveImage } from "./responsive-image";

const productCardFacts = [
  { label: "Vlaggetjes", value: "12", Icon: Flag },
  { label: "Totale lengte", value: "450 cm", Icon: Ruler },
] as const;

const badgeClassName =
  "bg-brand-off-white/95 text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-off-white";

type ProductCardProps = {
  product: Product;
  imageSrc?: string;
  /** Optional second photo, shown on hover (shop variant). */
  hoverImageSrc?: string;
  /** Must match the rendered card width in its grid, so the right image size loads. */
  sizes?: string;
  /** Flag count and length, shown with the material under the image (shop variant). */
  facts?: { flagCount: number; productLength: number };
  showDetails?: boolean;
  soldOut?: boolean;
};

export function ProductCard({
  product,
  imageSrc,
  hoverImageSrc,
  sizes = "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw",
  facts,
  showDetails = true,
  soldOut = false,
}: ProductCardProps) {
  const isCompact = !showDetails;

  if (!isCompact) {
    return (
      <Link
        href={`/products/${product.handle}`}
        aria-label={`Bekijk ${product.name}`}
        className="group flex h-full flex-col rounded-[2rem] border border-border bg-brand-beige/40 p-2 transition-colors duration-300 hover:border-brand-purple/30"
      >
        <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-beige">
          <div className="transition duration-700 ease-out group-hover:scale-[1.03]">
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
          </div>
          {hoverImageSrc ? (
            <Image
              src={hoverImageSrc}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              quality={90}
              className="object-cover opacity-0 transition duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
            />
          ) : null}

          {soldOut ? (
            <div className="absolute left-4 top-4">
              <Badge className={badgeClassName}>Uitverkocht</Badge>
            </div>
          ) : null}

          <span className="absolute bottom-4 right-4 inline-flex h-11 w-11 translate-y-1 items-center justify-center rounded-full bg-brand-purple text-brand-off-white opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="serif text-2xl font-semibold text-brand-black transition-colors duration-300 group-hover:text-brand-purple">
              {product.name}
            </h2>
            <Price className={cn("whitespace-nowrap", soldOut && "opacity-50")}>
              {product.price}
            </Price>
          </div>
          {facts ? (
            <ProductFacts
              flagCount={facts.flagCount}
              productLength={facts.productLength}
              materials={product.materialTags}
              size="compact"
              className="mt-4 border-t border-border pt-3"
            />
          ) : null}
        </div>
      </Link>
    );
  }

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
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
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
          <CardTitle className="serif mt-6 text-3xl font-semibold text-brand-black transition-colors duration-300 group-hover:text-brand-purple">
            {product.name}
          </CardTitle>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {productCardFacts.map(({ label, value, Icon }) => (
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
        </CardContent>
      </Card>
    </Link>
  );
}
