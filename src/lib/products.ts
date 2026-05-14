export type Product = {
  name: string;
  price: string;
  palette: string;
  description: string;
  details: string;
};

export const products: Product[] = [
  {
    name: "Zig Zag",
    price: "€49,95",
    palette: "Warm jacquard, pistache band",
    description:
      "Een levendige zig zag print in warme kleuren, gemaakt van gobelin jacquard met diepte en textuur. De lijn is vastgenaaid aan een soepel geweven katoenen pistachegroene band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
  },
  {
    name: "Double Joy",
    price: "€49,95",
    palette: "Linnen, pistache en paars",
    description:
      "Een linnen vlaggenlijn met pistachegroene en paarse vlaggetjes die elkaar afwisselen, afgewerkt met een soepel geweven katoenen ecru band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 75% linnen en 25% katoen. Oeko-Tex Standard 100 Product class 2.",
  },
  {
    name: "Poppy Dots",
    price: "€49,95",
    palette: "Velours, zwart-wit en turquoise",
    description:
      "Een zachte velours stof met speelse zwart-witte dalmatiër stippenprint. Minimalistisch, maar met een twist en afgewerkt met een turquoise katoenen band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 100% polyester.",
  },
  {
    name: "Wavy Joy",
    price: "€49,95",
    palette: "Jacquard, aardetinten",
    description:
      "Een gobelin jacquard met een zachte flow van aardse tinten. De golvende organische print brengt rust en karakter in kleine en grote vieringen.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
  },
  {
    name: "Cobalt Blue",
    price: "€49,95",
    palette: "Velours, kobalt en ecru",
    description:
      "Een zachte velours vlaggenlijn met golfprint, dubbelzijdig gestikt en vastgenaaid aan een soepel geweven ecru katoenen band.",
    details:
      "12 dubbelzijdig gestikte vlaggetjes, 450 cm lang. Samenstelling: 50% polyester en 50% katoen.",
  },
];

export const values = [
  "Herbruikbare decoratie",
  "Dubbelzijdig en hoogwaardig afgewerkt",
  "Design-first benadering",
  "Voor kleine en grote momenten",
  "Handgemaakt in small batches",
  "Kwalitatief verfijnde stoffen",
];
