import {
  HeartHandshake,
  Leaf,
  PartyPopper,
  RefreshCw,
  Scissors,
  WashingMachine,
} from "lucide-react";

import type { Metadata } from "next";
import Image from "next/image";

import {
  Container,
  EditorialHeading,
  ProductCard,
  Reveal,
} from "@/components/poppy";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { values } from "@/lib/products";
import { getStorefrontProducts } from "@/lib/shopify/products";
import {
  getPrimaryImageUrl,
  mapStorefrontToDisplayProduct,
} from "@/lib/shopify/to-product";

export const metadata: Metadata = pageMetadata(
  pageTitles.home,
  pageDescriptions.home,
  { absolute: true, path: "/" }
);

export const dynamic = "force-dynamic";

const uspIcons = [RefreshCw, Scissors, PartyPopper, HeartHandshake] as const;

const usps = values.map((label, index) => ({
  label,
  Icon: uspIcons[index],
}));

const careCards = [
  {
    title: "Materialen",
    description:
      "Gemaakt van verfijnde stoffen zoals linnen, jacquard, katoen en velours. Een deel draagt het Oeko-Tex label.",
    Icon: Leaf,
  },
  {
    title: "Gebruik",
    description:
      "Dankzij de katoenen uiteinden hang je de vlaggenlijn makkelijk op en style je die telkens opnieuw.",
    Icon: PartyPopper,
  },
  {
    title: "Wasadvies",
    description:
      "Was voorzichtig op 30 graden, of lager. En laat aan de lucht drogen.",
    Icon: WashingMachine,
  },
];

const homeHeroImage =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/hero.jpg?v=1779897558";

const homeLifestyleImage =
  "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/hompage-support-foto.jpg?v=1782844633";

