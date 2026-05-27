import Image from "next/image";
import Link from "next/link";

import { INSTAGRAM_URL } from "@/lib/site-contact";

import { Container } from "./container";

const footerLinkGroups = [
  {
    title: "Ontdek",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Story", href: "/story" },
      { label: "Materialen", href: "/materials" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Wasvoorschriften", href: "/care" },
      { label: "Veelgestelde vragen", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Juridisch",
    links: [
      { label: "Verzending & retourneren", href: "/shipping-returns" },
      { label: "Privacybeleid", href: "/privacy" },
      { label: "Algemene voorwaarden", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-6 pb-10">
      <Container className="border-t border-border px-0 pt-10">
        <div className="grid gap-10 text-xs uppercase tracking-[0.2em] text-brand-black/65 md:grid-cols-3">
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-[11px] tracking-[0.24em] text-brand-black/45">
                {group.title}
              </p>
              <div className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    className="transition hover:text-brand-purple"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-end justify-between">
          <Image
            src="/brand/logo.png"
            alt="Poppy Joy"
            width={110}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand-black/65 transition hover:border-brand-purple hover:text-brand-purple"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
