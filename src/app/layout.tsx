import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { JsonLd } from "@/components/poppy/json-ld";
import { PageMotion } from "@/components/poppy/page-motion";
import { SiteFooter } from "@/components/poppy/site-footer";
import { SiteHeader } from "@/components/poppy/site-header";
import { rootMetadata } from "@/lib/site-metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      className={cn("font-sans", sans.variable, serif.variable)}
    >
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader />
        <PageMotion>{children}</PageMotion>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
