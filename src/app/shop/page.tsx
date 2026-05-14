import { Container, ShopFilterableGrid } from "@/components/poppy";
import { products } from "@/lib/products";
import { getStorefrontProducts } from "@/lib/shopify/products";

const placeholderImageSrc =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/placeholder.jpg?v=1778760581";

const shopHeroImage =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/hero-bg.png?v=1778763881";

const productFilterMetadata = {
  "zig-zag": {
    materials: ["Jacquard", "Katoen"],
    colors: ["Warm", "Pistache"],
    availability: "Op voorraad" as const,
  },
  "double-joy": {
    materials: ["Linnen", "Katoen"],
    colors: ["Pistache", "Paars"],
    availability: "Op voorraad" as const,
  },
  "poppy-dots": {
    materials: ["Velours"],
    colors: ["Warm"],
    availability: "Op voorraad" as const,
  },
  "wavy-joy": {
    materials: ["Jacquard", "Katoen"],
    colors: ["Aardetinten"],
    availability: "Op voorraad" as const,
  },
  "cobalt-blue": {
    materials: ["Velours", "Katoen"],
    colors: ["Kobalt"],
    availability: "Op voorraad" as const,
  },
};

async function getImageByHandle() {
  try {
    const storefrontProducts = await getStorefrontProducts(20);
    return storefrontProducts.reduce<Record<string, string>>((acc, product) => {
      if (product.featuredImage?.url) {
        acc[product.handle] = product.featuredImage.url;
      }

      return acc;
    }, {});
  } catch (error) {
    console.error("Unable to load Shopify product images for /shop.", error);
    return {};
  }
}

export default async function ShopPage() {
  const imageByHandle = await getImageByHandle();
  const entries = products.map((product) => ({
    product,
    imageSrc: imageByHandle[product.handle] ?? placeholderImageSrc,
    filters: {
      collection: "Celebrate Joy" as const,
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
              Vijf tijdloze vlaggenlijnen in verfijnde stoffen. Gemaakt om keer
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
