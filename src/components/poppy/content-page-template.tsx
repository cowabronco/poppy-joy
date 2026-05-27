import Link from "next/link";

import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/site-contact";

import { Container } from "./container";

export type ContentPageSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  paragraphsAfterBullets?: string[];
  emailContact?: string;
  showEmail?: boolean;
};

export type ContentPageTemplateProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
  sections: ContentPageSection[];
  className?: string;
};

function EmailLink({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className={cn(
        "text-brand-purple underline underline-offset-4 transition hover:text-brand-purple/80",
        className,
      )}
    >
      {CONTACT_EMAIL}
    </a>
  );
}

export function ContentPageTemplate({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  className,
}: ContentPageTemplateProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-brand-off-white pb-20 pt-20 text-brand-black md:pt-24",
        className,
      )}
    >
      <Container className="max-w-3xl">
        <header>
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.34em] text-brand-purple">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="serif mt-5 text-5xl font-semibold leading-none md:text-6xl">
            {title}
          </h1>
          {lastUpdated ? (
            <p className="mt-4 text-sm text-brand-black/55">
              Laatst bijgewerkt: {lastUpdated}
            </p>
          ) : null}
          {intro ? (
            <p className="mt-6 text-base leading-7 text-brand-black/75">
              {intro}
            </p>
          ) : null}
        </header>

        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="serif text-3xl font-semibold text-brand-black md:text-4xl">
                {section.title}
              </h2>

              {section.paragraphs?.length ? (
                <div className="mt-5 space-y-4 text-base leading-7 text-brand-black/75">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {section.bullets?.length ? (
                <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-7 text-brand-black/75">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {section.emailContact ? (
                <p className="mt-5 text-base leading-7 text-brand-black/75">
                  {section.emailContact}{" "}
                  <EmailLink />
                </p>
              ) : null}

              {section.showEmail ? (
                <p className="mt-5 text-base leading-7 text-brand-black/75">
                  <EmailLink />
                </p>
              ) : null}

              {section.paragraphsAfterBullets?.length ? (
                <div className="mt-5 space-y-4 text-base leading-7 text-brand-black/75">
                  {section.paragraphsAfterBullets.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-border pt-8 text-sm text-brand-black/55">
          Vragen?{" "}
          <Link
            href="/contact"
            className="text-brand-purple underline underline-offset-4 transition hover:text-brand-purple/80"
          >
            Neem contact op
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
