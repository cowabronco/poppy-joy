import type { Metadata } from "next";

import { JsonLd } from "@/components/poppy/json-ld";
import { FaqPageContent } from "@/components/poppy";
import { faqItems } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  pageTitles.faq,
  pageDescriptions.faq,
  { path: "/faq" }
);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <FaqPageContent items={faqItems} />
    </>
  );
}
