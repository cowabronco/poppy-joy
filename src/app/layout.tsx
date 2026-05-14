import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://poppyjoy.nl"),
  title: "Poppy Joy | Reusable Fabric Bunting",
  description:
    "Handmade reusable fabric bunting for moments that deserve joy. Designed to stay. Made with love.",
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    shortcut: ["/brand/favicon.png"],
    apple: [{ url: "/brand/favicon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Poppy Joy",
    title: "Poppy Joy | Reusable Fabric Bunting",
    description:
      "Handmade reusable fabric bunting for moments that deserve joy. Designed to stay. Made with love.",
    images: [
      {
        url: "/brand/featured-image.jpg",
        width: 1200,
        height: 630,
        alt: "Poppy Joy featured image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poppy Joy | Reusable Fabric Bunting",
    description:
      "Handmade reusable fabric bunting for moments that deserve joy. Designed to stay. Made with love.",
    images: ["/brand/featured-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={cn("font-sans", geist.variable, serif.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
