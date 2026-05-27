import type { ContentPageTemplateProps } from "@/components/poppy/content-page-template";

export type FaqItem = {
  question: string;
  answer: string;
};

export const shippingReturnsPageContent: ContentPageTemplateProps = {
  eyebrow: "Service",
  title: "Verzenden & retourneren",
  sections: [
    {
      title: "Verzending",
      paragraphs: [
        "Wij verpakken iedere bestelling met zorg.",
      ],
      bullets: [
        "Bestellingen worden binnen 5 werkdagen verzonden.",
        "Verzendkosten worden tijdens het afrekenen weergegeven.",
        "Zodra jouw bestelling is verzonden ontvang je een bevestiging.",
      ],
    },
    {
      title: "Retourneren",
      paragraphs: [
        "Niet helemaal tevreden? Je kunt jouw bestelling binnen 14 dagen na ontvangst retourneren.",
        "Voorwaarden voor retourneren:",
      ],
      bullets: [
        "Het product is ongebruikt en in originele staat",
        "Het product is niet gepersonaliseerd of op maat gemaakt",
        "Retourkosten zijn voor eigen rekening",
      ],
      emailContact: "Neem voor een retouraanvraag contact op via:",
      paragraphsAfterBullets: [
        "Na ontvangst van de retourzending storten wij het aankoopbedrag binnen 14 dagen terug.",
      ],
    },
    {
      title: "Belangrijk over onze stoffen",
      paragraphs: [
        "Onze vlaggenlijnen worden gemaakt van verfijnde kwalitatieve stoffen. Door gebruik, wassen, zonlicht en weersinvloeden kunnen stoffen na verloop van tijd licht verkleuren, slijten of iets krimpen. Dit hoort bij de natuurlijke eigenschappen van textiel.",
        "Wij adviseren daarom om de verzorgingsinstructies op de website zorgvuldig op te volgen en langdurige blootstelling aan direct zonlicht of extreme weersomstandigheden te vermijden.",
      ],
    },
  ],
};

export const privacyPageContent: ContentPageTemplateProps = {
  eyebrow: "Juridisch",
  title: "Privacybeleid",
  lastUpdated: "15 mei 2026",
  intro:
    "Bij Poppy Joy vinden we jouw privacy belangrijk. In dit privacybeleid leggen we kort uit welke gegevens wij verzamelen en waarom.",
  sections: [
    {
      title: "Welke gegevens verzamelen wij?",
      paragraphs: [
        "Wanneer je een bestelling plaatst of contact met ons opneemt, kunnen wij de volgende gegevens verwerken:",
      ],
      bullets: [
        "Naam",
        "Adresgegevens",
        "E-mailadres",
        "Telefoonnummer (indien ingevuld)",
        "Betaalgegevens",
        "IP-adres en websitegegevens via cookies",
      ],
    },
    {
      title: "Waarom gebruiken wij deze gegevens?",
      paragraphs: ["Wij gebruiken jouw gegevens om:"],
      bullets: [
        "Bestellingen te verwerken en te verzenden",
        "Contact met je op te nemen over jouw bestelling",
        "Betalingen te verwerken",
        "Onze website te verbeteren",
        "Te voldoen aan wettelijke verplichtingen",
      ],
    },
    {
      title: "Delen van gegevens",
      paragraphs: [
        "Wij delen jouw gegevens alleen met partijen die nodig zijn voor onze dienstverlening, zoals:",
      ],
      bullets: [
        "Betaalproviders",
        "Verzendpartijen",
        "Website- en hostingdiensten",
      ],
      paragraphsAfterBullets: [
        "Wij verkopen jouw gegevens nooit aan derden.",
      ],
    },
    {
      title: "Bewaartermijn",
      paragraphs: [
        "Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor onze administratie en wettelijke verplichtingen.",
      ],
    },
    {
      title: "Jouw rechten",
      paragraphs: ["Je hebt het recht om:"],
      bullets: [
        "Jouw gegevens in te zien",
        "Jouw gegevens te laten aanpassen of verwijderen",
        "Bezwaar te maken tegen het gebruik van jouw gegevens",
      ],
      emailContact: "Hiervoor kun je contact opnemen via:",
    },
    {
      title: "Cookies",
      paragraphs: [
        "Onze website gebruikt alleen functionele en analytische cookies om de website goed te laten werken en te verbeteren.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "Heb je vragen over dit privacybeleid? Neem gerust contact op via:",
      ],
      showEmail: true,
    },
  ],
};

