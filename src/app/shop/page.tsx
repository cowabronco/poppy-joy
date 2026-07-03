import type { Metadata } from "next";

import { Container, ShopFilterableGrid } from "@/components/poppy";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";
import { getProductByHandle } from "@/lib/products";
import { getStorefrontProducts } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/money";
import { getProductAvailabilityLabel, isProductAvailableForPurchase } from "@/lib/shopify/availability";
import type { StorefrontProduct } from "@/lib/shopify/types";
import type { Product } from "@/lib/products";

const productFilterMetadata: Record<string, { colors: string[] }> = {
  "zig-zag": { colors: ["Warm", "Limoen"] },
  "double-joy": { colors: ["Pistache", "Paars"] },
  "poppy-dots": { colors: ["Mosgroen"] },
  "wavy-joy": { colors: ["Aardetinten", "Turquoise"] },
  "cobalt-blue": { colors: ["Cobalt"] },
};

function storefrontToProduct(sp: StorefrontProduct): Product {
  const local = getProductByHandle(sp.handle);

  return {
    handle: sp.handle,
    name: sp.title,
    price: formatMoney(sp.price) ?? `€${Number(sp.price.amount).toFixed(2).replace(".", ",")}`,
    subtitle: local?.subtitle ?? "",
    description: sp.description || local?.description || "",
    details: local?.details ?? "",
    materialTags: local?.materialTags ?? [],
    materials: local?.materials ?? "",
    dimensions: local?.dimensions ?? "",
    care: local?.care ?? "",
    story: local?.story ?? "",
    published: true,
  };
}

export const metadata: Metadata = pageMetadata("Shop", pageDescriptions.shop);

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const storefrontProducts = await getStorefrontProducts(50);

  const entries = storefrontProducts.map((sp) => {
    const product = storefrontToProduct(sp);
    const filterMeta = productFilterMetadata[sp.handle];

    return {
      product,
      imageSrc: sp.featuredImage?.url ?? sp.images[0]?.url,
      filters: {
        collection: "Celebrate Joy" as const,
        materials: product.materialTags,
        colors: filterMeta?.colors ?? [],
        availability: getProductAvailabilityLabel(sp),
      },
      soldOut: !isProductAvailableForPurchase(sp),
    };
  });

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
            <span className="font-sans text-[0.28em] font-medium uppercase tracking-[0.28em] text-brand-purple sm:text-[0.3em] md:tracking-[0.34em] lg:text-[0.26em]">
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
