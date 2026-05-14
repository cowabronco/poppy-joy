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
    <main className="min-h-screen overflow-hidden text-[#4a3b32]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs uppercase tracking-[0.28em] text-[#6b5648]">
        <a href="#" className="font-semibold tracking-[0.34em] text-[#4d3b31]">
          Poppy Joy
        </a>
        <nav className="hidden gap-8 md:flex text-[11px]">
          <a className="transition hover:text-[#9d614a]" href="#story">
            Story
          </a>
          <a className="transition hover:text-[#9d614a]" href="#collection">
            Collection
          </a>
          <a className="transition hover:text-[#9d614a]" href="#care">
            Care
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.36em] text-[#9d614a]">
            Reusable fabric bunting
          </p>
          <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.93] text-[#3e2f26] md:text-8xl">
            For moments that deserve joy.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[#665144]">
            Designed to stay. Made with love. Tijdloze stoffen vlaggenlijnen
            voor vieringen groot en klein, handgemaakt van verfijnde materialen
            die keer op keer opnieuw gebruikt mogen worden.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#collection"
              className="rounded-full border border-[#604638]/70 bg-[#5f4638] px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#f9f1e8] transition hover:bg-[#8d5c46]"
            >
              Shop de collectie
            </a>
            <a
              href="#story"
              className="rounded-full border border-[#8d7563]/35 bg-[#fff9f2]/55 px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#5b4638] transition hover:border-[#9d614a]"
            >
              Lees het verhaal
            </a>
          </div>
        </div>

        <div className="relative rounded-[2.6rem] border border-[#d7c4b3] bg-[#fbf3e8] p-8 shadow-[0_18px_42px_rgba(90,65,45,0.08)]">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.8rem] border border-[#e4d5c6] bg-[#f6ecdf] p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9d614a]">
                Atelier note
              </p>
              <p className="serif mt-4 text-4xl leading-tight text-[#3f3027]">
                Ambachtelijk, persoonlijk en ontworpen om te blijven.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[#e4d5c6] bg-[#fdf9f3] p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#736051]">
                Materialen
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#635044]">
                <li>Linnen, katoen, velours, jacquard</li>
                <li>Dubbelzijdige afwerking</li>
                <li>Herbruikbaar voor elk seizoen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9c8b7] bg-[#f8efe4]/80">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-9 md:grid-cols-3">
          {values.slice(0, 6).map((value) => (
            <p
              key={value}
              className="text-xs uppercase tracking-[0.22em] text-[#71594c]"
            >
              {value}
            </p>
          ))}
        </div>
      </section>

      <section
        id="story"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#9d614a]">
            Story
          </p>
          <h2 className="serif mt-4 text-5xl font-semibold leading-none text-[#3f3027] md:text-6xl">
            Omdat vieren vaker mag.
          </h2>
        </div>
        <div className="grid gap-6 text-lg leading-8 text-[#594437] md:grid-cols-2">
          <article className="rounded-[1.8rem] border border-[#decebf] bg-[#fcf5ec] p-7">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#4f3d32]">
              Wat is het
            </h3>
            <p>
              Poppy Joy ontwerpt stoffen herbruikbare vlaggenlijnen. De stoffen
              zijn met zorg en liefde uitgekozen en worden handgemaakt:
              ontworpen om het leven te vieren, juist in kleine momenten en
              grote momenten.
            </p>
          </article>
          <article className="rounded-[1.8rem] border border-[#decebf] bg-[#fcf5ec] p-7">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#4f3d32]">
              Waarom Poppy Joy
            </h3>
            <p>
              Geen eenmalige plastic versiering, maar iets dat je blijft
              gebruiken en waarmee je jarenlang herinneringen blijft maken. Warm,
              stijlvol en met karakter.
            </p>
          </article>
        </div>
      </section>

      <section id="collection" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#9d614a]">
                Drop 1
              </p>
              <h2 className="serif mt-4 text-5xl font-semibold text-[#3f3027] md:text-7xl">
                Celebrate Joy
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#6a5448]">
              Vijf unieke ontwerpen, elk dubbelzijdig gestikt en gemaakt voor
              interieur, tuinfeest, verjaardag of spontaan diner.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {products.map((product, idx) => (
              <article
                key={product.name}
                className="rounded-[2rem] border border-[#ddcab9] bg-[#fdf7ef] p-6"
              >
                <div className="mb-6 flex gap-2">
                  {[
                    "#e4cdb8",
                    "#c7b09b",
                    "#a68a73",
                    idx % 2 === 0 ? "#b9c98b" : "#9e7b76",
                  ].map((swatch) => (
                    <span
                      key={`${product.name}-${swatch}`}
                      className="h-2.5 w-7 rounded-full"
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8e7362]">
                  {product.palette}
                </p>
                <h3 className="serif mt-3 text-3xl font-semibold text-[#3f3027]">
                  {product.name}
                </h3>
                <p className="mt-2 text-base font-semibold text-[#5d4639]">
                  {product.price}
                </p>
                <p className="mt-5 text-sm leading-6 text-[#6d584a]">
                  {product.description}
                </p>
                <p className="mt-5 text-xs leading-5 text-[#8f7765]">
                  {product.details}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="care"
        className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:grid-cols-3"
      >
        <div className="rounded-[2rem] border border-[#ddcab9] bg-[#fcf4e9] p-8">
          <h2 className="serif text-4xl font-semibold text-[#3f3027]">Materials</h2>
          <p className="mt-5 leading-7 text-[#5b4638]">
            Gemaakt van verfijnde stoffen zoals linnen, jacquard, katoen,
            velours en polyester. Sommige stoffen dragen het Oeko-Tex label.
          </p>
        </div>
        <div className="rounded-[2rem] border border-[#ddcab9] bg-[#fcf4e9] p-8">
          <h2 className="serif text-4xl font-semibold text-[#3f3027]">Use</h2>
          <p className="mt-5 leading-7 text-[#5b4638]">
            Flexibel op te hangen met katoenen uiteinden en makkelijk opnieuw te
            stylen, binnen of buiten, voor kleine en grote momenten.
          </p>
        </div>
        <div className="rounded-[2rem] border border-[#ddcab9] bg-[#fcf4e9] p-8">
          <h2 className="serif text-4xl font-semibold text-[#3f3027]">
            Washing care
          </h2>
          <p className="mt-5 leading-7 text-[#5b4638]">
            De vlaggenlijnen kun je wassen op 30 graden. Exacte samenstelling en
            verzorging staan bij de productdetails.
          </p>
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-[#d9c8b7] pt-10 md:flex-row md:items-center md:justify-between">
          <p className="serif text-3xl font-semibold text-[#3f3027]">Poppy Joy</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-[#6b4f3f]">
            {footerLinks.map((link) => (
              <a className="transition hover:text-[#9d614a]" href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