export const termsPageContent: ContentPageTemplateProps = {
  eyebrow: "Juridisch",
  title: "Algemene voorwaarden",
  lastUpdated: "15 mei 2026",
  sections: [
    {
      title: "1. Algemeen",
      paragraphs: [
        "Deze algemene voorwaarden zijn van toepassing op alle bestellingen via de website van Poppy Joy. Door een bestelling te plaatsen ga je akkoord met deze voorwaarden.",
      ],
    },
    {
      title: "2. Producten",
      paragraphs: [
        "Onze vlaggenlijnen worden met zorg en aandacht handgemaakt van verfijnde stoffen. Kleine verschillen in kleur, patroon of afwerking kunnen voorkomen en maken deel uit van het karakter van het product.",
        "Wij doen ons best om de kleuren van onze producten zo natuurgetrouw mogelijk weer te geven op foto's en de website. Kleuren kunnen echter licht afwijken door instellingen van beeldschermen, lichtinval en fotografie.",
      ],
    },
    {
      title: "3. Prijzen en betaling",
      paragraphs: [
        "Alle prijzen zijn vermeld in euro's inclusief btw, tenzij anders aangegeven.",
        "Betaling verloopt via de betaalmethoden die op de website worden aangeboden.",
      ],
    },
    {
      title: "4. Verzending",
      paragraphs: [
        "Wij doen ons best om bestellingen binnen 5 werkdagen te verzenden. Vertragingen geven geen recht op schadevergoeding.",
      ],
    },
    {
      title: "5. Gebruik en verzorging",
      paragraphs: [
        "Onze vlaggenlijnen zijn bedoeld voor normaal gebruik binnenshuis en beperkt gebruik buitenshuis.",
        "Omdat wij werken met verfijnde kwalitatieve stoffen, kunnen langdurige blootstelling aan fel zonlicht, weersinvloeden of wassen leiden tot verkleuring, slijtage of lichte krimp. Dit valt niet onder garantie of aansprakelijkheid.",
        "De was- en verzorgingsinstructies staan duidelijk vermeld op de website. Wij raden aan deze zorgvuldig op te volgen.",
      ],
    },
    {
      title: "6. Aansprakelijkheid",
      paragraphs: ["Poppy Joy is niet aansprakelijk voor:"],
      bullets: [
        "Verkleuring door zonlicht",
        "Krimp of slijtage door wassen",
        "Normale gebruikssporen",
        "Schade ontstaan door onjuist gebruik of het niet opvolgen van verzorgingsinstructies",
      ],
      paragraphsAfterBullets: [
        "De aansprakelijkheid van Poppy Joy blijft altijd beperkt tot het bedrag van de betreffende bestelling.",
      ],
    },
    {
      title: "7. Herroepingsrecht",
      paragraphs: [
        "Je hebt het recht om jouw bestelling binnen 14 dagen na ontvangst te retourneren, mits het product ongebruikt en in originele staat is.",
        "Gepersonaliseerde of op maat gemaakte producten kunnen niet worden geretourneerd.",
      ],
    },
    {
      title: "8. Klachten",
      emailContact: "Heb je een klacht? Neem dan contact op via",
      paragraphsAfterBullets: [
        "Wij proberen klachten zo snel mogelijk op te lossen.",
      ],
    },
    {
      title: "9. Toepasselijk recht",
      paragraphs: [
        "Op deze voorwaarden is Nederlands recht van toepassing.",
      ],
    },
  ],
};

export const faqItems: FaqItem[] = [
  {
    question: "Zijn de vlaggenlijnen herbruikbaar?",
    answer:
      "Ja, onze stoffen vlaggenlijnen zijn bedoeld om jarenlang opnieuw te gebruiken bij feestjes, verjaardagen en bijzondere momenten.",
  },
  {
    question: "Van welk materiaal zijn de vlaggen gemaakt?",
    answer:
      "Onze vlaggenlijnen worden gemaakt van zorgvuldig geselecteerde stoffen van hoge kwaliteit. Hierdoor voelt iedere lijn uniek en verfijnd aan.",
  },
  {
    question: "Kunnen de kleuren afwijken van de foto's?",
    answer:
      "Ja, kleuren kunnen licht verschillen door lichtinval, fotografie en scherminstellingen.",
  },
  {
    question: "Kunnen de vlaggenlijnen buiten hangen?",
    answer:
      "Ja, dat kan voor tijdelijk gebruik. We raden aan de vlaggenlijnen niet langdurig buiten te laten hangen vanwege zonlicht, regen en wind.",
  },
  {
    question: "Kunnen de vlaggen gewassen worden?",
    answer:
      "Ja, maar voorzichtig. Volg altijd de verzorgingsinstructies op de website of bij het product. Door wassen kunnen lichte krimp of natuurlijke slijtage ontstaan.",
  },
  {
    question: "Hoe lang is de levertijd?",
    answer:
      "Bestellingen worden binnen 5 werkdagen verzonden. Verzendkosten en verdere details zie je tijdens het afrekenen.",
  },
  {
    question: "Kan ik mijn bestelling retourneren?",
    answer:
      "Ja, ongebruikte producten mogen binnen 14 dagen worden geretourneerd. Gepersonaliseerde producten kunnen niet worden geretourneerd.",
  },
  {
    question: "Zijn alle vlaggenlijnen exact hetzelfde?",
    answer:
      "Nee. Omdat onze producten handgemaakt zijn en we werken met stoffen, kunnen kleine verschillen voorkomen. Dat maakt iedere vlaggenlijn uniek.",
  },
  {
    question: "Worden de vlaggenlijnen duurzaam verpakt?",
    answer:
      "Ja, we proberen onze bestellingen zo zorgvuldig en duurzaam mogelijk te verpakken.",
  },
  {
    question: "Ik heb een vraag over mijn bestelling, hoe neem ik contact op?",
    answer:
      "Je kunt ons bereiken via e-mail of via Instagram.",
  },
];
