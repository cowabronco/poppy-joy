import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Container } from "./container";
import { DrawnHeart } from "./drawn-heart";
type InformationalPageSection = {
  title: string;
  paragraphs: string[];
  variant?: "default" | "italic";
  signature?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

type InformationalPageMilestone = {
  label: string;
  title: string;
  description: string;
};

type InformationalPageCta = {
  eyebrow?: string;
  title: string;
  description: string;
  variant?: "image" | "solid" | "outline";
  backgroundImage?: string;
  backgroundColor?: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  supportingPoints?: {
    label: string;
    icon?: "sparkles" | "leaf" | "heart";
  }[];
};

export type InformationalPageTemplateProps = {
  title: string;
  heroBackgroundImage?: string;
  sections: InformationalPageSection[];
  milestones?: InformationalPageMilestone[];
  milestonesTitle?: string;
  cta?: InformationalPageCta;
  className?: string;
};

export function InformationalPageTemplate({
  title,
  heroBackgroundImage,
  sections,
  milestones = [],
  milestonesTitle = "Timeline",
  cta,
  className,
}: InformationalPageTemplateProps) {
  const hasImageSection = sections.some((section) => section.image);
  const ctaVariant = cta?.variant ?? (cta?.backgroundColor ? "solid" : "image");
  const isLightCta = ctaVariant === "solid" || ctaVariant === "outline";

  const ctaBlock = cta ? (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.2rem] p-7 md:p-9",
        ctaVariant === "outline" && "border border-border bg-transparent",
        ctaVariant === "solid" && "border border-border",
        ctaVariant === "image" &&
          "border border-white/20 shadow-[0_18px_48px_-28px_rgba(36,32,32,0.7)]",
      )}
      style={
        ctaVariant === "solid" && cta.backgroundColor
          ? { backgroundColor: cta.backgroundColor }
          : undefined
      }
    >
      {ctaVariant === "image" ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${cta.backgroundImage ?? "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/conversion-container-bg.png?v=1778763671"}')`,
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-brand-black/52" />
        </>
      ) : null}

      <div className="relative max-w-xl">
        <h2
          className={cn(
            "serif whitespace-pre-line text-4xl leading-tight md:text-5xl",
            isLightCta ? "text-brand-black" : "text-brand-off-white",
          )}
        >
          {cta.title}
        </h2>
        {cta.description ? (
          <p
            className={cn(
              "mt-4 text-base leading-7",
              isLightCta ? "text-brand-black/75" : "text-brand-off-white/85",
            )}
          >
            {cta.description}
          </p>
        ) : null}
        <div className="mt-6">
          <Link
            href={cta.primaryAction.href}
            className="inline-flex rounded-full bg-brand-purple px-6 py-3 text-xs uppercase tracking-[0.22em] text-brand-off-white transition hover:bg-brand-purple/90"
          >
            {cta.primaryAction.label}
          </Link>
          {cta.secondaryAction ? (
            <Link
              href={cta.secondaryAction.href}
              className={cn(
                "ml-3 inline-flex rounded-full px-6 py-3 text-xs uppercase tracking-[0.22em] transition",
                isLightCta
                  ? "border border-brand-black/15 bg-brand-off-white/60 text-brand-black hover:bg-brand-off-white"
                  : "border border-white/35 bg-white/10 text-brand-off-white hover:bg-white/20",
              )}
            >
              {cta.secondaryAction.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <main
      className={cn(
        "min-h-screen bg-brand-off-white text-brand-black",
        className
      )}
    >
      <section className="relative isolate overflow-hidden pt-20 md:pt-24">
        {heroBackgroundImage ? (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
            />
            <div aria-hidden className="absolute inset-0 bg-brand-black/56" />
          </>
        ) : null}

        <Container
          className={cn(
            "relative",
            heroBackgroundImage ? "py-16 md:py-20" : "py-20 md:py-28",
          )}
        >
          <h1
            className={cn(
              "serif max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl",
              heroBackgroundImage
                ? "max-w-2xl text-brand-off-white"
                : "text-brand-black",
            )}
          >
            {title}
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-card">
        <Container className="py-14">
          <div className="grid gap-6 lg:grid-cols-2">
            {sections.map((section) =>
            section.image ? (
              <div
                key={section.title}
                className="grid gap-6 lg:col-span-2 lg:grid-cols-2 lg:items-stretch"
              >
                <div className="relative order-2 overflow-hidden rounded-[1.25rem] max-lg:aspect-[2/3] lg:order-1 lg:min-h-full">
                  <Image
                    src={section.image}
                    alt={
                      section.imageAlt ??
                      "Sfeerbeeld bij het verhaal van Poppy Joy"
                    }
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="order-1 flex flex-col gap-6 lg:order-2">
                  <article className="rounded-[1.75rem] border border-border bg-brand-off-white/90 p-7 md:p-9">
                    <h2 className="serif text-3xl font-semibold text-brand-black md:text-4xl">
                      {section.title}
                    </h2>
                    <div
                      className={cn(
                        "mt-5 space-y-4 text-base leading-7 text-brand-black/75",
                        section.variant === "italic" &&
                          "serif text-lg italic leading-[1.65] text-brand-black/85 md:text-[1.2rem] md:leading-[1.7]",
                      )}
                    >
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.signature ? (
                        <p className="flex items-center gap-2 pt-2">
                          <span>{section.signature}</span>
                          <DrawnHeart
                            animated
                            className="h-[1.1em] w-[1.1em] translate-y-px text-brand-purple/75"
                          />
                        </p>
                      ) : null}
                    </div>
                  </article>
                  {ctaBlock}
                </div>
              </div>
            ) : (
              <article
                key={section.title}
                className="rounded-[1.75rem] border border-border bg-brand-off-white/90 p-7 md:p-9"
              >
                <h2 className="serif text-3xl font-semibold text-brand-black md:text-4xl">
                  {section.title}
                </h2>
                <div
                  className={cn(
                    "mt-5 space-y-4 text-base leading-7 text-brand-black/75",
                    section.variant === "italic" &&
                      "serif text-lg italic leading-[1.65] text-brand-black/85 md:text-[1.2rem] md:leading-[1.7]",
                  )}
                >
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.signature ? (
                    <p className="flex items-center gap-2 pt-2">
                      <span>{section.signature}</span>
                      <DrawnHeart
                        animated
                        className="h-[1.1em] w-[1.1em] translate-y-px text-brand-purple/75"
                      />
                    </p>
                  ) : null}
                </div>
              </article>
            )
          )}
          </div>

          {!hasImageSection ? ctaBlock : null}
        </Container>
      </section>

      {milestones.length > 0 ? (
        <section>
          <Container className="py-16">
            <h2 className="serif text-4xl font-semibold text-brand-black md:text-5xl">
              {milestonesTitle}
            </h2>
            <div className="mt-10">
              <div className="-mx-6 overflow-x-auto px-6 md:hidden">
                <ol className="relative flex min-w-max gap-6 pb-2 pt-10">
                  <span
                    aria-hidden
                    className="absolute left-6 right-6 top-2 h-px bg-border"
                  />
                  {milestones.map((milestone) => (
                    <li key={milestone.label} className="relative w-[17rem] shrink-0">
                      <span
                        aria-hidden
                        className="absolute left-6 top-2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/20 bg-brand-purple ring-4 ring-brand-off-white"
                      />
                      <article className="rounded-[1.6rem] border border-border bg-brand-beige p-6">
                        <p className="text-xs uppercase tracking-[0.22em] text-brand-purple">
                          {milestone.label}
                        </p>
                        <p className="serif mt-3 text-3xl leading-tight text-brand-black">
                          {milestone.title}
                        </p>
                        <p className="mt-4 text-sm leading-6 text-brand-black/70">
                          {milestone.description}
                        </p>
                      </article>
                    </li>
                  ))}
                </ol>
              </div>

              <ol className="relative hidden md:flex md:flex-col md:gap-6">
                <span
                  aria-hidden
                  className="absolute bottom-0 left-4 top-0 w-px bg-border"
                />
                {milestones.map((milestone) => (
                  <li key={milestone.label} className="relative pl-12">
                    <span
                      aria-hidden
                      className="absolute left-4 top-8 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/20 bg-brand-purple ring-4 ring-brand-off-white"
                    />
                    <article className="rounded-[1.6rem] border border-border bg-brand-beige p-6">
                      <p className="text-xs uppercase tracking-[0.22em] text-brand-purple">
                        {milestone.label}
                      </p>
                      <p className="serif mt-3 text-3xl leading-tight text-brand-black">
                        {milestone.title}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-brand-black/70">
                        {milestone.description}
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
