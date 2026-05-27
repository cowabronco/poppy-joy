import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { PageMotion } from "@/components/poppy/page-motion";
import { SiteFooter } from "@/components/poppy/site-footer";
import { SiteHeader } from "@/components/poppy/site-header";
import { rootMetadata } from "@/lib/site-metadata";
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
});

export const metadata = rootMetadata;

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
        <SiteHeader />
        <PageMotion>{children}</PageMotion>
        <SiteFooter />
      </body>
    </html>
  );
}
