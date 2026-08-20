import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { privacyPageContent } from "@/lib/content-pages";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  pageTitles.privacy,
  pageDescriptions.privacy,
  { path: "/privacy" }
);

export default function PrivacyPage() {
  return <ContentPageTemplate {...privacyPageContent} />;
}
