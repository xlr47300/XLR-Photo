import Link from "next/link";
import type { PhotoSeries } from "@/data/series";
import { EmptyChapter } from "@/components/EmptyChapter";

type SeriesCardProps = {
  item: PhotoSeries;
  index: number;
};

export function SeriesCard({ item, index }: SeriesCardProps) {
  const photos = item.photos.filter((photo) => photo.src);
  const firstPhoto = photos[0];

  return (
    <article className="grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] md:gap-14 md:pt-16 even:md:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.25fr)]">
      <Link
        className="group relative block overflow-hidden even:md:order-2"
        href={`/series/${item.slug}/`}
      >
        {firstPhoto ? (
          <img
            className="aspect-[16/10] h-full w-full object-cover grayscale-[18%] transition duration-700 group-hover:scale-[1.025] group-hover:brightness-75"
            src={firstPhoto.src}
            alt={firstPhoto.alt}
            loading={index < 2 ? "eager" : "lazy"}
          />
        ) : (
          <EmptyChapter title={item.title} />
        )}
      </Link>
      <div className="flex flex-col justify-center pb-4 md:pb-0">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-champagne/55">
          № {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-6 font-serif text-5xl leading-none text-ivory md:text-7xl">
          {item.title}
        </h3>
        <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ivory/35">
          {item.subtitle}
        </p>
        <p className="mt-8 max-w-md text-base leading-8 text-ivory/55">{item.description}</p>
        <Link
          className="mt-9 inline-flex w-fit border-b border-champagne/40 pb-2 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ivory transition-colors duration-300 hover:text-champagne"
          href={`/series/${item.slug}/`}
        >
          Ouvrir le chapitre
        </Link>
      </div>
    </article>
  );
}
