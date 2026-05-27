import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { privacyPageContent } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Privacybeleid",
  pageDescriptions.privacy
);

export default function PrivacyPage() {
  return <ContentPageTemplate {...privacyPageContent} />;
}
