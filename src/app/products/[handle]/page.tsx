import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
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
} from "@/components/poppy";
import { ProductPurchaseToolbar } from "@/components/poppy/product-purchase-toolbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createStorefrontCart } from "@/lib/shopify/cart";
import {
  getFeaturedImageByHandle,
  getStorefrontProductByHandle,
} from "@/lib/shopify/products";
import type { ShopifyImage } from "@/lib/shopify/types";
import {
  formatProductDescription,
  getPublishedProductByHandle,
  publishedProducts,
} from "@/lib/products";
import { pageMetadata } from "@/lib/site-metadata";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export function generateStaticParams() {
  return publishedProducts.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = getPublishedProductByHandle(handle);

  if (!product) {
    return {};
  }

  return pageMetadata(product.name, product.description);
}

function formatPrice(price?: { amount: string; currencyCode: string }) {
  if (!price) {
    return null;
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: price.currencyCode,
  }).format(Number(price.amount));
}

function getGalleryImages(images: ShopifyImage[], productName: string) {
  return images.map((image, index) => ({
    type: "image" as const,
    src: image.url,
    alt: image.altText ?? `${productName} productafbeelding ${index + 1}`,
    aspectRatio: "4:5" as const,
  }));
}

async function addToCart(formData: FormData) {
  "use server";

  const variantId = formData.get("variantId");

  if (typeof variantId !== "string" || !variantId) {
    return;
  }

  const rawQuantity = Number(formData.get("quantity"));
  const quantity = Number.isFinite(rawQuantity)
    ? Math.min(Math.max(Math.trunc(rawQuantity), 1), 12)
    : 1;

  const cart = await createStorefrontCart([
    {
      merchandiseId: variantId,
      quantity,
    },
  ]);

  if (cart?.checkoutUrl) {
    redirect(cart.checkoutUrl);
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getPublishedProductByHandle(handle);

  if (!product) {
    notFound();
  }

  let storefrontProduct = null;
  let imageByHandle: Record<string, string> = {};

  try {
    [storefrontProduct, imageByHandle] = await Promise.all([
      getStorefrontProductByHandle(handle),
      getFeaturedImageByHandle(),
    ]);
  } catch (error) {
    console.error(`Unable to load Shopify product ${handle}.`, error);
  }

  const activeVariant = storefrontProduct?.variants.find(
    (variant) => variant.availableForSale
  );
  const galleryImages = getGalleryImages(
    storefrontProduct?.images ?? [],
    product.name
  );
  const relatedProducts = publishedProducts
    .filter((relatedProduct) => relatedProduct.handle !== product.handle)
    .slice(0, 3);
  const displayPrice = formatPrice(activeVariant?.price) ?? product.price;
  const canAddToCart = Boolean(activeVariant && storefrontProduct?.availableForSale);
  const productDescription = formatProductDescription(
    storefrontProduct?.description || product.description
  );
  const productSummaryFacts = [
    { label: "Vlaggetjes", value: "12", Icon: Flag },
    { label: "Totale lengte", value: "450 cm", Icon: Ruler },
  ];
  const productFacts = [
    product.materials.replace(/\.$/, ""),
    "Dubbelzijdig gestikt",
    "Handgemaakt in small batches",
  ];

  return (
    <main className="min-h-screen bg-brand-off-white text-brand-black">
      <Container className="pb-16 pt-8 md:pt-12 lg:pb-24">
        <Link
          href="/shop"
          className="inline-flex text-xs uppercase tracking-[0.24em] text-brand-black/55 transition hover:text-brand-purple"
        >
          Terug naar shop
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)] lg:items-start">
          <ProductGallery media={galleryImages} productName={product.name} />

          <article className="rounded-[2rem] border border-border bg-[#F2EDE3] p-6 sm:p-8 lg:sticky lg:top-8">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-purple">
              Celebrate Joy
            </p>
            <div className="mt-5 grid gap-3">
              <div>
                <h1 className="serif text-5xl font-semibold leading-none md:text-6xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-brand-black/55">
                  {product.subtitle}
                </p>
              </div>
              <Price className="serif text-5xl font-semibold leading-none md:text-6xl">
                {displayPrice}
              </Price>
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
              defaultValue="details"
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
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Productdetails
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {product.details}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Wasadvies
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {product.care}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </article>
        </section>
      </Container>

      <section className="border-y border-border bg-[#F2EDE3] py-12">
        <Container className="grid gap-4 md:grid-cols-4">
          {[
            { title: "Ontworpen om te hergebruiken", Icon: RefreshCw },
            { title: "Handgemaakt in small batches", Icon: HeartHandshake },
            { title: "Verfijnde stoffen", Icon: Sparkles },
            { title: "Mooi om cadeau te geven", Icon: PackageCheck },
          ].map(({ title, Icon }) => (
            <div
              key={title}
              className="rounded-[1.5rem] border border-border bg-brand-off-white/60 p-5"
            >
              <Icon className="h-5 w-5 text-brand-purple" />
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-brand-black/65">
                {title}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="rounded-[2rem] border border-border bg-brand-beige p-8 md:p-10">
            <Leaf className="h-6 w-6 text-brand-green" />
            <p className="serif mt-6 text-3xl leading-tight text-brand-black md:text-4xl">
              {product.story}
            </p>
            <p className="mt-6 text-sm leading-6 text-brand-black/62">
              Bewaar de lijn na gebruik rustig op in een droge kast of lade. Zo
              wordt het geen wegwerpdecoratie, maar een klein terugkerend
              ontwerpobject in huis.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#F2EDE3] py-16 lg:py-24">
        <Container>
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
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.handle}
                product={relatedProduct}
                imageSrc={imageByHandle[relatedProduct.handle]}
                showDetails={false}
              />
            ))}
          </div>
        </Container>
      </section>

      <ProductPurchaseToolbar
        action={addToCart}
        canAddToCart={canAddToCart}
        price={displayPrice}
        productName={product.name}
        variantId={activeVariant?.id}
      />
    </main>
  );
}
