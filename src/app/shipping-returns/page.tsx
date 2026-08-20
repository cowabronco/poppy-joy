import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { shippingReturnsPageContent } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  pageTitles.shipping,
  pageDescriptions.shipping,
  { path: "/shipping-returns" }
);

export default function ShippingReturnsPage() {
  return <ContentPageTemplate {...shippingReturnsPageContent} />;
}
