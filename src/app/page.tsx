import Link from "next/link";
import { SeriesCard } from "@/components/SeriesCard";
import { series, totalPhotoCount } from "@/data/series";

export default function Home() {
  return (
    <main>
      <section className="relative grid min-h-svh place-items-center overflow-hidden px-5 pb-24 pt-36 text-center md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,112,132,0.42),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(7,11,17,0.72)_78%,rgba(7,11,17,0.98)_100%)]" />
        <div className="relative z-10 mx-auto max-w-5xl animate-[fadeUp_1.4s_cubic-bezier(0.22,0.61,0.36,1)_both]">
          <div className="mx-auto mb-10 grid size-24 place-items-center rounded-full border border-ivory/20 text-center shadow-[0_0_80px_rgba(199,160,106,0.08)]">
            <span className="relative font-serif text-3xl tracking-[0.08em] text-ivory/85">
              XLR
              <span className="absolute -bottom-3 right-1 size-1.5 rounded-full bg-champagne/80" />
            </span>
          </div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.32em] text-ivory/38 before:mx-4 before:inline-block before:h-px before:w-8 before:bg-ivory/15 before:align-middle after:mx-4 after:inline-block after:h-px after:w-8 after:bg-ivory/15 after:align-middle">
            Carnet photographique
          </p>
          <h1 className="mt-9 font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.9] tracking-normal text-ivory">
            Les chapitres
            <br />
            <em className="font-normal italic text-champagne">silencieux</em>
          </h1>
          <p className="mx-auto mt-9 max-w-2xl font-serif text-xl italic leading-9 text-ivory/55 md:text-2xl">
            Séries d’auteur, matières urbaines, lumière retenue et instants suspendus.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-7 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ivory/38">
            <span>{series.length} séries</span>
            <span className="text-ivory/18">·</span>
            <span>{totalPhotoCount} photographies</span>
            <span className="text-ivory/18">·</span>
            <span>Édition évolutive</span>
          </div>
          <Link
            className="mt-12 inline-flex border border-ivory/15 px-6 py-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ivory/80 transition duration-300 hover:border-champagne/50 hover:text-ivory"
            href="#series"
          >
            Entrer
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_1.2fr] md:px-10 md:py-36">
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-champagne/65">
            Approche
          </p>
          <h2 className="mt-6 max-w-xl font-serif text-5xl leading-none text-ivory md:text-7xl">
            Un site pensé comme un beau livre.
          </h2>
        </div>
        <p className="max-w-2xl self-end text-lg leading-9 text-ivory/55">
          Chaque série fonctionne comme un chapitre photographique. Les contenus viennent
          d’un fichier de données central, afin d’ajouter ou modifier les séries sans toucher
          aux composants.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40" id="series">
        <div className="mb-14 flex flex-col gap-5 border-b border-ivory/10 pb-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-champagne/65">
              Sommaire
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-none text-ivory md:text-7xl">
              Séries
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-ivory/42">
            Les blocs se remplissent automatiquement dès que des photos externes sont ajoutées.
          </p>
        </div>
        <div className="grid gap-20 md:gap-28">
          {series.map((item, index) => (
            <SeriesCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
