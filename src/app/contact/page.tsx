import type { Metadata } from "next";

import { ContactPageContent } from "@/components/poppy";
import { JsonLd } from "@/components/poppy/json-ld";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";
import { contactPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(
  pageTitles.contact,
  pageDescriptions.contact,
  { path: "/contact" }
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <ContactPageContent />
    </>
  );
}
