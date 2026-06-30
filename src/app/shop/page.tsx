import type { Metadata } from "next";

import { Container, ShopFilterableGrid } from "@/components/poppy";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";
import { publishedProducts } from "@/lib/products";
import { getFeaturedImageByHandle } from "@/lib/shopify/products";

const productFilterMetadata = {
  "zig-zag": {
    colors: ["Warm", "Limoen"],
    availability: "Op voorraad" as const,
  },
  "double-joy": {
    colors: ["Pistache", "Paars"],
    availability: "Op voorraad" as const,
  },
  "poppy-dots": {
    colors: ["Mosgroen"],
    availability: "Op voorraad" as const,
  },
  "wavy-joy": {
    colors: ["Aardetinten", "Turquoise"],
    availability: "Op voorraad" as const,
  },
};

export const metadata: Metadata = pageMetadata("Shop", pageDescriptions.shop);

export default async function ShopPage() {
  const imageByHandle = await getFeaturedImageByHandle();
  const entries = publishedProducts.map((product) => ({
    product,
    imageSrc: imageByHandle[product.handle],
    filters: {
      collection: "Celebrate Joy" as const,
      materials: product.materialTags,
      ...productFilterMetadata[product.handle as keyof typeof productFilterMetadata],
    },
  }));

  return (
    <main className="min-h-screen bg-brand-off-white pb-16 pt-20 text-brand-black md:pb-20 md:pt-24">
      <Container>
        <header className="pb-5 pt-4 md:pb-6 md:pt-6">
          <h1 className="serif max-w-2xl text-4xl font-semibold leading-[1.05] text-brand-black sm:text-[2.625rem] md:text-6xl lg:text-7xl">
            Celebrate Joy{" "}
            <span
              aria-hidden
              className="font-sans text-[0.34em] font-light text-brand-black/35"
            >
              |
            </span>{" "}
            <span className="font-sans text-[0.28em] font-medium uppercase tracking-[0.28em] text-brand-black/65 sm:text-[0.3em] md:tracking-[0.34em] lg:text-[0.26em]">
              Drop 1
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-black/70 md:mt-5 md:text-lg md:leading-8">
            Ontdek de eerste Poppy Joy collectie. Tijdloze stoffen vlaggenlijnen,
            ontworpen om de mooiste momenten keer op keer te vieren.
          </p>
        </header>

        <ShopFilterableGrid products={entries} />
      </Container>
    </main>
  );
}
