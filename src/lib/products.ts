export type Product = {
  handle: string;
  name: string;
  price: string;
  palette: string;
  description: string;
  details: string;
  materials: string;
  dimensions: string;
  care: string;
  story: string;
};

export const products: Product[] = [
  {
    handle: "zig-zag",
    name: "Zig Zag",
    price: "€49,95",
    palette: "Warm jacquard",
    description:
      "Een levendige zig zag print in warme kleuren, gemaakt van gobelin jacquard met diepte en textuur. De lijn is vastgenaaid aan een soepel geweven katoenen pistachegroene band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
    materials: "Gobelin jacquard met een pistachegroene katoenen band.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden en laat aan de lucht drogen.",
    story:
      "Zig Zag brengt warmte en beweging in een kamer zonder te overheersen. Mooi boven een gedekte tafel, langs een kast of in de tuin op een lange zomeravond.",
  },
  {
    handle: "double-joy",
    name: "Double Joy",
    price: "€49,95",
    palette: "Linnen, pistache en paars",
    description:
      "Een linnen vlaggenlijn met pistachegroene en paarse vlaggetjes die elkaar afwisselen, afgewerkt met een soepel geweven katoenen ecru band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 75% linnen en 25% katoen. Oeko-Tex Standard 100 Product class 2.",
    materials: "Linnen vlaggetjes met een ecru katoenen band.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden en strijk licht wanneer gewenst.",
    story:
      "Double Joy voelt luchtig, zacht en uitgesproken tegelijk. Het linnen geeft de vlaggenlijn een natuurlijke rust die mooi blijft tussen feestmomenten door.",
  },
  {
    handle: "poppy-dots",
    name: "Poppy Dots",
    price: "€49,95",
    palette: "Velours dots",
    description:
      "Een zachte velours stof met speelse zwart-witte dalmatiër stippenprint. Minimalistisch, maar met een twist en afgewerkt met een turquoise katoenen band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 100% polyester.",
    materials: "Zachte velours stof met turquoise katoenen band.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden en vermijd de droger.",
    story:
      "Poppy Dots is speels op een ingetogen manier. De velours textuur vangt licht subtiel op en maakt van een kleine viering meteen iets bijzonders.",
  },
  {
    handle: "wavy-joy",
    name: "Wavy Joy",
    price: "€49,95",
    palette: "Jacquard, aardetinten",
    description:
      "Een gobelin jacquard met een zachte flow van aardse tinten. De golvende organische print brengt rust en karakter in kleine en grote vieringen.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
    materials: "Gobelin jacquard met een verfijnde katoenmix.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden en laat plat of hangend drogen.",
    story:
      "Wavy Joy is gemaakt voor mensen die kleur willen, maar met zachtheid. De organische print past bij brunches, verjaardagen en kamers die al veel karakter hebben.",
  },
  {
    handle: "cobalt-blue",
    name: "Cobalt Blue",
    price: "€49,95",
    palette: "Velours, kobalt en ecru",
    description:
      "Een zachte velours vlaggenlijn met golfprint, dubbelzijdig gestikt en vastgenaaid aan een soepel geweven ecru katoenen band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
    materials: "Velours golfprint met een ecru katoenen band.",
    dimensions: "12 vlaggetjes, totale lengte 450 cm.",
    care: "Was voorzichtig op 30 graden en houd uit direct hitte bij drogen.",
    story:
      "Cobalt Blue heeft een rustige statementkwaliteit. Het kobalt geeft diepte, terwijl de zachte stof het geheel warm en tastbaar houdt.",
  },
];

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export const values = [
  "Herbruikbare decoratie",
  "Dubbelzijdig en hoogwaardig afgewerkt",
  "Design-first benadering",
  "Voor kleine en grote momenten",
  "Handgemaakt in small batches",
  "Kwalitatief verfijnde stoffen",
];
