import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { ArrowUpRight, Flag, Ruler } from "lucide-react";
import Link from "next/link";

import { Price } from "./price";
import { ResponsiveImage } from "./responsive-image";

const productCardFacts = [
  { label: "Vlaggetjes", value: "12", Icon: Flag },
  { label: "Totale lengte", value: "450 cm", Icon: Ruler },
] as const;

type ProductCardProps = {
  product: Product;
  imageSrc?: string;
  showDetails?: boolean;
};

export function ProductCard({
  product,
  imageSrc,
  showDetails = true,
}: ProductCardProps) {
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
            sizes="(min-width: 1536px) 18vw, (min-width: 768px) 45vw, 100vw"
            frameClassName="rounded-none border-0"
          />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {product.materialTags.map((material) => (
              <Badge
                key={material}
                className="bg-brand-off-white/95 text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-off-white"
              >
                {material}
              </Badge>
            ))}
          </div>
          <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-off-white/95 text-brand-black/75 opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col pb-6">
          <div className="mt-6 flex items-start justify-between gap-3">
            <CardTitle className="serif text-3xl font-semibold text-brand-black transition-colors duration-300 group-hover:text-brand-purple">
              {product.name}
            </CardTitle>
            <Price className="pt-1 text-right whitespace-nowrap">{product.price}</Price>
          </div>
          <p className="mt-5 flex-1 text-sm leading-6 text-brand-black/70">
            {product.description}
          </p>
          {!showDetails ? (
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
          ) : null}
        </CardContent>
        {showDetails ? (
          <CardFooter>
            <p className="text-xs leading-5 text-brand-black/55">{product.details}</p>
          </CardFooter>
        ) : null}
      </Card>
    </Link>
  );
}
