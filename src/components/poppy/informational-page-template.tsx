import Link from "next/link";
import { HeartHandshake, Leaf, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { Container } from "./container";
import { EditorialHeading } from "./editorial-heading";

type InformationalPageSection = {
  title: string;
  paragraphs: string[];
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
  eyebrow: string;
  title: string;
  intro: string;
  highlights?: string[];
  heroBackgroundImage?: string;
  sections: InformationalPageSection[];
  milestones?: InformationalPageMilestone[];
  milestonesTitle?: string;
  cta?: InformationalPageCta;
  className?: string;
};

export function InformationalPageTemplate({
  eyebrow,
  title,
  intro,
  highlights = [],
  heroBackgroundImage,
  sections,
  milestones = [],
  milestonesTitle = "Timeline",
  cta,
  className,
}: InformationalPageTemplateProps) {
  const supportingPointIcons = {
    sparkles: Sparkles,
    leaf: Leaf,
    heart: HeartHandshake,
  } as const;

  return (
    <main
      className={cn(
        "min-h-screen bg-brand-off-white text-brand-black",
        className
      )}
    >
      <section
        className={cn(
          "relative isolate overflow-hidden pt-20 md:pt-24",
          heroBackgroundImage ? "" : "",
        )}
      >
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
          {heroBackgroundImage ? (
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.32em] text-brand-off-white/80">
                {eyebrow}
              </p>
              <h1 className="serif mt-5 max-w-2xl text-5xl font-semibold leading-[0.95] text-brand-off-white md:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/85">
                {intro}
              </p>
            </div>
          ) : (
            <EditorialHeading
              eyebrow={eyebrow}
              title={title}
              description={intro}
              className="max-w-4xl"
            />
          )}

          {highlights.length > 0 ? (
            <ul
              className={cn(
                "flex flex-wrap gap-3",
                heroBackgroundImage ? "mt-6" : "mt-10",
              )}
            >
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className={cn(
                    "rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em]",
                    heroBackgroundImage
                      ? "border border-white/30 bg-black/22 text-brand-off-white/90"
                      : "border border-border bg-brand-beige text-brand-black/70",
                  )}
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      <section className="border-y border-border bg-card">
        <Container className="grid gap-6 py-14 lg:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] border border-border bg-brand-off-white/90 p-7 md:p-9"
            >
              <h2 className="serif text-3xl font-semibold text-brand-black md:text-4xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-brand-black/75">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
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

      {cta ? (
        <section className="pb-20">
          <Container>
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/20 p-7 shadow-[0_18px_48px_-28px_rgba(36,32,32,0.7)] md:p-9">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://cdn.shopify.com/s/files/1/0971/3359/2909/files/conversion-container-bg.png?v=1778763671')",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-brand-black/52"
              />

              <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
                <div className="flex flex-col">
                  <div className="max-w-xl">
                    {cta.eyebrow ? (
                      <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-brand-off-white/90">
                        {cta.eyebrow}
                      </p>
                    ) : null}
                    <h2 className="serif mt-3 max-w-lg text-4xl leading-tight text-brand-off-white md:text-5xl">
                      {cta.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-brand-off-white/85">
                      {cta.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col items-start gap-3">
                    <Link
                      href={cta.primaryAction.href}
                      className="inline-flex rounded-full bg-brand-purple px-6 py-3 text-xs uppercase tracking-[0.22em] text-brand-off-white transition hover:bg-brand-purple/90"
                    >
                      {cta.primaryAction.label}
                    </Link>
                    {cta.secondaryAction ? (
                      <Link
                        href={cta.secondaryAction.href}
                      className="inline-flex rounded-full border border-white/35 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-brand-off-white transition hover:bg-white/20"
                      >
                        {cta.secondaryAction.label}
                      </Link>
                    ) : null}
                  </div>
                </div>

                {cta.supportingPoints?.length ? (
                  <ul className="grid content-center gap-3 lg:max-w-sm lg:justify-self-end">
                    {cta.supportingPoints.map((point) => {
                      const Icon = supportingPointIcons[point.icon ?? "sparkles"];

                      return (
                        <li
                          key={point.label}
                          className="rounded-2xl border border-white/25 bg-black/18 px-4 py-4 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/14 text-brand-off-white">
                              <Icon size={16} />
                            </span>
                            <p className="text-xs uppercase tracking-[0.18em] text-brand-off-white/90">
                              {point.label}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
