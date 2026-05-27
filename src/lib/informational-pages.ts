import type { InformationalPageTemplateProps } from "@/components/poppy/informational-page-template";

export const storyPageContent: InformationalPageTemplateProps = {
  eyebrow: "Ons verhaal",
  title: "For moments that deserve joy. Designed to stay. Made with love.",
  intro:
    "Poppy Joy begon vanuit een frustratie: waarom zouden mooie feestmomenten eindigen met plastic decoratie die na een dag wordt weggegooid?",
  highlights: ["Herbruikbaar", "Small batches", "Tijdloos ontwerp", "Amsterdam"],
  heroBackgroundImage:
    "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/hero-bg.png?v=1778763881",
  sections: [
    {
      title: "Het begin van iets moois",
      paragraphs: [
        "Poppy Joy is ontstaan in de zomer 2025, in Amsterdam.",
        "Geboren uit liefde voor stoffen en het vieren van mooie momenten.",
        "Omdat vieren vaker mag.",
        "En wat mooi is, mag blijven.",
        "Voor vieringen, groot of klein.",
        "Ontworpen om jarenlang mee te gaan.",
        "Tijdloze vlaggenlijnen van verfijnde stoffen, om herinneringen te bewaren en verhalen te laten groeien.",
      ],
    },
    {
      title: "Atelier Note",
      variant: "italic",
      paragraphs: [
        "Poppy Joy begon vanuit een gemis. Waarom worden de mooiste momenten zo vaak versierd met iets tijdelijks?",
        "Ik verlangde naar decoratie die niet alleen feestelijk voelt, maar ook warmte met zich meebrengt. Iets dat je met liefde bewaart en er steeds opnieuw bij pakt. Geen wegwerpmoment, maar een blijvend onderdeel van herinneringen. Juist in kleine en grote momenten.",
        "Daarom maakt Poppy Joy tijdloze vlaggenlijnen van verfijnde stoffen: zacht, stijlvol en gemaakt om jarenlang mee te vieren.",
        "En hopelijk onderdeel te worden van heel veel mooie herinneringen, omdat vieren vaker mag.",
      ],
      signature: "With love, Chloé",
    },
  ],
  cta: {
    eyebrow: "Vier bewust",
    title: "Klaar om jouw moment opnieuw en opnieuw te vieren?",
    description:
      "Ontdek de eerste collectie stoffen vlaggenlijnen en kies een ontwerp dat je jarenlang blijft gebruiken.",
    primaryAction: {
      label: "Shop de collectie",
      href: "/shop",
    },
    supportingPoints: [
      {
        label: "Herbruikbaar ontwerp",
        icon: "leaf",
      },
      {
        label: "Ambachtelijke afwerking",
        icon: "heart",
      },
      {
        label: "Gemaakt voor blijvende momenten",
        icon: "sparkles",
      },
    ],
  },
};
