import { Container } from "@/components/poppy";

export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-brand-off-white pt-24 text-brand-black md:pt-28">
      <Container className="pb-16 lg:max-w-[96rem] lg:pb-24">
        <div className="loading-sheen h-4 w-32 rounded-full lg:hidden" />

        <div className="mt-5 grid gap-10 lg:mt-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.7fr)] lg:items-stretch xl:grid-cols-[minmax(0,1.7fr)_minmax(380px,0.62fr)]">
          <div className="relative loading-sheen aspect-square min-h-48 overflow-hidden rounded-[2rem] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            <div className="absolute left-4 top-4 hidden h-7 w-36 rounded-full bg-brand-off-white/80 lg:block" />
          </div>

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
