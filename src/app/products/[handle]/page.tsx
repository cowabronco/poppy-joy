import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
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
import { ProductQuantitySelect } from "@/components/poppy/product-quantity-select";
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
  getAddToCartLabel,
  getProductPurchaseState,
  isProductAvailableForPurchase,
} from "@/lib/shopify/availability";
import {
  getStorefrontProductByHandle,
  getStorefrontProducts,
} from "@/lib/shopify/products";
import {
  buildProductFactList,
  getGalleryImages,
  getPrimaryImageUrl,
  getProductSummaryFacts,
  mapStorefrontToDisplayProduct,
} from "@/lib/shopify/to-product";
import { formatProductDescription } from "@/lib/products";
import { pageMetadata, defaultSocialImage } from "@/lib/site-metadata";
import {
  productMetaDescription,
  productMetaTitle,
} from "@/lib/product-seo";
import {
  productBreadcrumbJsonLd,
  productJsonLd,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/poppy/json-ld";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const sp = await getStorefrontProductByHandle(handle);

  if (!sp?.title || !sp.description) {
    return {};
  }

  const featured = sp.featuredImage ?? sp.images[0];
  const images = featured
    ? [
        {
          url: featured.url,
          width: featured.width ?? defaultSocialImage.width,
          height: featured.height ?? defaultSocialImage.height,
          alt: featured.altText ?? sp.title,
        },
      ]
    : undefined;

  return pageMetadata(
    productMetaTitle(sp.title),
    productMetaDescription(sp),
    {
      path: `/products/${handle}`,
      ...(images ? { images } : {}),
    }
  );
}

function formatPrice(price?: { amount: string; currencyCode: string }) {
  return formatMoney(price ?? null);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  let storefrontProduct = null;

  try {
    storefrontProduct = await getStorefrontProductByHandle(handle);
  } catch (error) {
    console.error(`Unable to load Shopify product ${handle}.`, error);
  }

  if (!storefrontProduct) {
    notFound();
  }

  const displayProduct = mapStorefrontToDisplayProduct(storefrontProduct);
  const productName = storefrontProduct.title;
  const {
    canAddToCart,
    isSoldOut,
    displayVariant,
    purchasableVariant,
    availabilityLabel,
    maxQuantity,
  } = getProductPurchaseState(storefrontProduct);
  const galleryImages = getGalleryImages(
    storefrontProduct.images,
    productName
  );

  const allStorefrontProducts = await getStorefrontProducts(50);
  const relatedSPs = allStorefrontProducts
    .filter((p) => p.handle !== handle)
    .slice(0, 3);
  const relatedProducts = relatedSPs.map((sp) => ({
    product: mapStorefrontToDisplayProduct(sp),
    imageSrc: getPrimaryImageUrl(sp),
    soldOut: !isProductAvailableForPurchase(sp),
  }));

  const displayPrice = formatPrice(displayVariant?.price);
  const addToCartLabel = getAddToCartLabel(canAddToCart, isSoldOut);
  const productDescription = formatProductDescription(displayProduct.description);
  const { flagCount, productLength } = getProductSummaryFacts(storefrontProduct);
  const productSummaryFacts = [
    { label: "Vlaggetjes", value: String(flagCount), Icon: Flag },
    { label: "Totale lengte", value: `${productLength} cm`, Icon: Ruler },
  ];
  const productFacts = buildProductFactList(displayProduct);
  const dropLabel = storefrontProduct.metafields.drop ?? "Celebrate Joy";

  return (
    <main className="min-h-screen bg-brand-off-white pt-24 text-brand-black md:pt-28">
      <JsonLd data={productJsonLd(storefrontProduct)} />
      <JsonLd data={productBreadcrumbJsonLd(productName, handle)} />
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
              {dropLabel}
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
              {isSoldOut ? (
                <p className="text-xs uppercase tracking-[0.22em] text-brand-black/55">
                  {availabilityLabel}
                </p>
              ) : null}
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
              <input
                type="hidden"
                name="variantId"
                value={purchasableVariant?.id ?? ""}
              />
              <input type="hidden" name="returnPath" value="/cart" />
              <div className="grid gap-3 sm:grid-cols-[112px_minmax(0,1fr)]">
                <ProductQuantitySelect
                  id="quantity"
                  maxQuantity={maxQuantity}
                  disabled={!canAddToCart}
                />
                <Button
                  type="submit"
                  disabled={!canAddToCart}
                  className="h-13 w-full rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90 disabled:bg-brand-black/20"
                >
                  {addToCartLabel}
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
              {(displayProduct.details) ? (
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Productdetails
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {displayProduct.details}
                </AccordionContent>
              </AccordionItem>
              ) : null}
              {(displayProduct.care) ? (
              <AccordionItem value="care" className="border-border">
                <AccordionTrigger className="py-4 text-xs uppercase tracking-[0.22em] text-brand-black/70 hover:no-underline">
                  Wasadvies
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-6 text-brand-black/65">
                  {displayProduct.care}
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

      {displayProduct.story ? (
      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-brand-beige p-8 md:p-10">
              <Leaf className="h-6 w-6 text-brand-green" />
              <p className="serif mt-6 text-3xl leading-tight text-brand-black md:text-4xl">
                {displayProduct.story}
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
            {relatedProducts.map(({ product: relatedProduct, imageSrc, soldOut }, index) => (
              <Reveal key={relatedProduct.handle} delayMs={index * 60}>
                <ProductCard
                  product={relatedProduct}
                  imageSrc={imageSrc}
                  showDetails={false}
                  soldOut={soldOut}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProductPurchaseToolbar
        action={addToCart}
        addToCartLabel={addToCartLabel}
        canAddToCart={canAddToCart}
        maxQuantity={maxQuantity}
        price={displayPrice ?? ""}
        productName={productName}
        returnPath="/cart"
        variantId={purchasableVariant?.id}
      />
    </main>
  );
}
