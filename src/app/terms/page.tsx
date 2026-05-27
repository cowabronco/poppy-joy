import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { termsPageContent } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Algemene voorwaarden",
  pageDescriptions.terms
);

export default function TermsPage() {
  return <ContentPageTemplate {...termsPageContent} />;
}
