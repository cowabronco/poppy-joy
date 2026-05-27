import type { Metadata } from "next";

import { ContactPageContent } from "@/components/poppy";
import { pageDescriptions, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Contact",
  pageDescriptions.contact
);

export default function ContactPage() {
  return <ContactPageContent />;
}
