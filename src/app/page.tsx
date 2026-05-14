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

const footerLinks = [
  "Shipping & returns",
  "Washing & care",
  "FAQ",
  "Contact",
  "Instagram",
  "Privacy Policy",
  "Terms & Conditions",
];

const usps = [
  { label: values[0], Icon: RefreshCw },
  { label: values[1], Icon: Scissors },
  { label: values[2], Icon: Sparkles },
  { label: values[3], Icon: PartyPopper },
  { label: values[4], Icon: HeartHandshake },
  { label: values[5], Icon: Leaf },
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
    "https://cdn.shopify.com/videos/c/o/v/3eef1d0643ce4c65a38b63f6b1c3c491.mov";
  const heroPosterUrl = process.env.NEXT_PUBLIC_SHOPIFY_HERO_VIDEO_POSTER_URL;
  const productPlaceholderSrc = "/placeholders/product-card.jpg";

  return (
    <main className="min-h-screen overflow-hidden text-brand-black">
      <section className="relative isolate min-h-[60svh] overflow-hidden">
        {heroVideoUrl ? (
          <video
            className="hero-video-rotated"
            autoPlay
            muted
            loop
            playsInline
            poster={heroPosterUrl}
            aria-label="Poppy Joy hero video"
          >
            <source src={heroVideoUrl} />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/25 to-brand-black/45" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />

          <header className={`sticky top-0 z-20 text-brand-off-white/80 transition-all duration-300 ease-in-out ${isFloating ? "bg-brand-black/80 backdrop-blur-md shadow-lg py-3" : "py-6"}`}>
            <Container className="relative flex items-center justify-between py-6 text-xs uppercase tracking-[0.28em]">
              <nav className="flex gap-8 text-[11px]">
                <a className="transition hover:text-brand-off-white" href="#story">
                  Story
                </a>
              </nav>
              <a href="#" className="absolute left-1/2 -translate-x-1/2 font-semibold tracking-[0.34em] text-brand-off-white">
                Poppy Joy
              </a>
              <nav className="flex gap-8 text-[11px]">
                <a className="transition hover:text-brand-off-white" href="#collection">
                  Shop
                </a>
                <a className="transition hover:text-brand-off-white" href="#">
                  Winkelwagen
                </a>
                <a className="transition hover:text-brand-off-white" href="#">
                  Checkout
                </a>
              </nav>
            </Container>
          </header>

        <Container className="relative z-10 grid min-h-[60svh] gap-10 pb-16 pt-28 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal className="max-w-3xl text-brand-off-white">
            <p className="mb-6 text-xs uppercase tracking-[0.36em] text-brand-off-white/85">
              Reusable fabric bunting
            </p>
            <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.93] md:text-8xl">
              For moments that deserve joy.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-brand-off-white/85">
              Designed to stay. Made with love. Tijdloze stoffen vlaggenlijnen
              voor vieringen groot en klein, handgemaakt van verfijnde
              materialen die keer op keer opnieuw gebruikt mogen worden.
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
                  <p className="serif mt-4 text-3xl leading-tight md:text-4xl">
                    Ambachtelijk, persoonlijk en ontworpen om te blijven.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-white/20 bg-brand-off-white/80 p-6 text-brand-black">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-black/55">
                    Materialen
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-brand-black/65">
                    <li>Linnen, katoen, velours, jacquard</li>
                    <li>Dubbelzijdige afwerking</li>
                    <li>Herbruikbaar voor elk seizoen</li>
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
          <Reveal delayMs={80}>
            <article className="rounded-[1.8rem] border border-border bg-brand-beige p-7">
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
          <Reveal delayMs={140}>
            <article className="rounded-[1.8rem] border border-border bg-brand-beige p-7">
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

        <Container
          id="care"
          className="grid grid-auto-rows-fr gap-8 py-24 md:grid-cols-3"
        >
        <Reveal>
          <div className="rounded-[2rem] border border-border bg-brand-beige p-8">
            <h2 className="serif text-4xl font-semibold text-brand-black">
              Materials
            </h2>
            <p className="mt-5 leading-7 text-brand-black/70">
              Gemaakt van verfijnde stoffen zoals linnen, jacquard, katoen,
              velours en polyester. Sommige stoffen dragen het Oeko-Tex label.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="rounded-[2rem] border border-border bg-brand-beige p-8">
            <h2 className="serif text-4xl font-semibold text-brand-black">Use</h2>
            <p className="mt-5 leading-7 text-brand-black/70">
              Flexibel op te hangen met katoenen uiteinden en makkelijk opnieuw
              te stylen, binnen of buiten, voor kleine en grote momenten.
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={140}>
          <div className="rounded-[2rem] border border-border bg-brand-beige p-8">
            <h2 className="serif text-4xl font-semibold text-brand-black">
              Washing care
            </h2>
            <p className="mt-5 leading-7 text-brand-black/70">
              De vlaggenlijnen kun je wassen op 30 graden. Exacte samenstelling
              en verzorging staan bij de productdetails.
            </p>
          </div>
        </Reveal>
      </Container>

      <footer className="px-6 pb-10">
        <Container className="flex flex-col gap-8 border-t border-border px-0 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="serif text-3xl font-semibold text-brand-black">Poppy Joy</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-brand-black/65">
            {footerLinks.map((link) => (
              <a className="transition hover:text-brand-purple" href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        </Container>
      </footer>
    </main>
  );
}