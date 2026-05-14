import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/lib/products";

import { MediaFrame } from "./media-frame";
import { Price } from "./price";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="gap-0 rounded-[2rem] border-border bg-brand-beige shadow-none">
      <CardHeader>
        <MediaFrame label={product.name} />
      </CardHeader>
      <CardContent>
        <Badge className="bg-brand-off-white text-brand-black/65 hover:bg-brand-off-white">
          {product.palette}
        </Badge>
        <CardTitle className="serif mt-4 text-3xl font-semibold text-brand-black">
          {product.name}
        </CardTitle>
        <Price className="mt-2">{product.price}</Price>
        <p className="mt-5 text-sm leading-6 text-brand-black/70">
          {product.description}
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs leading-5 text-brand-black/55">{product.details}</p>
      </CardFooter>
    </Card>
  );
}
