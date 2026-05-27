import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Price } from "./price";
import { ResponsiveImage } from "./responsive-image";

type ProductCardProps = {
  product: Product;
  imageSrc?: string;
};

export function ProductCard({ product, imageSrc }: ProductCardProps) {
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
          <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-off-white/95 text-brand-black/75 opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <div className="mt-6 flex items-start justify-between gap-3">
            <CardTitle className="serif text-3xl font-semibold text-brand-black transition-colors duration-300 group-hover:text-brand-purple">
              {product.name}
            </CardTitle>
            <Price className="pt-1 text-right whitespace-nowrap">{product.price}</Price>
          </div>
          <p className="mt-5 flex-1 text-sm leading-6 text-brand-black/70">
            {product.description}
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs leading-5 text-brand-black/55">{product.details}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
