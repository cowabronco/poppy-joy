import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
  ChevronDown,
  Flag,
  HeartHandshake,
  Leaf,
  PackageCheck,
  RefreshCw,
  Ruler,
  Sparkles,
} from "lucide-react";

import {
  Container,
  EditorialHeading,
  Price,
  ProductCard,
  ProductGallery,
  Reveal,
} from "@/components/poppy";
import { ProductPurchaseToolbar } from "@/components/poppy/product-purchase-toolbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addToCart } from "@/lib/cart/actions";
import { formatMoney } from "@/lib/money";
import {
  getFeaturedImageByHandle,
  getStorefrontProductByHandle,
  getStorefrontProducts,
} from "@/lib/shopify/products";
import type { ShopifyImage, StorefrontProduct } from "@/lib/shopify/types";
import {
  formatProductDescription,
  getProductByHandle,
  type Product,
} from "@/lib/products";
import { pageMetadata } from "@/lib/site-metadata";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  const storefrontProducts = await getStorefrontProducts(50);
  return storefrontProducts.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const local = getProductByHandle(handle);

  if (local) {
    return pageMetadata(local.name, local.description);
  }

  const sp = await getStorefrontProductByHandle(handle);
  if (!sp) return {};
  return pageMetadata(sp.title, sp.description);
}

function formatPrice(price?: { amount: string; currencyCode: string }) {
  return formatMoney(price ?? null);
}

function getGalleryImages(images: ShopifyImage[], productName: string) {
  return images.map((image, index) => ({
    type: "image" as const,
    src: image.url,
    alt: image.altText ?? `${productName} productafbeelding ${index + 1}`,
    aspectRatio: "4:5" as const,
  }));
}

