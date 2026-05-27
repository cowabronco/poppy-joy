import {
  HeartHandshake,
  Leaf,
  PartyPopper,
  RefreshCw,
  Scissors,
  Sparkles,
  WashingMachine,
} from "lucide-react";

import type { Metadata } from "next";

import {
  Container,
  EditorialHeading,
  HeroVideo,
  ProductCard,
  Reveal,
} from "@/components/poppy";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { publishedProducts, values } from "@/lib/products";
import { getFeaturedImageByHandle } from "@/lib/shopify/products";

export const metadata: Metadata = pageMetadata(
  "Poppy Joy | For moments that deserve joy · Designed to stay",
  pageDescriptions.home,
  { absolute: true }
);

const usps = [
  { label: values[0], Icon: RefreshCw },
  { label: values[1], Icon: Scissors },
  { label: values[2], Icon: Sparkles },
  { label: values[3], Icon: PartyPopper },
  { label: values[4], Icon: HeartHandshake },
  { label: values[5], Icon: Leaf },
];

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
      "Dankzij de katoenen uiteinden hang je de vlaggenlijn makkelijk op en style je die telkens opnieuw, binnen of buiten, voor ieder moment.",
    Icon: PartyPopper,
  },
  {
    title: "Wasadvies",
    description:
      "Was op 30 graden. Exacte samenstelling en verzorging vind je bij de productdetails.",
    Icon: WashingMachine,
  },
];

export default async function Home() {
  const imageByHandle = await getFeaturedImageByHandle();
  const heroVideoUrl =
    process.env.NEXT_PUBLIC_SHOPIFY_HERO_VIDEO_URL ||
    "https://cdn.shopify.com/videos/c/o/v/31ed7d7d21a2451b964dd6646dddd3ff.mp4";
  const heroPosterUrl = process.env.NEXT_PUBLIC_SHOPIFY_HERO_VIDEO_POSTER_URL;

  return (
    <main className="min-h-screen overflow-hidden text-brand-black">
      <section className="relative isolate min-h-svh overflow-hidden lg:min-h-[60svh]">
        <svg
          aria-hidden
          className="pointer-events-none absolute h-0 w-0"
          focusable="false"
        >
          <filter id="hero-red-to-purple" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                0.76 0.04 0.20 0 0
                0.08 0.92 0.00 0 0
                0.70 0.04 0.96 0 0
                0.00 0.00 0.00 1 0
              "
            />
          </filter>
        </svg>

        {heroVideoUrl ? (
          <HeroVideo src={heroVideoUrl} poster={heroPosterUrl} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/25 to-brand-black/45" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/44 via-brand-black/34 to-brand-purple/46" />

        <Container className="relative z-10 flex min-h-svh flex-col justify-center gap-10 pb-16 pt-20 md:pb-24 lg:grid lg:min-h-[60svh] lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-28">
          <Reveal className="max-w-3xl text-brand-off-white">
            <p className="mb-6 text-xs uppercase tracking-[0.36em] text-brand-off-white/85">
              Designed to stay made with love
            </p>
            <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.93] md:text-8xl">
              For moments that deserve joy.
            </h1>
            <p className="mt-8 max-w-2xl leading-7 text-brand-off-white/85">
              Tijdloze stoffen vlaggenlijnen voor vieringen groot en klein,
              handgemaakt van verfijnde materialen die keer op keer opnieuw
              gebruikt mogen worden.
            </p>
            <div className="mt-10">
              <Button
                asChild
                className="rounded-full bg-brand-purple px-7 py-6 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90"
              >
                <a href="/shop">Shop de collectie</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="hidden lg:block lg:justify-self-end">
            <div className="relative rounded-[2.6rem] border border-white/10 bg-black/10 p-8 shadow-none backdrop-blur-none">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-white/20 bg-brand-off-white/80 p-6 text-brand-black">
                  <p className="inline-block w-fit rounded-full bg-brand-butter px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-brand-black/65">
                    Atelier note
                  </p>
                  <p className="serif mt-4 text-2xl leading-tight md:text-3xl">
                    Ambachtelijk, persoonlijk en ontworpen om te blijven.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-white/20 bg-brand-off-white/80 p-6 text-brand-black">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-black/55">
                    Materialen
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-butter px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-black/70">
                      <Leaf size={12} />
                      Verfijnde stoffen
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-butter px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-black/70">
                      <Sparkles size={12} />
                      Tijdloos design
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm text-brand-black/65">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-butter" />
                      Linnen, katoen, velours en jacquard
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-butter" />
                      Dubbelzijdige afwerking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-butter" />
                      Herbruikbaar door elk seizoen
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-brand-beige">
        <Container className="grid grid-auto-rows-fr gap-4 py-9 md:grid-cols-2 xl:grid-cols-3">
          {usps.map(({ label, Icon }, index) => (
            <Reveal key={label} delayMs={index * 60}>
              <article className="flex h-full items-center justify-start gap-4 rounded-2xl border border-border bg-brand-off-white/80 p-4 text-left">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-butter text-brand-black/70">
                  <Icon size={18} />
                </span>
                <p className="text-xs uppercase tracking-[0.22em] text-brand-black/70">
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
              Vier unieke ontwerpen, elk dubbelzijdig gestikt en gemaakt voor
              interieur, tuinfeest, verjaardag of spontaan diner.
            </p>
          </Reveal>

          <div className="grid grid-auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
            {publishedProducts.map((product, index) => (
              <Reveal key={product.name} delayMs={index * 60}>
                <ProductCard
                  product={product}
                  imageSrc={imageByHandle[product.handle]}
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
            <EditorialHeading
              eyebrow="Story"
              eyebrowTone="butter"
              title="Omdat vieren vaker mag."
              description="Stoffen vlaggenlijnen met de warmte van handwerk — bedoeld om telkens opnieuw tevoorschijn te halen, van gezellige tafels tot tuinfeesten."
            />
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
                className="absolute inset-0 bg-gradient-to-t from-brand-black/88 via-brand-black/45 to-brand-black/15"
              />
              <div className="relative z-10 mt-auto">
                <Badge
                  variant="outline"
                  className="mb-4 border-0 bg-brand-butter text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-butter"
                >
                  Wat is het
                </Badge>
                <p className="serif text-[1.35rem] leading-[1.55] text-brand-off-white md:text-2xl md:leading-[1.48]">
                  Poppy Joy ontwerpt herbruikbare stoffen vlaggenlijnen —
                  handgemaakt in small batches van verfijnde materialen, voor
                  kleine momenten en grote vieringen die je keer op keer wilt
                  herbeleven.
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
                className="absolute inset-0 bg-gradient-to-t from-brand-black/88 via-brand-black/45 to-brand-black/15"
              />
              <div className="relative z-10 mt-auto">
                <Badge
                  variant="outline"
                  className="mb-4 border-0 bg-brand-butter text-[10px] uppercase tracking-[0.18em] text-brand-black/65 shadow-sm hover:bg-brand-butter"
                >
                  Waarom Poppy Joy
                </Badge>
                <p className="serif text-[1.35rem] leading-[1.55] text-brand-off-white md:text-2xl md:leading-[1.48]">
                  Geen eenmalige plastic versiering, maar iets dat je bewaart,
                  hergebruikt en doorgeeft. Warm, stijlvol — en onderdeel van
                  verhalen die blijven.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>

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