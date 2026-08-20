import type { Metadata } from "next";

import { InformationalPageTemplate } from "@/components/poppy";
import { JsonLd } from "@/components/poppy/json-ld";
import { storyPageContent } from "@/lib/informational-pages";
import { pageDescriptions, pageMetadata, pageTitles } from "@/lib/site-metadata";
import { aboutPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pageTitles.story, pageDescriptions.story, {
  path: "/story",
});

export default function StoryPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <InformationalPageTemplate {...storyPageContent} />
    </>
  );
}
