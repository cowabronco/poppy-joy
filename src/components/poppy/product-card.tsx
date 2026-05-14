import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";

import { Price } from "./price";
import { ResponsiveImage } from "./responsive-image";

type ProductCardProps = {
  product: Product;
  imageSrc?: string;
};

export function ProductCard({ product, imageSrc }: ProductCardProps) {
  return (
    <Card className="flex h-full gap-0 rounded-[2rem] border-border bg-brand-beige shadow-none">
      <CardHeader>
        <ResponsiveImage
          media={{
            type: "image",
            src: imageSrc,
            alt: `${product.name} productafbeelding`,
            aspectRatio: "4:5",
          }}
          sizes="(min-width: 1536px) 18vw, (min-width: 768px) 45vw, 100vw"
        />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <Badge className="bg-brand-off-white text-brand-black/65 hover:bg-brand-off-white">
          {product.palette}
        </Badge>
        <CardTitle className="serif mt-4 text-3xl font-semibold text-brand-black">
          {product.name}
        </CardTitle>
        <Price className="mt-2">{product.price}</Price>
        <p className="mt-5 flex-1 text-sm leading-6 text-brand-black/70">
          {product.description}
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs leading-5 text-brand-black/55">{product.details}</p>
      </CardFooter>
    </Card>
  );
}
