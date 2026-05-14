import type { InformationalPageTemplateProps } from "@/components/poppy/informational-page-template";

export const storyPageContent: InformationalPageTemplateProps = {
  eyebrow: "Ons verhaal",
  title: "Van wegwerpfrustratie naar een blijvend alternatief.",
  intro:
    "Poppy Joy begon vanuit een frustratie: waarom zouden mooie feestmomenten eindigen met plastic decoratie die na een dag wordt weggegooid?",
  highlights: ["Herbruikbaar", "Kleine oplages", "Tijdloos ontwerp", "Amsterdam"],
  heroBackgroundImage:
    "https://cdn.shopify.com/s/files/1/0971/3359/2909/files/hero-bg.png?v=1778763881",
  sections: [
    {
      title: "Waarom we begonnen",
      paragraphs: [
        "Het merk ontstond vanuit een duidelijke overtuiging: mooie momenten hoeven geen onnodig afval achter te laten. Plastic vlaggen zijn nog vaak de standaard bij feestjes, maar verdwijnen meestal na een dag in de prullenbak.",
        "Poppy Joy biedt een zachter en blijvend alternatief met stoffen vlaggenlijnen die je telkens opnieuw gebruikt voor verjaardagen, diners, tuinfeestjes en andere mijlpalen.",
      ],
    },
    {
      title: "Wat we willen bouwen",
      paragraphs: [
        "Elk ontwerp is bedoeld om warm, ambachtelijk en tijdloos aan te voelen, zodat decoratie onderdeel wordt van je herinneringen in plaats van tijdelijke rommel.",
        "Door stukken te maken die je wilt bewaren, hergebruiken en doorgeven, verbindt het merk vieren met zorg voor materialen en de planeet.",
      ],
    },
  ],
  milestonesTitle: "Tijdlijn",
  milestones: [
    {
      label: "Twee jaar geleden",
      title: "Het idee",
      description:
        "Het eerste concept begon met een simpele vraag: wat als feestdecoratie echt herbruikbaar kan zijn?",
    },
    {
      label: "2025",
      title: "Uitwerking",
      description:
        "Het idee groeide uit tot een design-first merk, met focus op stofkwaliteit, afwerking en langdurig gebruik.",
    },
    {
      label: "2025 - begin 2026",
      title: "Ontwikkeling & testen",
      description:
        "In deze fase is het product verder ontwikkeld, zijn materialen verfijnd en zijn meerdere productiepartners getest om de juiste kwaliteit en afwerking te vinden.",
    },
    {
      label: "Lente 2026",
      title: "Lancering in Amsterdam",
      description:
        "Poppy Joy lanceerde officieel in Amsterdam met de eerste collectie herbruikbare stoffen vlaggenlijnen.",
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
