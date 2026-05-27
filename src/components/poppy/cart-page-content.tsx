import Image from "next/image";
import Link from "next/link";

import { Container, EditorialHeading, Price } from "@/components/poppy";
import { Button } from "@/components/ui/button";
import { goToCheckout } from "@/lib/cart/actions";
import { formatMoney } from "@/lib/money";
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
            const unitPrice = formatMoney(line.merchandise.price);
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
                    <p className="mt-3 text-sm text-brand-black/60">
                      Aantal: {line.quantity}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      {unitPrice ? (
                        <p className="text-sm text-brand-black/60">{unitPrice}</p>
                      ) : null}
                      {lineTotal ? <Price className="text-lg">{lineTotal}</Price> : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-brand-off-white/80 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-[0.22em] text-brand-black/60">
              Subtotaal
            </p>
            {subtotal ? (
              <Price className="text-xl">{subtotal}</Price>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-brand-black/60">
            Verzendkosten en btw worden tijdens het afrekenen berekend.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-border px-8 text-xs uppercase tracking-[0.22em]"
            >
              <Link href="/shop">Verder winkelen</Link>
            </Button>
            <form action={goToCheckout} className="sm:flex-1">
              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-brand-purple px-8 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90"
              >
                Afrekenen
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
