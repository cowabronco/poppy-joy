"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/content-pages";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/site-contact";

import { Container } from "./container";

type FaqPageContentProps = {
  items: FaqItem[];
};

function FaqAnswer({ answer }: { answer: string }) {
  if (answer.includes("e-mail")) {
    return (
      <p>
        Je kunt ons bereiken via{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-brand-purple underline underline-offset-4 transition hover:text-brand-purple/80"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        of via{" "}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-brand-purple underline underline-offset-4 transition hover:text-brand-purple/80"
        >
          Instagram
        </a>
        .
      </p>
    );
  }

  return <p>{answer}</p>;
}

export function FaqPageContent({ items }: FaqPageContentProps) {
  return (
    <main className="min-h-screen bg-brand-off-white pb-20 pt-20 text-brand-black md:pt-24">
      <Container className="max-w-3xl">
        <header>
          <p className="text-xs uppercase tracking-[0.34em] text-brand-purple">
            Service
          </p>
          <h1 className="serif mt-5 text-5xl font-semibold leading-none md:text-6xl">
            Veelgestelde vragen
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-brand-black/75">
            Antwoorden op de meest gestelde vragen over onze vlaggenlijnen,
            verzending en verzorging.
          </p>
        </header>

        <Accordion type="single" collapsible className="mt-14 border-t border-border">
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className="border-border"
            >
              <AccordionTrigger className="py-5 text-left text-base leading-7 text-brand-black hover:no-underline md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-7 text-brand-black/75">
                <FaqAnswer answer={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 rounded-[1.75rem] border border-border bg-brand-beige p-7 md:p-9">
          <h2 className="serif text-3xl font-semibold text-brand-black">
            Nog een vraag?
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-black/75">
            Stuur ons gerust een berichtje. We helpen je graag verder.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-brand-purple underline underline-offset-4 transition hover:text-brand-purple/80"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-brand-purple underline underline-offset-4 transition hover:text-brand-purple/80"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <Link
              href="/contact"
              className="mt-2 inline-flex w-fit rounded-full border border-border bg-brand-off-white px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-brand-black/70 transition hover:border-brand-purple hover:text-brand-purple"
            >
              Naar contact
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
