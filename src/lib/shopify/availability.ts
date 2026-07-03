import type { ShopifyProductVariant, StorefrontProduct } from "./types";

export type ProductAvailabilityLabel = "Op voorraad" | "Uitverkocht";

export type ProductPurchaseState = {
  canAddToCart: boolean;
  isSoldOut: boolean;
  displayVariant: ShopifyProductVariant | null;
  purchasableVariant: ShopifyProductVariant | null;
  availabilityLabel: ProductAvailabilityLabel;
};

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

  return {
    canAddToCart,
    isSoldOut,
    displayVariant,
    purchasableVariant,
    availabilityLabel: getProductAvailabilityLabel(product),
  };
}

export function getAddToCartLabel(canAddToCart: boolean, isSoldOut: boolean) {
  if (canAddToCart) {
    return "In winkelwagen";
  }

  return isSoldOut ? "Uitverkocht" : "Niet beschikbaar";
}
