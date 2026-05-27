import { Mail } from "lucide-react";

import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/site-contact";

import { Container } from "./container";

export function ContactPageContent() {
  return (
    <main className="min-h-screen bg-brand-off-white pb-20 pt-20 text-brand-black md:pt-24">
      <Container className="max-w-3xl">
        <header>
          <p className="text-xs uppercase tracking-[0.34em] text-brand-purple">
            Service
          </p>
          <h1 className="serif mt-5 text-5xl font-semibold leading-none md:text-6xl">
            Contact
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-brand-black/75">
            Heb je een vraag over een bestelling, de vlaggenlijnen of iets
            anders? Stuur gerust een berichtje — we helpen je graag.
          </p>
        </header>

        <div className="mt-14 space-y-6">
          <section className="rounded-[1.75rem] border border-border bg-brand-beige p-7 md:p-9">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle
                    cx="17.3"
                    cy="6.7"
                    r="0.9"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </span>
              <h2 className="text-xs uppercase tracking-[0.24em] text-brand-black/55">
                Instagram
              </h2>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="serif mt-3 inline-block text-3xl text-brand-black transition hover:text-brand-purple md:text-4xl"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </section>

          <section className="rounded-[1.75rem] border border-border bg-brand-beige p-7 md:p-9">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 text-brand-purple">
                <Mail size={18} aria-hidden />
              </span>
              <h2 className="text-xs uppercase tracking-[0.24em] text-brand-black/55">
                E-mail
              </h2>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="serif mt-3 inline-block text-3xl text-brand-black transition hover:text-brand-purple md:text-4xl"
            >
              {CONTACT_EMAIL}
            </a>
          </section>
        </div>

        <p className="mt-10 text-base leading-7 text-brand-black/75">
          Wij proberen berichten zo snel mogelijk te beantwoorden.
        </p>
      </Container>
    </main>
  );
}