export default async function Home() {
  const storefrontProducts = await getStorefrontProducts(50);
  const homeProducts = storefrontProducts.map((sp) => ({
    product: mapStorefrontToDisplayProduct(sp),
    imageSrc: getPrimaryImageUrl(sp),
  }));

  return (
    <main className="min-h-screen overflow-hidden text-brand-black">
      <section className="relative isolate min-h-[80svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={homeHeroImage}
            alt="Picknicktafel met vlaggenlijn in een zonnige tuin aan het water"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-brand-black/40 to-brand-black/55" />

        <Container className="relative z-10 flex min-h-[80svh] flex-col justify-end pb-14 pt-24 md:pb-20 md:pt-28 lg:pb-24">
          <Reveal className="max-w-3xl text-brand-off-white">
            <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.93] md:text-8xl">
              For moments that deserve joy.
            </h1>
            <div className="mt-10">
              <Button
                asChild
                className="rounded-full bg-brand-purple px-7 py-6 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90"
              >
                <a href="/shop">Shop de collectie</a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-brand-beige">
        <Container className="grid grid-auto-rows-fr gap-3 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {usps.map(({ label, Icon }, index) => (
            <Reveal key={label} delayMs={index * 60}>
              <article className="flex h-full min-w-0 items-center justify-start gap-3 rounded-2xl border border-border bg-brand-off-white/80 p-3 sm:gap-4 sm:p-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-butter text-brand-black/70">
                  <Icon size={18} />
                </span>
                <p className="min-w-0 text-[10px] uppercase leading-4 tracking-[0.18em] text-brand-black/70 sm:text-xs sm:leading-5 sm:tracking-[0.22em]">
                  {label}
                </p>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section id="collection" className="px-6 py-24">
        <Container className="px-0">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <EditorialHeading eyebrow="Drop 1" title="Celebrate Joy" />
            <p className="max-w-md leading-7 text-brand-black/70">
              De eerste Poppy Joy collectie. Tijdloze stoffen vlaggenlijnen,
              ontworpen om de mooiste momenten keer op keer te vieren.
            </p>
          </Reveal>

          <div className="grid grid-auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeProducts.slice(0, 4).map(({ product, imageSrc }, index) => (
              <Reveal key={product.handle} delayMs={index * 60}>
                <ProductCard
                  product={product}
                  imageSrc={imageSrc}
                  showDetails={false}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={140} className="mt-12 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-brand-black/20 bg-transparent px-8 py-6 text-xs uppercase tracking-[0.22em] text-brand-black hover:border-brand-purple hover:text-brand-purple"
            >
              <a href="/shop">Alle Producten</a>
            </Button>
          </Reveal>
        </Container>
      </section>

      <Container
        id="story"
        className="grid gap-12 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
      >
        <Reveal>
          <div className="max-w-3xl">
            <EditorialHeading title="Omdat vieren vaker mag." />
            <Button
              asChild
              variant="outline"
              className="mt-8 rounded-full border-brand-black/20 bg-transparent px-8 py-6 text-xs uppercase tracking-[0.22em] text-brand-black hover:border-brand-purple hover:text-brand-purple"
            >
              <a href="/story">Lees het verhaal</a>
            </Button>
          </div>
        </Reveal>
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <Reveal delayMs={80} className="h-full">
            <article className="relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-[1.8rem] border border-white/20 p-7 text-brand-off-white md:min-h-[22rem]">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/story/material-closeup4.jpg')" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-brand-black/88 via-brand-black/45 to-brand-black/15"
              />
              <div className="relative z-10">
                <Badge
                  variant="outline"
                  className="mb-4 border-0 bg-brand-butter text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-butter"
                >
                  Wat is het
                </Badge>
                <p className="serif text-[1.35rem] leading-[1.55] text-brand-off-white md:text-2xl md:leading-[1.48]">
                  Poppy Joy ontwerpt herbruikbare stoffen vlaggenlijnen. De
                  stoffen zijn met zorg en liefde uitgekozen en worden
                  handgemaakt - ontworpen om het leven te vieren, juist in de
                  kleine momenten en grote momenten.
                </p>
              </div>
            </article>
          </Reveal>
          <Reveal delayMs={140} className="h-full">
            <article className="relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-[1.8rem] border border-white/20 p-7 text-brand-off-white md:min-h-[22rem]">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/story/material-closeup6.jpg')" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-brand-black/88 via-brand-black/45 to-brand-black/15"
              />
              <div className="relative z-10">
                <Badge
                  variant="outline"
                  className="mb-4 border-0 bg-brand-butter text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-butter"
                >
                  Waarom Poppy Joy
                </Badge>
                <p className="serif text-[1.35rem] leading-[1.55] text-brand-off-white md:text-2xl md:leading-[1.48]">
                  De vlaggenlijnen van Poppy Joy zijn tijdloos, duurzaam en
                  gemaakt om jarenlang mee te gaan. Geen eenmalige versiering.
                  Maar een vlaggenlijn die je bewaart, steeds opnieuw ophangt en
                  die met de jaren onderdeel wordt van de mooiste herinneringen.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>

      <section className="relative h-[50vh] min-h-[320px] w-full md:h-[60vh]">
        <Image
          src={homeLifestyleImage}
          alt="Sfeerbeeld van een gedekte tafel met stoffen vlaggenlijn in een warme ruimte"
          fill
          quality={100}
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/brand/homepage-lifestyle-desktop.jpg"
          alt="Stoffen vlaggenlijn opgehangen in een warme ruimte met planten"
          fill
          quality={100}
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </section>

      <Container id="care" className="grid grid-auto-rows-fr gap-8 py-24 md:grid-cols-3">
        {careCards.map(({ title, description, Icon }, index) => (
          <Reveal key={title} delayMs={index * 80} className="h-full">
            <article className="flex h-full flex-col rounded-[2rem] border border-border bg-brand-beige p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-butter text-brand-black/70">
                <Icon size={20} />
              </span>
              <h2 className="serif mt-6 text-4xl font-semibold text-brand-black">
                {title}
              </h2>
              <p className="mt-5 leading-7 text-brand-black/70">{description}</p>
            </article>
          </Reveal>
        ))}
      </Container>

    </main>
  );
}