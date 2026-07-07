"use client";

import Link from "next/link";
import { PhotoGallery } from "@/components/PhotoGallery";
import { useSiteContent } from "@/components/ContentProvider";
import { getSeriesBySlug } from "@/lib/contentTransform";
import type { PhotoSeries } from "@/types/content";

type SeriesDetailContentProps = {
  slug: string;
  initialSeries?: PhotoSeries;
};

export function SeriesDetailContent({ slug, initialSeries }: SeriesDetailContentProps) {
  const { content } = useSiteContent();
  const item = getSeriesBySlug(content, slug) ?? initialSeries;

  if (!item) {
    return (
      <main>
        <section className="mx-auto min-h-svh max-w-7xl px-5 pb-24 pt-40 md:px-10 md:pt-52">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-champagne/68">
            Introuvable
          </p>
          <h1 className="mt-7 max-w-3xl font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.92] text-ivory">
            Cette série n’existe pas.
          </h1>
          <Link
            className="mt-12 inline-flex border border-ivory/15 px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ivory/82 transition duration-300 hover:border-champagne/50 hover:text-ivory"
            href="/#series"
          >
            Retour au sommaire
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <Link
          className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ivory/48 transition-colors hover:text-ivory"
          href="/#series"
        >
          Retour au sommaire
        </Link>
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_0.72fr] md:items-end">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-champagne/68">
              Série
            </p>
            <h1 className="mt-6 font-serif text-[clamp(4.5rem,11vw,10rem)] leading-[0.9] text-ivory">
              {item.title}
            </h1>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ivory/42">
              {item.subtitle}
            </p>
            <p className="mt-7 text-lg leading-9 text-ivory/62">{item.description}</p>
            <blockquote className="mt-9 border-l border-champagne/35 pl-6 font-serif text-2xl italic leading-snug text-ivory/78">
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
