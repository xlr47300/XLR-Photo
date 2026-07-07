import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="mx-auto min-h-svh max-w-7xl px-5 pb-24 pt-40 md:px-10 md:pt-52">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-champagne/65">
          Introuvable
        </p>
        <h1 className="mt-7 max-w-3xl font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.92] text-ivory">
          Cette page n’existe pas.
        </h1>
        <Link
          className="mt-12 inline-flex border border-ivory/15 px-6 py-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ivory/80 transition duration-300 hover:border-champagne/50 hover:text-ivory"
          href="/"
        >
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
