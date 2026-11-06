import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Truck } from "lucide-react";

import { CartCountSync } from "@/components/poppy/cart-count-sync";
import { CartLineQuantity } from "@/components/poppy/cart-line-quantity";
import { CartRemoveButton } from "@/components/poppy/cart-remove-button";
import { CheckoutForm } from "@/components/poppy/checkout-form";
import { Container, EditorialHeading, Price } from "@/components/poppy";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/money";
import { getMaxPurchasableQuantity } from "@/lib/shopify/availability";
import type { ShopifyCart } from "@/lib/shopify/types";

type CartPageContentProps = {
  cart: ShopifyCart | null;
};

export function CartPageContent({ cart }: CartPageContentProps) {
  const lines = cart?.lines.edges ?? [];
  const subtotal = formatMoney(cart?.cost.subtotalAmount);

  if (!cart || lines.length === 0) {
    return (
      <Container className="px-6 py-24">
        <CartCountSync totalQuantity={0} />
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-brand-beige/50 px-8 py-16 text-center">
          <EditorialHeading
            eyebrow="Winkelwagen"
            title="Je winkelwagen is nog leeg"
            className="items-center text-center"
          />
          <p className="mt-4 text-sm leading-7 text-brand-black/70">
            Ontdek de Celebrate Joy collectie en voeg je favoriete vlaggenlijn
            toe.
          </p>
          <Button
            asChild
            className="mt-8 rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90"
          >
            <Link href="/shop">Naar de shop</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="px-6 py-24">
      <CartCountSync totalQuantity={cart.totalQuantity} />
      <div className="mx-auto max-w-4xl">
        <EditorialHeading eyebrow="Winkelwagen" title="Je selectie" />

        <div className="mt-10 space-y-4">
          {lines.map(({ node: line }) => {
            const product = line.merchandise.product;
            const lineTotal = formatMoney({
              amount: (
                Number(line.merchandise.price.amount) * line.quantity
              ).toFixed(2),
              currencyCode: line.merchandise.price.currencyCode,
            });
            const image = product.featuredImage;

            return (
              <article
                key={line.id}
                className="grid gap-5 rounded-3xl border border-border bg-brand-beige/40 p-5 sm:grid-cols-[120px_minmax(0,1fr)]"
              >
                <Link
                  href={`/products/${product.handle}`}
                  className="overflow-hidden rounded-2xl bg-brand-off-white"
                >
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.altText ?? product.title}
                      width={480}
                      height={600}
                      className="aspect-[4/5] h-full w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/5] bg-brand-beige" />
                  )}
                </Link>

                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <Link
                      href={`/products/${product.handle}`}
                      className="serif text-2xl font-semibold text-brand-black transition hover:text-brand-purple"
                    >
                      {product.title}
                    </Link>
                    {line.merchandise.title !== "Default Title" ? (
                      <p className="mt-1 text-sm text-brand-black/60">
                        {line.merchandise.title}
                      </p>
                    ) : null}
                    <div className="mt-4">
                      <CartLineQuantity
                        lineId={line.id}
                        quantity={line.quantity}
                        maxQuantity={Math.max(
                          getMaxPurchasableQuantity(line.merchandise),
                          line.quantity
                        )}
                        productTitle={product.title}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-3">
                    {lineTotal ? (
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <Price className="text-lg">{lineTotal}</Price>
                        <span className="text-xs text-brand-black/50">
                          Inclusief BTW
                        </span>
                      </div>
                    ) : null}
                    <CartRemoveButton lineId={line.id} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-brand-off-white/80 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 pb-4">
            <p className="text-sm uppercase tracking-[0.22em] text-brand-black/60">
              Verzending
            </p>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-purple">
              Gratis
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 border-y border-border py-6">
            <p className="text-sm uppercase tracking-[0.22em] text-brand-black/60">
              Totaal
            </p>
            {subtotal ? (
              <div className="flex items-baseline gap-2">
                <Price className="text-xl">{subtotal}</Price>
                <span className="text-xs text-brand-black/60">incl. BTW</span>
              </div>
            ) : null}
          </div>
          <ul className="mt-8 space-y-3 rounded-2xl bg-brand-purple/10 p-5 text-sm font-medium leading-6 text-brand-black">
            {[
              {
                icon: Truck,
                label: "Gratis verzending, binnen twee werkdagen verzonden",
              },
              { icon: ShoppingBag, label: "Gratis bewaarzakje" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-purple text-brand-off-white">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-border px-8 text-xs uppercase tracking-[0.22em]"
            >
              <Link href="/shop">Verder winkelen</Link>
            </Button>
            <CheckoutForm
              className="sm:flex-1"
              event={{
                currency: cart.cost.subtotalAmount.currencyCode,
                numItems: cart.totalQuantity,
                value: Number(cart.cost.subtotalAmount.amount),
              }}
            >
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90"
              >
                Afrekenen
              </Button>
            </CheckoutForm>
          </div>
        </div>
      </div>
    </Container>
  );
}
