import type { Metadata } from "next";

import { FaqPageContent } from "@/components/poppy";
import { faqItems } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Veelgestelde vragen",
  pageDescriptions.faq
);

function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <FaqPageContent items={faqItems} />
    </>
  );
}
