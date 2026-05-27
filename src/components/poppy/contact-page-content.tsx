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
            <h2 className="text-xs uppercase tracking-[0.24em] text-brand-black/55">
              Instagram
            </h2>
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
            <h2 className="text-xs uppercase tracking-[0.24em] text-brand-black/55">
              E-mail
            </h2>
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
