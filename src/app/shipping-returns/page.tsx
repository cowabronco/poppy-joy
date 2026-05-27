import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { shippingReturnsPageContent } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "Verzenden & retourneren | Poppy Joy",
  description:
    "Informatie over verzending binnen 5 werkdagen, retourneren binnen 14 dagen en verzorging van onze stoffen vlaggenlijnen.",
};

export default function ShippingReturnsPage() {
  return <ContentPageTemplate {...shippingReturnsPageContent} />;
}
