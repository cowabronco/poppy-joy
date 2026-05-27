import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { termsPageContent } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | Poppy Joy",
  description:
    "De algemene voorwaarden van Poppy Joy voor bestellingen, verzending, retourneren en productgebruik.",
};

export default function TermsPage() {
  return <ContentPageTemplate {...termsPageContent} />;
}
