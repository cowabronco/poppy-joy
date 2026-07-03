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
  "Voor kleine en grote momenten",
  "Handgemaakt in small batches",
];
