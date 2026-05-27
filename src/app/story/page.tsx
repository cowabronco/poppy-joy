import type { Metadata } from "next";

import { InformationalPageTemplate } from "@/components/poppy";
import { storyPageContent } from "@/lib/informational-pages";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata("Story", pageDescriptions.story);

export default function StoryPage() {
  return <InformationalPageTemplate {...storyPageContent} />;
}
