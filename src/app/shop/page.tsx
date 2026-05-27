import { Container, ShopFilterableGrid } from "@/components/poppy";
import { publishedProducts } from "@/lib/products";
import { getFeaturedImageByHandle } from "@/lib/shopify/products";

const shopHeroImage =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/hero-bg.png?v=1778763881";

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
    <main className="min-h-screen bg-brand-off-white pb-20 text-brand-black">
      <section className="relative isolate overflow-hidden pt-20 md:pt-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${shopHeroImage}')` }}
        />
        <div aria-hidden className="absolute inset-0 bg-brand-black/56" />

        <Container className="relative py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.32em] text-brand-off-white/80">
              Shop
            </p>
            <h1 className="serif mt-5 max-w-2xl text-5xl font-semibold leading-[0.95] text-brand-off-white md:text-7xl">
              Celebrate Joy
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/85">
              Vier tijdloze vlaggenlijnen in verfijnde stoffen. Gemaakt om keer
              op keer opnieuw te gebruiken, van kleine rituelen tot grote
              vieringen.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <ShopFilterableGrid products={entries} />
      </Container>
    </main>
  );
}
