import { Container, EditorialHeading, ProductCard } from "@/components/poppy";
import { Button } from "@/components/ui/button";
import { products, values } from "@/lib/products";

const footerLinks = [
  "Shipping & returns",
  "Washing & care",
  "FAQ",
  "Contact",
  "Instagram",
  "Privacy Policy",
  "Terms & Conditions",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-brand-black">
      <header className="text-brand-black/70">
        <Container className="flex items-center justify-between py-6 text-xs uppercase tracking-[0.28em]">
        <a href="#" className="font-semibold tracking-[0.34em] text-brand-black">
          Poppy Joy
        </a>
        <nav className="hidden gap-8 md:flex text-[11px]">
          <a className="transition hover:text-brand-purple" href="#">
            Home
          </a>
          <a className="transition hover:text-brand-purple" href="#collection">
            Shop
          </a>
          <a className="transition hover:text-brand-purple" href="#story">
            Story
          </a>
        </nav>
        </Container>
      </header>

      <Container className="grid gap-10 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.36em] text-brand-purple">
            Reusable fabric bunting
          </p>
          <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.93] text-brand-black md:text-8xl">
            For moments that deserve joy.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-brand-black/70">
            Designed to stay. Made with love. Tijdloze stoffen vlaggenlijnen
            voor vieringen groot en klein, handgemaakt van verfijnde materialen
            die keer op keer opnieuw gebruikt mogen worden.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="rounded-full bg-brand-purple px-7 py-6 text-xs uppercase tracking-[0.22em] text-brand-off-white hover:bg-brand-purple/90">
              <a href="#collection">Shop de collectie</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-brand-black/20 bg-brand-off-white px-7 py-6 text-xs uppercase tracking-[0.22em] text-brand-black hover:bg-brand-beige"
            >
              <a href="#story">Lees het verhaal</a>
            </Button>
          </div>
        </div>

        <div className="relative rounded-[2.6rem] border border-border bg-brand-beige p-8 shadow-[0_18px_42px_rgba(36,32,32,0.06)]">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.8rem] border border-border bg-brand-off-white p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-brand-purple">
                Atelier note
              </p>
              <p className="serif mt-4 text-4xl leading-tight text-brand-black">
                Ambachtelijk, persoonlijk en ontworpen om te blijven.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-border bg-brand-off-white p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-brand-black/55">
                Materialen
              </p>
              <ul className="mt-4 space-y-3 text-sm text-brand-black/65">
                <li>Linnen, katoen, velours, jacquard</li>
                <li>Dubbelzijdige afwerking</li>
                <li>Herbruikbaar voor elk seizoen</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-y border-border bg-brand-beige">
        <Container className="grid gap-4 py-9 md:grid-cols-3">
          {values.slice(0, 6).map((value) => (
            <p
              key={value}
              className="text-xs uppercase tracking-[0.22em] text-brand-black/65"
            >
              {value}
            </p>
          ))}
        </Container>
      </section>

      <Container
        id="story"
        className="grid gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <EditorialHeading eyebrow="Story" title="Omdat vieren vaker mag." />
        <div className="grid gap-6 text-lg leading-8 text-brand-black/70 md:grid-cols-2">
          <article className="rounded-[1.8rem] border border-border bg-brand-beige p-7">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-black">
              Wat is het
            </h3>
            <p>
              Poppy Joy ontwerpt stoffen herbruikbare vlaggenlijnen. De stoffen
              zijn met zorg en liefde uitgekozen en worden handgemaakt:
              ontworpen om het leven te vieren, juist in kleine momenten en
              grote momenten.
            </p>
          </article>
          <article className="rounded-[1.8rem] border border-border bg-brand-beige p-7">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-black">
              Waarom Poppy Joy
            </h3>
            <p>
              Geen eenmalige plastic versiering, maar iets dat je blijft
              gebruiken en waarmee je jarenlang herinneringen blijft maken. Warm,
              stijlvol en met karakter.
            </p>
          </article>
        </div>
      </Container>

      <section id="collection" className="px-6 py-24">
        <Container className="px-0">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <EditorialHeading eyebrow="Drop 1" title="Celebrate Joy" />
            <p className="max-w-md leading-7 text-brand-black/70">
              Vijf unieke ontwerpen, elk dubbelzijdig gestikt en gemaakt voor
              interieur, tuinfeest, verjaardag of spontaan diner.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <Container
        id="care"
        className="grid gap-8 py-24 md:grid-cols-3"
      >
        <div className="rounded-[2rem] border border-border bg-brand-beige p-8">
          <h2 className="serif text-4xl font-semibold text-brand-black">
            Materials
          </h2>
          <p className="mt-5 leading-7 text-brand-black/70">
            Gemaakt van verfijnde stoffen zoals linnen, jacquard, katoen,
            velours en polyester. Sommige stoffen dragen het Oeko-Tex label.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-brand-beige p-8">
          <h2 className="serif text-4xl font-semibold text-brand-black">Use</h2>
          <p className="mt-5 leading-7 text-brand-black/70">
            Flexibel op te hangen met katoenen uiteinden en makkelijk opnieuw te
            stylen, binnen of buiten, voor kleine en grote momenten.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-brand-beige p-8">
          <h2 className="serif text-4xl font-semibold text-brand-black">
            Washing care
          </h2>
          <p className="mt-5 leading-7 text-brand-black/70">
            De vlaggenlijnen kun je wassen op 30 graden. Exacte samenstelling en
            verzorging staan bij de productdetails.
          </p>
        </div>
      </Container>

      <footer className="px-6 pb-10">
        <Container className="flex flex-col gap-8 border-t border-border px-0 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="serif text-3xl font-semibold text-brand-black">Poppy Joy</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-brand-black/65">
            {footerLinks.map((link) => (
              <a className="transition hover:text-brand-purple" href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        </Container>
      </footer>
    </main>
  );
}
