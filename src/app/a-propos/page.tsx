import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/siteContent";

export const metadata = {
  title: "À propos | XLR Photographie",
  description: "Présentation de l'approche éditoriale du site XLR Photographie."
};

export default async function AboutPage() {
  const { pages } = await getSiteContent();
  const page = pages.find((item) => item.slug === "a-propos");

  if (!page) {
    notFound();
  }

  return (
    <main>
      <section className="mx-auto min-h-svh max-w-7xl px-5 pb-24 pt-40 md:px-10 md:pt-52">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-champagne/65">
          {page.label}
        </p>
        <h1 className="mt-7 max-w-4xl font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.92] text-ivory">
          Une lecture lente de la photographie.
        </h1>
        <div className="mt-16 grid gap-10 border-t border-ivory/10 pt-10 text-lg leading-9 text-ivory/55 md:grid-cols-2 md:gap-20">
          <p>
            XLR Photographie présente les images par chapitres, avec une attention portée au
            silence, aux matières, aux lumières basses et aux séquences.
          </p>
          <p>
            La structure du site reste volontairement simple : les séries sont pilotées par un
            fichier de données central et peuvent évoluer vers Google Drive, Google Sheets,
            Cloudflare R2 ou un autre stockage externe.
          </p>
        </div>
      </section>
    </main>
  );
}
