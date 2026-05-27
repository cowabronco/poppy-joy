import type { Metadata } from "next";

import { ContactPageContent } from "@/components/poppy";

export const metadata: Metadata = {
  title: "Contact | Poppy Joy",
  description:
    "Neem contact op met Poppy Joy via e-mail of Instagram voor vragen over bestellingen en vlaggenlijnen.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
