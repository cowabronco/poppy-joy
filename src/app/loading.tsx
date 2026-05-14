import { Container } from "@/components/poppy";

export default function GlobalLoading() {
  return (
    <main className="min-h-screen bg-brand-off-white pt-28 text-brand-black md:pt-32">
      <Container className="space-y-6">
        <div className="loading-sheen h-4 w-24 rounded-full" />
        <div className="loading-sheen h-16 w-full max-w-3xl rounded-3xl" />
        <div className="loading-sheen h-6 w-full max-w-2xl rounded-2xl" />
        <div className="grid gap-4 pt-8 md:grid-cols-3">
          <div className="loading-sheen h-40 rounded-3xl" />
          <div className="loading-sheen h-40 rounded-3xl" />
          <div className="loading-sheen h-40 rounded-3xl" />
        </div>
      </Container>
    </main>
  );
}