function buildProductFacts(local: Product | undefined, sp: StorefrontProduct | null) {
  const facts: string[] = [];
  const materials = local?.materials?.replace(/\.$/, "");
  if (materials) facts.push(materials);
  facts.push("Dubbelzijdig gestikt");
  facts.push("Handgemaakt in small batches");
  return facts;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const local = getProductByHandle(handle);

  let storefrontProduct: StorefrontProduct | null = null;
  let imageByHandle: Record<string, string> = {};

  try {
    [storefrontProduct, imageByHandle] = await Promise.all([
      getStorefrontProductByHandle(handle),
      getFeaturedImageByHandle(),
    ]);
  } catch (error) {
    console.error(`Unable to load Shopify product ${handle}.`, error);
  }

  if (!local && !storefrontProduct) {
    notFound();
  }

  const productName = storefrontProduct?.title ?? local?.name ?? handle;
  const activeVariant = storefrontProduct?.variants.find(
    (variant) => variant.availableForSale
  );
  const galleryImages = getGalleryImages(
    storefrontProduct?.images ?? [],
    productName
  );

  const allStorefrontProducts = await getStorefrontProducts(50);
  const relatedSPs = allStorefrontProducts
    .filter((p) => p.handle !== handle)
    .slice(0, 3);
  const relatedProducts: Array<{ product: Product; imageSrc?: string }> =
    relatedSPs.map((sp) => {
      const relLocal = getProductByHandle(sp.handle);
      return {
        product: {
          handle: sp.handle,
          name: sp.title,
          price: formatMoney(sp.price) ?? `€${Number(sp.price.amount).toFixed(2).replace(".", ",")}`,
          subtitle: relLocal?.subtitle ?? "",
          description: sp.description || relLocal?.description || "",
          details: relLocal?.details ?? "",
          materialTags: relLocal?.materialTags ?? [],
          materials: relLocal?.materials ?? "",
          dimensions: relLocal?.dimensions ?? "",
          care: relLocal?.care ?? "",
          story: relLocal?.story ?? "",
          published: true,
        },
        imageSrc: imageByHandle[sp.handle] ?? sp.featuredImage?.url,
      };
    });

  const displayPrice =
    formatPrice(activeVariant?.price) ?? local?.price ?? formatPrice(storefrontProduct?.price);
  const canAddToCart = Boolean(activeVariant && storefrontProduct?.availableForSale);
  const productDescription = formatProductDescription(
    storefrontProduct?.description || local?.description || ""
  );
  const productSummaryFacts = [
    { label: "Vlaggetjes", value: "12", Icon: Flag },
    { label: "Totale lengte", value: "450 cm", Icon: Ruler },
  ];
  const productFacts = buildProductFacts(local, storefrontProduct);

  return (
    <main className="min-h-screen bg-brand-off-white pt-24 text-brand-black md:pt-28">
      <Container className="pb-16 lg:pb-24">
        <Reveal>
          <Link
            href="/shop"
            className="inline-flex text-xs uppercase tracking-[0.24em] text-brand-black/55 transition hover:text-brand-purple"
          >
            Terug naar shop
          </Link>
        </Reveal>

        <section className="mt-5 grid gap-10 lg:mt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)] lg:items-start">
          <Reveal>
            <ProductGallery media={galleryImages} productName={productName} />
          </Reveal>

          <Reveal delayMs={80}>
            <article className="rounded-[2rem] border border-border bg-[#F2EDE3] p-6 sm:p-8 lg:sticky lg:top-28 xl:top-32">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-purple">
              Celebrate Joy
            </p>
            <div className="mt-5 grid gap-3">
              <div>
                <h1 className="serif text-5xl font-semibold leading-none md:text-6xl">
                  {productName}
                </h1>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Price className="serif text-5xl font-semibold leading-none md:text-6xl">
                  {displayPrice}
                </Price>
                <span className="text-xs text-brand-black/50">Inclusief BTW</span>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {productSummaryFacts.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl bg-brand-off-white/70 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2EDE3] text-brand-purple">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-black/45">
                      {label}
                    </span>
                    <span className="serif text-2xl font-semibold leading-none text-brand-black">
                      {value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <ul className="mt-5 grid gap-3">
              {productFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 rounded-2xl bg-brand-off-white/70 p-4 text-sm leading-5 text-brand-black/72"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <form action={addToCart} className="mt-8">
              <input type="hidden" name="variantId" value={activeVariant?.id ?? ""} />
              <input type="hidden" name="returnPath" value="/cart" />
              <div className="grid gap-3 sm:grid-cols-[112px_minmax(0,1fr)]">
                <label className="sr-only" htmlFor="quantity">
                  Aantal
                </label>
                <span className="relative">
                  <select
                    id="quantity"
                    name="quantity"
                    defaultValue="1"
                    disabled={!canAddToCart}
                    className="h-13 w-full appearance-none rounded-full border border-border bg-brand-off-white px-5 pr-10 text-center text-sm font-medium text-brand-black outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 disabled:opacity-50"
                  >
                    {Array.from({ length: 12 }, (_, index) => index + 1).map(
                      (quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity}
                        </option>
                      )
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-black/45" />
                </span>
                <Button
                  type="submit"
                  disabled={!canAddToCart}
                  className="h-13 w-full rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90 disabled:bg-brand-black/20"
                >
                  {canAddToCart ? "In winkelwagen" : "Binnenkort beschikbaar"}
                </Button>
              </div>
            </form>

            <Accordion
              type="single"
              collapsible
              className="mt-8 rounded-[1.5rem] border border-border bg-brand-off-white/55 px-4"
            >
              <AccordionItem value="description" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Omschrijving
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {productDescription}
                </AccordionContent>
              </AccordionItem>
              {(local?.details) ? (
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Productdetails
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {local.details}
                </AccordionContent>
              </AccordionItem>
              ) : null}
              {(local?.care) ? (
              <AccordionItem value="care" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Wasadvies
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {local.care}
                </AccordionContent>
              </AccordionItem>
              ) : null}
            </Accordion>
            </article>
          </Reveal>
        </section>
      </Container>

      <section className="border-y border-border bg-[#F2EDE3] py-12">
        <Container className="grid gap-4 md:grid-cols-4">
          {[
            { title: "Ontworpen om te hergebruiken", Icon: RefreshCw },
            { title: "Handgemaakt in small batches", Icon: HeartHandshake },
            { title: "Verfijnde stoffen", Icon: Sparkles },
            { title: "Mooi om cadeau te geven", Icon: PackageCheck },
          ].map(({ title, Icon }, index) => (
            <Reveal key={title} delayMs={index * 60} className="h-full">
              <div className="h-full rounded-[1.5rem] border border-border bg-brand-off-white/60 p-5">
                <Icon className="h-5 w-5 text-brand-purple" />
                <p className="mt-5 text-xs uppercase tracking-[0.22em] text-brand-black/65">
                  {title}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {local?.story ? (
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-brand-beige p-8 md:p-10">
              <Leaf className="h-6 w-6 text-brand-green" />
              <p className="serif mt-6 text-3xl leading-tight text-brand-black md:text-4xl">
                {local.story}
              </p>
              <p className="mt-6 text-sm leading-6 text-brand-black/62">
                Bewaar de lijn na gebruik rustig op in een droge kast of lade. Zo
                wordt het geen wegwerpdecoratie, maar een klein terugkerend
                ontwerpobject in huis.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
      ) : null}

      <section className="bg-[#F2EDE3] py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <EditorialHeading
                eyebrow="Misschien vind je dit ook mooi"
                title="Meer uit Celebrate Joy"
              />
              <Link
                href="/shop"
                className="rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.22em] text-brand-black/65 transition hover:border-brand-purple hover:text-brand-purple"
              >
                Bekijk alles
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {relatedProducts.map(({ product: relatedProduct, imageSrc }, index) => (
              <Reveal key={relatedProduct.handle} delayMs={index * 60}>
                <ProductCard
                  product={relatedProduct}
                  imageSrc={imageSrc}
                  showDetails={false}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProductPurchaseToolbar
        action={addToCart}
        canAddToCart={canAddToCart}
        price={displayPrice ?? ""}
        productName={productName}
        returnPath="/cart"
        variantId={activeVariant?.id}
      />
    </main>
  );
}
