import { Container, EditorialHeading, ProductCard } from "@/components/poppy";
import { products } from "@/lib/products";
import { getStorefrontProducts } from "@/lib/shopify/products";

const placeholderImageSrc =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/placeholder.jpg?v=1778760581";

const filterGroups = [
  {
    title: "Collection",
    options: ["Celebrate Joy"],
  },
  {
    title: "Materiaal",
    options: ["Linnen", "Jacquard", "Velours", "Katoen"],
  },
  {
    title: "Kleur",
    options: ["Warm", "Pistache", "Paars", "Kobalt", "Aardetinten"],
  },
  {
    title: "Beschikbaarheid",
    options: ["Op voorraad", "Binnenkort"],
  },
];

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

  return (
    <main className="min-h-screen bg-brand-off-white pb-20 pt-16 text-brand-black">
      <Container>
        <EditorialHeading
          eyebrow="Shop"
          title="Celebrate Joy"
          description="Ontdek de eerste drop met vijf tijdloze vlaggenlijnen. De sidebar staat klaar voor filtering zodra het assortiment groeit."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[2rem] border border-border bg-[#F2EDE3] p-6 lg:sticky lg:top-8">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-black/55">
              Filters
            </p>
            <p className="mt-3 text-sm leading-6 text-brand-black/65">
              Deze filterindeling is alvast opgezet en wordt in de volgende stap interactief gemaakt.
            </p>

            <div className="mt-8 space-y-7">
              {filterGroups.map((group) => (
                <section key={group.title}>
                  <h2 className="text-xs uppercase tracking-[0.2em] text-brand-black/55">
                    {group.title}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {group.options.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          aria-disabled="true"
                          className="w-full rounded-full border border-border bg-brand-off-white/80 px-3 py-2 text-left text-sm text-brand-black/72 transition hover:border-brand-purple/40 hover:text-brand-purple"
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </aside>

          <section aria-label="Producten" className="grid gap-8 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product.handle}
                product={product}
                imageSrc={imageByHandle[product.handle] ?? placeholderImageSrc}
              />
            ))}
          </section>
        </div>
      </Container>
    </main>
  );
}
