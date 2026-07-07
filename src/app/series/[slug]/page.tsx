import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { getSeriesBySlug, series } from "@/data/series";

type SeriesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return series.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);

  return {
    title: item ? `${item.title} | XLR Photographie` : "Série introuvable",
    description: item?.description
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const item = getSeriesBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <Link
          className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ivory/40 transition-colors hover:text-ivory"
          href="/#series"
        >
          Retour au sommaire
        </Link>
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_0.72fr] md:items-end">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-champagne/65">
              Série
            </p>
            <h1 className="mt-6 font-serif text-[clamp(4.5rem,11vw,10rem)] leading-[0.9] text-ivory">
              {item.title}
            </h1>
          </div>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ivory/35">
              {item.subtitle}
            </p>
            <p className="mt-7 text-lg leading-9 text-ivory/55">{item.description}</p>
            <blockquote className="mt-9 border-l border-champagne/35 pl-6 font-serif text-2xl italic leading-snug text-ivory/75">
              {item.quote}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-10 md:pb-44">
        <PhotoGallery photos={item.photos} seriesTitle={item.title} />
      </section>
    </main>
  );
}
