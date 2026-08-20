import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { termsPageContent } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  pageTitles.terms,
  pageDescriptions.terms,
  { path: "/terms" }
);

export default function TermsPage() {
  return <ContentPageTemplate {...termsPageContent} />;
}
