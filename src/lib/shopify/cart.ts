import { getShopifyClient, hasShopifyConfig } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
} from "./queries";
import type { ShopifyCart } from "./types";

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type CartUserError = {
  field: string[] | null;
  message: string;
};

type CartCreateResponse = {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: CartUserError[];
  };
};

type CartLinesAddResponse = {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: CartUserError[];
  };
};

function assertNoCartErrors(errors: CartUserError[]) {
  if (errors.length > 0) {
    throw new Error(
      `Shopify cart mutation failed: ${errors
        .map((error) => error.message)
        .join(", ")}`
    );
  }
}

export async function createStorefrontCart(
  lines: CartLineInput[] = []
): Promise<ShopifyCart | null> {
  if (!hasShopifyConfig()) {
    return null;
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<CartCreateResponse>(
    CART_CREATE_MUTATION,
    {
      variables: { lines },
    }
  );

  if (errors) {
    throw new Error(`Shopify cart create failed: ${errors.message}`);
  }

  if (!data) {
    throw new Error("Shopify cart create returned no data.");
  }

  assertNoCartErrors(data.cartCreate.userErrors);
  return data.cartCreate.cart;
}

export async function addLinesToStorefrontCart(
  cartId: string,
  lines: CartLineInput[]
): Promise<ShopifyCart | null> {
  if (!hasShopifyConfig()) {
    return null;
  }

  const client = getShopifyClient();
  const { data, errors } = await client.request<CartLinesAddResponse>(
    CART_LINES_ADD_MUTATION,
    {
      variables: { cartId, lines },
    }
  );

  if (errors) {
    throw new Error(`Shopify cart lines add failed: ${errors.message}`);
  }

  if (!data) {
    throw new Error("Shopify cart lines add returned no data.");
  }

  assertNoCartErrors(data.cartLinesAdd.userErrors);
  return data.cartLinesAdd.cart;
}
