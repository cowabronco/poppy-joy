import type { Metadata } from "next";

const titleTemplate = "%s | Poppy Joy · Designed to stay";
const defaultTitle = "Poppy Joy | Designed to stay";

const defaultDescription =
  "Handgemaakte herbruikbare stoffen vlaggenlijnen voor momenten die vreugde verdienen. Designed to stay. Made with love.";

export const rootMetadata: Metadata = {
  metadataBase: new URL("https://poppyjoy.nl"),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: defaultDescription,
  icons: {
    icon: [{ url: "/brand/logo.png", type: "image/png" }],
    shortcut: ["/brand/logo.png"],
    apple: [{ url: "/brand/logo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Poppy Joy",
    title: defaultTitle,
    description: defaultDescription,
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
    title: defaultTitle,
    description: defaultDescription,
    images: ["/brand/featured-image.jpg"],
  },
};

export function pageMetadata(
  title: string,
  description: string,
  options?: { absolute?: boolean }
): Metadata {
  return {
    title: options?.absolute
      ? { absolute: title }
      : title,
    description,
    openGraph: {
      title: options?.absolute ? title : `${title} | Poppy Joy · Designed to stay`,
      description,
    },
    twitter: {
      title: options?.absolute ? title : `${title} | Poppy Joy · Designed to stay`,
      description,
    },
  };
}

export const pageDescriptions = {
  home: "Tijdloze stoffen vlaggenlijnen voor vieringen groot en klein, handgemaakt van verfijnde materialen die keer op keer opnieuw gebruikt mogen worden.",
  shop: "Shop de Celebrate Joy collectie: unieke stoffen vlaggenlijnen, dubbelzijdig afgewerkt en gemaakt om steeds opnieuw te gebruiken.",
  story:
    "Lees hoe Poppy Joy in Amsterdam ontstond als een warm, blijvend alternatief voor wegwerp plastic vlaggenlijnen.",
  contact:
    "Neem contact op met Poppy Joy via e-mail of Instagram voor vragen over bestellingen en vlaggenlijnen.",
  faq: "Antwoorden op veelgestelde vragen over herbruikbare stoffen vlaggenlijnen, verzending, verzorging en retourneren.",
  shipping:
    "Informatie over verzending binnen 5 werkdagen, retourneren binnen 14 dagen en het verzorgen van onze stoffen vlaggenlijnen.",
  privacy:
    "Lees hoe Poppy Joy omgaat met persoonsgegevens, cookies en jouw privacyrechten.",
  terms:
    "De algemene voorwaarden van Poppy Joy voor bestellingen, verzending, retourneren en productgebruik.",
} as const;
