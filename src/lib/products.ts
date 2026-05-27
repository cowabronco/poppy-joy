export type Product = {
  handle: string;
  name: string;
  price: string;
  subtitle: string;
  description: string;
  details: string;
  materialTags: string[];
  materials: string;
  dimensions: string;
  care: string;
  story: string;
  published: boolean;
};

export const products: Product[] = [
  {
    handle: "zig-zag",
    name: "Zig Zag",
    price: "€49,95",
    subtitle: "Gobelin + limoen groene keperband",
    description:
      "Een levendige zig zag print in warme kleuren, gemaakt van gobelin jacquard met diepte en textuur. De lijn is vastgenaaid aan een soepel geweven limoen groene keperband.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
    materialTags: ["Jacquard"],
    materials: "Gobelin jacquard met een limoen groene keperband.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden, of lager. En laat aan de lucht drogen.",
    story:
      "Zig Zag brengt warmte en beweging in een kamer zonder te overheersen. Mooi boven een gedekte tafel, langs een kast of in de tuin op een lange zomeravond.",
    published: true,
  },
  {
    handle: "double-joy",
    name: "Double Joy",
    price: "€49,95",
    subtitle: "Linnen + ecru keperband",
    description:
      "Een linnen vlaggenlijn met pistachegroene en paarse vlaggetjes die elkaar afwisselen, afgewerkt met een soepel geweven ecru keperband.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 75% linnen en 25% katoen. Oeko-Tex Standard 100 Product class 2.",
    materialTags: ["Linnen"],
    materials: "Linnen vlaggetjes met een ecru keperband.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden, of lager. En laat aan de lucht drogen.",
    story:
      "Double Joy voelt luchtig, zacht en uitgesproken tegelijk. Het linnen geeft de vlaggenlijn een natuurlijke rust die mooi blijft tussen feestmomenten door.",
    published: true,
  },
  {
    handle: "poppy-dots",
    name: "Poppy Dots",
    price: "€49,95",
    subtitle: "Velours stippen + mosgroene keperband",
    description:
      "Een zachte velours stof met speelse zwart-witte dalmatiër stippenprint. Minimalistisch, maar met een twist en afgewerkt met een mosgroene keperband.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 100% polyester.",
    materialTags: ["Velours"],
    materials: "Velours stippen met een mosgroene keperband.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden, of lager. En laat aan de lucht drogen.",
    story:
      "Poppy Dots is speels op een ingetogen manier. De velours textuur vangt licht subtiel op en maakt van een kleine viering meteen iets bijzonders.",
    published: true,
  },
  {
    handle: "wavy-joy",
    name: "Wavy Joy",
    price: "€49,95",
    subtitle: "Gobelin + turquoise keperband",
    description:
      "Een gobelin jacquard met een zachte flow van aardse tinten. De golvende organische print brengt rust en karakter, afgewerkt met een turquoise keperband.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
    materialTags: ["Jacquard"],
    materials: "Gobelin jacquard met een turquoise keperband.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden, of lager. En laat aan de lucht drogen.",
    story:
      "Wavy Joy is gemaakt voor mensen die kleur willen, maar met zachtheid.",
    published: true,
  },
  {
    handle: "cobalt-blue",
    name: "Cobalt Blue",
    price: "€49,95",
    subtitle: "Velours golf + ecru keperband",
    description:
      "Een zachte velours vlaggenlijn met golfprint, dubbelzijdig gestikt en vastgenaaid aan een soepel geweven ecru keperband.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
    materialTags: ["Velours"],
    materials: "Velours golf met een ecru keperband.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden, of lager. En laat aan de lucht drogen.",
    story:
      "Cobalt Blue heeft een rustige statementkwaliteit. Het cobalt geeft diepte, terwijl de zachte stof het geheel warm en tastbaar houdt.",
    published: false,
  },
];

export const publishedProducts = products.filter((product) => product.published);

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getPublishedProductByHandle(handle: string) {
  return publishedProducts.find((product) => product.handle === handle);
}

export function formatProductDescription(text: string) {
  const trimmed = text.trim();

  if (!trimmed) {
    return trimmed;
  }

  const withSentenceSpacing = trimmed.replace(/\.([^\s.])/g, ". $1");

  return withSentenceSpacing.endsWith(".")
    ? withSentenceSpacing
    : `${withSentenceSpacing}.`;
}

export const values = [
  "Herbruikbare decoratie",
  "Dubbelzijdig en hoogwaardig afgewerkt",
  "Design-first benadering",
  "Voor kleine en grote momenten",
  "Handgemaakt in small batches",
  "Kwalitatief verfijnde stoffen",
];
