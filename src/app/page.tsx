"use client";

import { useEffect, useState } from "react";
import {
  HeartHandshake,
  Leaf,
  PartyPopper,
  RefreshCw,
  Scissors,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { Container, EditorialHeading, ProductCard, Reveal } from "@/components/poppy";
import { Button } from "@/components/ui/button";
import { products, values } from "@/lib/products";

const footerLinkGroups = [
  {
    title: "Ontdek",
    links: [
      { label: "Shop", href: "#collection" },
      { label: "Story", href: "#story" },
      { label: "Materialen", href: "/materials" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Washing & care", href: "/care" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Juridisch",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
];

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
      "Gemaakt van verfijnde stoffen zoals linnen, jacquard, katoen, velours en polyester. Een deel van de stoffen draagt het Oeko-Tex label.",
    Icon: Leaf,
  },
  {
    title: "Gebruik",
    description:
      "Dankzij de katoenen uiteinden hang je de vlaggenlijn makkelijk op en style je die telkens opnieuw, binnen of buiten, voor ieder moment.",
    Icon: RefreshCw,
  },
  {
    title: "Wasadvies",
    description:
      "Je wast de vlaggenlijnen op 30 graden. De exacte samenstelling en verzorgingsinstructies vind je terug bij de productdetails.",
    Icon: Sparkles,
  },
];

export default function Home() {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust this value as needed
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const heroVideoUrl =
    process.env.NEXT_PUBLIC_SHOPIFY_HERO_VIDEO_URL ||
    "https://cdn.shopify.com/videos/c/o/v/31ed7d7d21a2451b964dd6646dddd3ff.mp4";
  const heroPosterUrl = process.env.NEXT_PUBLIC_SHOPIFY_HERO_VIDEO_POSTER_URL;
  const productPlaceholderSrc = "/placeholders/product-card.jpg";

  return (
    <main className="min-h-screen overflow-hidden text-brand-black">
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
          isFloating
            ? "bg-brand-off-white/95 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Container
          className={`flex items-center justify-center transition-all duration-500 ease-out ${
            isFloating ? "py-2" : "py-5"
          }`}
        >
          <nav className="flex items-center justify-center gap-6 text-xs uppercase tracking-[0.28em]">
            <a
              className={`relative font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
                isFloating
                  ? "text-brand-black/70 hover:text-brand-black after:bg-brand-black"
                  : "text-brand-off-white/80 hover:text-brand-off-white after:bg-brand-off-white"
              }`}
              href="#story"
            >
              Story
            </a>
            <a href="#" className="mx-3">
              <Image
                src="/brand/logo.png"
                alt="Poppy Joy"
                width={120}
                height={120}
                className={`object-contain transition-all duration-500 ease-out ${
                  isFloating ? "h-12" : "h-16"
                }`}
                style={{ width: "auto" }}
              />
            </a>
            <a
              className={`relative font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
                isFloating
                  ? "text-brand-black/70 hover:text-brand-black after:bg-brand-black"
                  : "text-brand-off-white/80 hover:text-brand-off-white after:bg-brand-off-white"
              }`}
              href="#collection"
            >
              Shop
            </a>
          </nav>
          <a
            href="#"
            className={`absolute right-12 transition-colors duration-300 ${
              isFloating
                ? "text-brand-black/70 hover:text-brand-black"
                : "text-brand-off-white/80 hover:text-brand-off-white"
            }`}
            aria-label="Winkelwagen"
          >
            <ShoppingBag size={22} />
          </a>
        </Container>
      </header>

      <section className="relative isolate min-h-[60svh] overflow-hidden">
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
          <video
            className="hero-video-rotated"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPosterUrl}
            aria-label="Poppy Joy hero video"
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 0.75;
            }}
            style={{ filter: "url(#hero-red-to-purple) brightness(0.74) contrast(1.08)" }}
          >
            <source src={heroVideoUrl} />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/25 to-brand-black/45" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/44 via-brand-black/34 to-brand-purple/46" />

        <Container className="relative z-10 grid min-h-[60svh] gap-10 pb-16 pt-28 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal className="max-w-3xl text-brand-off-white">
            <p className="mb-6 text-xs uppercase tracking-[0.36em] text-brand-off-white/85">
              Designed to stay made with love
            </p>
            <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.93] md:text-8xl">
              For moments that deserve joy.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-brand-off-white/85">
              Tijdloze stoffen vlaggenlijnen voor vieringen groot en klein,
              handgemaakt van verfijnde materialen die keer op keer opnieuw
              gebruikt mogen worden.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-full bg-brand-purple px-7 py-6 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90"
              >
                <a href="#collection">Shop de collectie</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-brand-off-white/35 bg-transparent px-7 py-6 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-off-white/10"
              >
                <a href="#story">Lees het verhaal</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="lg:justify-self-end">
            <div className="relative rounded-[2.6rem] border border-white/10 bg-black/10 p-8 shadow-none backdrop-blur-none">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-[1.8rem] border border-white/20 bg-brand-off-white/80 p-6 text-brand-black">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-purple">
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
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-purple">
                      <Leaf size={12} />
                      Verfijnde stoffen
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-black/8 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-black/75">
                      <Sparkles size={12} />
                      Tijdloos design
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm text-brand-black/65">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple/70" />
                      Linnen, katoen, velours en jacquard
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple/70" />
                      Dubbelzijdige afwerking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple/70" />
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
              <article className="flex h-full items-start gap-4 rounded-2xl border border-border bg-brand-off-white/80 p-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple/12 text-brand-purple">
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

      <Container
        id="story"
        className="grid gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <Reveal>
          <EditorialHeading eyebrow="Story" title="Omdat vieren vaker mag." />
        </Reveal>
        <div className="grid grid-auto-rows-fr gap-6 text-lg leading-8 text-brand-black/70 md:grid-cols-2">
          <Reveal delayMs={80} className="h-full">
            <article className="flex h-full flex-col rounded-[1.8rem] border border-border bg-brand-beige p-7">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-black">
                Wat is het
              </h3>
              <p>
                Poppy Joy ontwerpt stoffen herbruikbare vlaggenlijnen. De
                stoffen zijn met zorg en liefde uitgekozen en worden handgemaakt:
                ontworpen om het leven te vieren, juist in kleine momenten en
                grote momenten.
              </p>
            </article>
          </Reveal>
          <Reveal delayMs={140} className="h-full">
            <article className="flex h-full flex-col rounded-[1.8rem] border border-border bg-brand-beige p-7">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-black">
                Waarom Poppy Joy
              </h3>
              <p>
                Geen eenmalige plastic versiering, maar iets dat je blijft
                gebruiken en waarmee je jarenlang herinneringen blijft maken.
                Warm, stijlvol en met karakter.
              </p>
            </article>
          </Reveal>
        </div>
      </Container>

      <section id="collection" className="px-6 py-24">
        <Container className="px-0">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <EditorialHeading eyebrow="Drop 1" title="Celebrate Joy" />
            <p className="max-w-md leading-7 text-brand-black/70">
              Vijf unieke ontwerpen, elk dubbelzijdig gestikt en gemaakt voor
              interieur, tuinfeest, verjaardag of spontaan diner.
            </p>
          </Reveal>

          <div className="grid grid-auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-5">
            {products.map((product, index) => (
              <Reveal key={product.name} delayMs={index * 60}>
                <ProductCard product={product} imageSrc={productPlaceholderSrc} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container id="care" className="grid grid-auto-rows-fr gap-8 py-24 md:grid-cols-3">
        {careCards.map(({ title, description, Icon }, index) => (
          <Reveal key={title} delayMs={index * 80} className="h-full">
            <article className="flex h-full flex-col rounded-[2rem] border border-border bg-brand-beige p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
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

      <footer className="px-6 pb-10">
        <Container className="border-t border-border px-0 pt-10">
          <div className="grid gap-10 text-xs uppercase tracking-[0.2em] text-brand-black/65 md:grid-cols-3">
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-[11px] tracking-[0.24em] text-brand-black/45">
                  {group.title}
                </p>
                <div className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <a
                      key={link.label}
                      className="transition hover:text-brand-purple"
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-end justify-start">
            <Image
              src="/brand/logo.png"
              alt="Poppy Joy"
              width={110}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>
        </Container>
      </footer>
    </main>
  );
}