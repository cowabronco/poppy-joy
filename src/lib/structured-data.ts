import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/site-contact";
import { SITE_URL } from "@/lib/site-metadata";
import { isProductAvailableForPurchase } from "@/lib/shopify/availability";
import { getProductSummaryFacts } from "@/lib/shopify/to-product";
import type { StorefrontProduct } from "@/lib/shopify/types";

function merchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "NL",
    returnPolicyCategory:
      "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnShippingFees",
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Poppy Joy",
    url: SITE_URL,
    description:
      "Poppy Joy maakt herbruikbare stoffen vlaggenlijnen in Amsterdam.",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 986,
      height: 986,
    },
    email: CONTACT_EMAIL,
    sameAs: [INSTAGRAM_URL],
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amsterdam",
        addressCountry: "NL",
      },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Poppy Joy",
    url: SITE_URL,
    description:
      "Handgemaakte herbruikbare stoffen vlaggenlijnen uit Amsterdam.",
    inLanguage: "nl-NL",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function productJsonLd(product: StorefrontProduct) {
  const url = `${SITE_URL}/products/${product.handle}`;
  const images = [
    product.featuredImage?.url,
    ...product.images.map((image) => image.url),
  ].filter(
    (imageUrl, index, list): imageUrl is string =>
      Boolean(imageUrl) && list.indexOf(imageUrl) === index
  );
  const offerPrice =
    product.variants.find((variant) => variant.availableForSale)?.price ??
    product.price;
  const { flagCount, productLength } = getProductSummaryFacts(product);
  const additionalProperty = [
    {
      "@type": "PropertyValue",
      name: "Vlaggetjes",
      value: String(flagCount),
    },
    {
      "@type": "PropertyValue",
      name: "Lengte",
      value: `${productLength} cm`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images,
    url,
    sku: product.handle,
    category: "Stoffen vlaggenlijn",
    ...(product.metafields.material
      ? { material: product.metafields.material }
      : {}),
    ...(product.metafields.colorStory
      ? { color: product.metafields.colorStory }
      : {}),
    additionalProperty,
    brand: {
      "@type": "Brand",
      name: "Poppy Joy",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: offerPrice.currencyCode,
      price: offerPrice.amount,
      availability: isProductAvailableForPurchase(product)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: merchantReturnPolicy(),
      seller: {
        "@type": "Organization",
        name: "Poppy Joy",
      },
    },
  };
}

export function productBreadcrumbJsonLd(name: string, handle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${SITE_URL}/products/${handle}`,
      },
    ],
  };
}

export function shopCollectionJsonLd(
  products: Array<Pick<StorefrontProduct, "handle" | "title">>
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Celebrate Joy",
    description:
      "De eerste Poppy Joy collectie: tijdloze stoffen vlaggenlijnen, ontworpen om de mooiste momenten keer op keer te vieren.",
    url: `${SITE_URL}/shop`,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/products/${product.handle}`,
        name: product.title,
      })),
    },
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Ons verhaal",
    url: `${SITE_URL}/story`,
    description:
      "Het verhaal van Poppy Joy: stoffen vlaggenlijnen uit Amsterdam, ontstaan uit liefde voor textiel en momenten die mogen blijven.",
    mainEntity: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
