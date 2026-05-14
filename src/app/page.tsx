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
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm uppercase tracking-[0.28em] text-[#5f493c]">
        <a href="#" className="font-semibold tracking-[0.34em]">
          Poppy Joy
        </a>
        <nav className="hidden gap-8 md:flex">
          <a href="#story">Story</a>
          <a href="#collection">Collection</a>
          <a href="#care">Care</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.36em] text-[#9b573f]">
            Reusable fabric bunting
          </p>
          <h1 className="serif max-w-4xl text-6xl font-semibold leading-[0.9] text-[#33241c] md:text-8xl">
            For moments that deserve joy.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[#5b4638]">
            Designed to stay. Made with love. Tijdloze stoffen vlaggenlijnen
            voor vieringen groot en klein, handgemaakt van verfijnde materialen
            die keer op keer opnieuw gebruikt mogen worden.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#collection"
              className="rounded-full bg-[#33241c] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#fff8ee] transition hover:bg-[#d95c42]"
            >
              Shop de collectie
            </a>
            <a
              href="#story"
              className="rounded-full border border-[#33241c]/25 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#33241c] transition hover:border-[#d95c42] hover:text-[#d95c42]"
            >
              Lees het verhaal
            </a>
          </div>
        </div>

        <div className="relative min-h-[520px] rounded-t-full bg-[#d95c42]/20 p-5 shadow-2xl shadow-[#8a533c]/10">
          <div className="h-full min-h-[480px] rounded-t-full border border-white/60 bg-[linear-gradient(135deg,#f7c77f_0_18%,#2447a8_18%_32%,#fff8ee_32%_45%,#b9c98b_45%_60%,#6c3f64_60%_75%,#d95c42_75%_100%)] p-6">
            <div className="flex h-full flex-col justify-between rounded-t-full bg-[#fff8ee]/72 p-8 backdrop-blur-sm">
              <p className="serif text-4xl font-semibold text-[#33241c]">
                CELEBRATE JOY
              </p>
              <p className="max-w-xs text-sm uppercase leading-6 tracking-[0.24em] text-[#5f493c]">
                Linen, jacquard, cotton and velours. Soft colour, lasting
                memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#33241c]/10 bg-[#fff8ee]/65">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-3">
          {values.slice(0, 3).map((value) => (
            <p
              key={value}
              className="text-sm uppercase tracking-[0.22em] text-[#6b4f3f]"
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
          <p className="text-sm uppercase tracking-[0.34em] text-[#9b573f]">
            Story
          </p>
          <h2 className="serif mt-4 text-5xl font-semibold leading-none md:text-6xl">
            Omdat vieren vaker mag.
          </h2>
        </div>
        <div className="grid gap-8 text-lg leading-8 text-[#594437] md:grid-cols-2">
          <article>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#33241c]">
              Wat is het
            </h3>
            <p>
              Poppy Joy ontwerpt stoffen herbruikbare vlaggenlijnen. De stoffen
              zijn met zorg en liefde uitgekozen en worden handgemaakt:
              ontworpen om het leven te vieren, juist in kleine momenten en
              grote momenten.
            </p>
          </article>
          <article>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#33241c]">
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

      <section
        id="collection"
        className="bg-[#33241c] px-6 py-24 text-[#fff8ee]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.34em] text-[#f7c77f]">
                Drop 1
              </p>
              <h2 className="serif mt-4 text-5xl font-semibold md:text-7xl">
                Celebrate Joy
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#f8dfc2]">
              Vijf unieke ontwerpen, elk dubbelzijdig gestikt en gemaakt voor
              interieur, tuinfeest, verjaardag of spontaan diner.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-[2rem] border border-[#fff8ee]/15 bg-[#fff8ee]/8 p-6"
              >
                <div className="mb-8 aspect-[4/5] rounded-t-full bg-[linear-gradient(145deg,#f7c77f,#b9c98b,#2447a8,#d95c42)] opacity-85" />
                <p className="text-xs uppercase tracking-[0.22em] text-[#f7c77f]">
                  {product.palette}
                </p>
                <h3 className="serif mt-3 text-3xl font-semibold">
                  {product.name}
                </h3>
                <p className="mt-2 text-lg font-semibold">{product.price}</p>
                <p className="mt-5 text-sm leading-6 text-[#f8dfc2]">
                  {product.description}
                </p>
                <p className="mt-5 text-xs leading-5 text-[#d8bd9f]">
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
        <div className="rounded-[2rem] bg-[#fff8ee]/75 p-8">
          <h2 className="serif text-4xl font-semibold">Materials</h2>
          <p className="mt-5 leading-7 text-[#5b4638]">
            Gemaakt van verfijnde stoffen zoals linnen, jacquard, katoen,
            velours en polyester. Sommige stoffen dragen het Oeko-Tex label.
          </p>
        </div>
        <div className="rounded-[2rem] bg-[#fff8ee]/75 p-8">
          <h2 className="serif text-4xl font-semibold">Use</h2>
          <p className="mt-5 leading-7 text-[#5b4638]">
            Flexibel op te hangen met katoenen uiteinden en makkelijk opnieuw te
            stylen, binnen of buiten, voor kleine en grote momenten.
          </p>
        </div>
        <div className="rounded-[2rem] bg-[#fff8ee]/75 p-8">
          <h2 className="serif text-4xl font-semibold">Washing care</h2>
          <p className="mt-5 leading-7 text-[#5b4638]">
            De vlaggenlijnen kun je wassen op 30 graden. Exacte samenstelling en
            verzorging staan bij de productdetails.
          </p>
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-[#33241c]/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="serif text-3xl font-semibold">Poppy Joy</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-[#6b4f3f]">
            {footerLinks.map((link) => (
              <a href="#" key={link}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
