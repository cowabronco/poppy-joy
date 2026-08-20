import type { Metadata } from "next";

export const SITE_URL = "https://poppyjoy.nl";

const titleTemplate = "%s | Poppy Joy";
const defaultTitle = "Poppy Joy | Herbruikbare stoffen vlaggenlijnen";

const defaultDescription =
  "Handgemaakte herbruikbare stoffen vlaggenlijnen uit Amsterdam. Dubbelzijdig afgewerkt en gemaakt om feest na feest opnieuw op te hangen.";

export const defaultSocialImage = {
  url: "/brand/featured-image.jpg",
  width: 1200,
  height: 630,
  alt: "Poppy Joy featured image",
} as const;

type SocialImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

function toMetaDescription(text: string, max = 160) {
  const compact = text.replace(/\s+/g, " ").trim();

  if (compact.length <= max) {
    return compact;
  }

  const sliced = compact.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");

  return `${sliced.slice(0, lastSpace > 80 ? lastSpace : max - 1).trimEnd()}…`;
}

function socialMetadata(images: SocialImage[] = [defaultSocialImage]) {
  return {
    openGraph: {
      images,
    },
    twitter: {
      card: "summary_large_image" as const,
      images: images.map((image) => image.url),
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "986x986", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "Poppy Joy",
    title: defaultTitle,
    description: defaultDescription,
    ...socialMetadata().openGraph,
  },
  twitter: {
    title: defaultTitle,
    description: defaultDescription,
    ...socialMetadata().twitter,
  },
};

export function pageMetadata(
  title: string,
  description: string,
  options?: {
    absolute?: boolean;
    images?: SocialImage[];
    path?: string;
    robots?: Metadata["robots"];
  }
): Metadata {
  const resolvedTitle = options?.absolute ? title : `${title} | Poppy Joy`;
  const social = socialMetadata(options?.images);
  const metaDescription = toMetaDescription(description);
  const canonicalPath = options?.path;

  return {
    title: options?.absolute ? { absolute: title } : title,
    description: metaDescription,
    ...(canonicalPath
      ? {
          alternates: { canonical: canonicalPath },
        }
      : {}),
    ...(options?.robots ? { robots: options.robots } : {}),
    openGraph: {
      title: resolvedTitle,
      description: metaDescription,
      ...(canonicalPath ? { url: canonicalPath } : {}),
      ...social.openGraph,
    },
    twitter: {
      title: resolvedTitle,
      description: metaDescription,
      ...social.twitter,
    },
  };
}

export const pageTitles = {
  home: "Poppy Joy | Herbruikbare stoffen vlaggenlijnen",
  shop: "Stoffen vlaggenlijnen",
  story: "Ons verhaal",
  faq: "Veelgestelde vragen",
  contact: "Contact",
  shipping: "Verzenden & retourneren",
  privacy: "Privacybeleid",
  terms: "Algemene voorwaarden",
  cart: "Winkelwagen",
} as const;

export const pageDescriptions = {
  home: "Handgemaakte herbruikbare stoffen vlaggenlijnen uit Amsterdam. Dubbelzijdig afgewerkt en gemaakt om feest na feest opnieuw op te hangen.",
  shop: "Shop de Celebrate Joy collectie: handgemaakte stoffen vlaggenlijnen van linnen, jacquard en velours. Dubbelzijdig afgewerkt om steeds opnieuw te gebruiken.",
  story:
    "Het verhaal van Poppy Joy: stoffen vlaggenlijnen uit Amsterdam, ontstaan uit liefde voor textiel en momenten die mogen blijven.",
  contact:
    "Vragen over een vlaggenlijn of bestelling? Mail shop@poppyjoy.nl of stuur een bericht via Instagram.",
  faq: "Antwoorden over herbruikbare stoffen vlaggenlijnen, materialen, wassen, verzending binnen 5 werkdagen en retourneren.",
  shipping:
    "Verzending binnen 5 werkdagen en retourneren binnen 14 dagen. Zo gaat Poppy Joy om met verzenden, retourneren en de verzorging van stoffen vlaggenlijnen.",
  privacy:
    "Lees hoe Poppy Joy omgaat met persoonsgegevens, cookies en jouw privacyrechten.",
  terms:
    "De algemene voorwaarden van Poppy Joy voor bestellingen, verzending, retourneren en productgebruik.",
  cart: "Bekijk je winkelwagen en ga verder naar Shopify checkout wanneer je klaar bent om af te rekenen.",
} as const;
