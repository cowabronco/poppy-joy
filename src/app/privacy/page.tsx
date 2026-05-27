import type { Metadata } from "next";

import { ContentPageTemplate } from "@/components/poppy";
import { privacyPageContent } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "Privacybeleid | Poppy Joy",
  description:
    "Lees hoe Poppy Joy omgaat met persoonsgegevens, cookies en jouw privacyrechten.",
};

export default function PrivacyPage() {
  return <ContentPageTemplate {...privacyPageContent} />;
}
