import { Container } from "@/components/poppy";

export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-brand-off-white pt-28 text-brand-black md:pt-32">
      <Container className="pb-16 lg:pb-24">
        <div className="loading-sheen h-4 w-32 rounded-full" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)] lg:items-start">
          <div className="loading-sheen aspect-[4/5] rounded-[2rem]" />

          <div className="rounded-[2rem] border border-border bg-[#F2EDE3] p-6 sm:p-8">
            <div className="loading-sheen h-3 w-28 rounded-full" />
            <div className="loading-sheen mt-5 h-14 w-3/4 rounded-2xl" />
            <div className="loading-sheen mt-4 h-4 w-1/2 rounded-full" />
            <div className="loading-sheen mt-5 h-12 w-32 rounded-2xl" />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="loading-sheen h-20 rounded-2xl" />
              <div className="loading-sheen h-20 rounded-2xl" />
            </div>
            <div className="mt-5 space-y-3">
              <div className="loading-sheen h-14 rounded-2xl" />
              <div className="loading-sheen h-14 rounded-2xl" />
              <div className="loading-sheen h-14 rounded-2xl" />
            </div>
            <div className="loading-sheen mt-8 h-13 rounded-full" />
            <div className="loading-sheen mt-8 h-48 rounded-[1.5rem]" />
          </div>
        </div>
      </Container>
    </main>
  );
}
