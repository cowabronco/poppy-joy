import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Price } from "@/components/poppy";
import { getProductByHandle, products } from "@/lib/products";

const productPlaceholderSrc =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/placeholder.jpg?v=1778760581";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-off-white py-16 text-brand-black">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-[2rem] border border-border">
          <Image
            src={productPlaceholderSrc}
            alt={`${product.name} productafbeelding`}
            width={1200}
            height={1500}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <article className="rounded-[2rem] border border-border bg-brand-beige p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-black/55">
            Product detail
          </p>
          <h1 className="serif mt-4 text-5xl font-semibold">{product.name}</h1>
          <Price className="mt-3">{product.price}</Price>
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-brand-black/55">
            {product.palette}
          </p>
          <p className="mt-6 leading-7 text-brand-black/75">{product.description}</p>
          <p className="mt-6 text-sm leading-6 text-brand-black/60">{product.details}</p>
          <Link
            href="/#collection"
            className="mt-10 inline-flex rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] transition hover:border-brand-purple hover:text-brand-purple"
          >
            Terug naar collectie
          </Link>
        </article>
      </Container>
    </main>
  );
}
