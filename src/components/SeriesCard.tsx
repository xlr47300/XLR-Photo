import Link from "next/link";
import { EmptyChapter } from "@/components/EmptyChapter";
import type { PhotoSeries } from "@/types/content";

type SeriesCardProps = {
  item: PhotoSeries;
  index: number;
};

export function SeriesCard({ item, index }: SeriesCardProps) {
  const photos = item.photos.filter((photo) => photo.src);
  const firstPhoto = photos[0];

  return (
    <article className="group grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.82fr)] md:gap-16 md:pt-16 even:md:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]">
      <Link
        className="relative block overflow-hidden even:md:order-2"
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
          <EmptyChapter title={item.title} className="md:min-h-[30rem]" />
        )}
      </Link>
      <div className="flex flex-col justify-center pb-4 md:pb-0">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-champagne/62">
          Chapitre {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-6 font-serif text-5xl leading-none text-ivory md:text-7xl">
          {item.title}
        </h3>
        <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-ivory/42">
          {item.subtitle}
        </p>
        <p className="mt-8 max-w-md text-[1.02rem] leading-8 text-ivory/62">{item.description}</p>
        {photos.length > 0 ? (
          <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ivory/34">
            {photos.length} photographie{photos.length > 1 ? "s" : ""}
          </p>
        ) : null}
        <Link
          className="mt-9 inline-flex w-fit border-b border-champagne/40 pb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ivory/88 transition-colors duration-300 hover:text-champagne"
          href={`/series/${item.slug}/`}
        >
          Ouvrir le chapitre
        </Link>
      </div>
    </article>
  );
}
