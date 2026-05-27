import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { shippingReturnsPageContent } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Verzenden & retourneren",
  pageDescriptions.shipping
);

export default function ShippingReturnsPage() {
  return <ContentPageTemplate {...shippingReturnsPageContent} />;
}
