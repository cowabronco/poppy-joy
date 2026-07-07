import type { InformationalPageTemplateProps } from "@/components/poppy/informational-page-template";

export const storyPageContent: InformationalPageTemplateProps = {
  sections: [
    {
      title: "Het begin van iets moois",
      image:
        "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/story-support-image.jpg?v=1782844991",
      imageAlt:
        "Interieur met stoffen vlaggenlijn, kaarsen en een zachte bank in warme tinten",
      imageWidth: 2477,
      imageHeight: 3715,
      paragraphs: [
        "Poppy Joy begon vanuit een gemis. Waarom worden de mooiste momenten vaak aangekleed met iets tijdelijks?",
        "Ik verlangde naar decoratie die je niet na één dag opbergt of weg gooit om te vergeten. Maar iets dat je bewaart, steeds opnieuw ophangt en dat met de jaren een vertrouwd onderdeel wordt van bijzondere momenten.",
        "Vanuit die gedachte maak ik vlaggenlijnen van verfijnde stoffen: zacht van uitstraling, zorgvuldig afgewerkt en ontworpen om jaren lang mee te gaan.",
        "Ik hoop dat elke vlaggenlijn niet alleen een ruimte versiert, maar een vaste plek krijgt in de mooie verhalen die zich eronder afspelen.",
        "With love,",
      ],
      signature: "Chloé",
    },
  ],
  cta: {
    title: "Omdat vieren vaker mag.\nEn wat mooi is, mag blijven.",
    description: "",
    variant: "outline",
    primaryAction: {
      label: "Shop de collectie",
      href: "/shop",
    },
  },
};
