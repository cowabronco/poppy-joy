import { Container, EditorialHeading } from "@/components/poppy";

export default function CartLoading() {
  return (
    <main className="bg-brand-off-white pt-28" aria-busy="true">
      <Container className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <EditorialHeading eyebrow="Winkelwagen" title="Je selectie" />
          <div className="mt-10 space-y-4">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="grid animate-pulse gap-5 rounded-3xl border border-border bg-brand-beige/40 p-5 sm:grid-cols-[120px_minmax(0,1fr)]"
              >
                <div className="aspect-[4/5] rounded-2xl bg-brand-beige" />
                <div className="space-y-3 py-1">
                  <div className="h-6 w-2/3 rounded-full bg-brand-beige" />
                  <div className="h-10 w-32 rounded-full bg-brand-beige" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 h-48 animate-pulse rounded-3xl border border-border bg-brand-off-white/80" />
        </div>
      </Container>
    </main>
  );
}
