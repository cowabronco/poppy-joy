import type { ShopifyProductVariant, StorefrontProduct } from "./types";

export type ProductAvailabilityLabel = "Op voorraad" | "Uitverkocht";

const DEFAULT_MAX_QUANTITY = 12;

export type ProductPurchaseState = {
  canAddToCart: boolean;
  isSoldOut: boolean;
  displayVariant: ShopifyProductVariant | null;
  purchasableVariant: ShopifyProductVariant | null;
  availabilityLabel: ProductAvailabilityLabel;
  maxQuantity: number;
};

export function getMaxPurchasableQuantity(
  variant:
    | Pick<ShopifyProductVariant, "availableForSale" | "quantityAvailable">
    | null
    | undefined
): number {
  if (!variant?.availableForSale) {
    return 0;
  }

  if (typeof variant.quantityAvailable === "number") {
    return Math.max(0, variant.quantityAvailable);
  }

  return DEFAULT_MAX_QUANTITY;
}

export function isVariantAvailableForPurchase(
  variant: Pick<ShopifyProductVariant, "availableForSale"> | null | undefined
) {
  return Boolean(variant?.availableForSale);
}

export function isProductAvailableForPurchase(
  product: Pick<StorefrontProduct, "availableForSale" | "variants"> | null | undefined
) {
  if (!product?.availableForSale) {
    return false;
  }

  return product.variants.some((variant) => variant.availableForSale);
}

export function getProductAvailabilityLabel(
  product: Pick<StorefrontProduct, "availableForSale" | "variants"> | null | undefined
): ProductAvailabilityLabel {
  return isProductAvailableForPurchase(product) ? "Op voorraad" : "Uitverkocht";
}

export function getProductPurchaseState(
  product: StorefrontProduct | null | undefined
): ProductPurchaseState {
  const displayVariant = product?.variants[0] ?? null;
  const purchasableVariant =
    product?.variants.find((variant) => variant.availableForSale) ?? null;
  const canAddToCart = isProductAvailableForPurchase(product);
  const isSoldOut = Boolean(product) && !canAddToCart;
  const maxQuantity = getMaxPurchasableQuantity(purchasableVariant);

  return {
    canAddToCart,
    isSoldOut,
    displayVariant,
    purchasableVariant,
    availabilityLabel: getProductAvailabilityLabel(product),
    maxQuantity,
  };
}

export function getAddToCartLabel(canAddToCart: boolean, isSoldOut: boolean) {
  if (canAddToCart) {
    return "In winkelwagen";
  }

  return isSoldOut ? "Uitverkocht" : "Niet beschikbaar";
}
