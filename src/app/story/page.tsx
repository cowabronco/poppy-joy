import type { Metadata } from "next";

import { InformationalPageTemplate } from "@/components/poppy";
import { storyPageContent } from "@/lib/informational-pages";

export const metadata: Metadata = {
  title: "Story | Poppy Joy",
  description:
    "Lees hoe Poppy Joy in Amsterdam ontstond als duurzaam alternatief voor wegwerp plastic vlaggenlijnen.",
};

export default function StoryPage() {
  return <InformationalPageTemplate {...storyPageContent} />;
}
