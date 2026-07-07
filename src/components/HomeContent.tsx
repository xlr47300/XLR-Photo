"use client";

import Link from "next/link";
import { SeriesCard } from "@/components/SeriesCard";
import { useSiteContent } from "@/components/ContentProvider";
import { getPhotoCount } from "@/lib/contentTransform";

export function HomeContent() {
  const { content } = useSiteContent();
  const { settings, series } = content;
  const totalPhotoCount = getPhotoCount(content);

  return (
    <main>
      <section className="relative grid min-h-svh place-items-center overflow-hidden px-5 pb-24 pt-36 text-center md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,112,132,0.42),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(7,11,17,0.72)_78%,rgba(7,11,17,0.98)_100%)]" />
        <div className="relative z-10 mx-auto max-w-5xl animate-[fadeUp_1.4s_cubic-bezier(0.22,0.61,0.36,1)_both]">
          <img
            className="mx-auto mb-10 w-56 max-w-[72vw] invert mix-blend-screen opacity-80 md:w-72"
            src="/images/xlr-typo-logo.png"
            alt="XLR Photographie"
          />
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory/48 before:mx-4 before:inline-block before:h-px before:w-8 before:bg-ivory/15 before:align-middle after:mx-4 after:inline-block after:h-px after:w-8 after:bg-ivory/15 after:align-middle">
            {settings.heroEyebrow}
          </p>
          <h1 className="mt-9 font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.9] tracking-normal text-ivory">
            {settings.heroTitle}
            <br />
            <em className="font-normal italic text-champagne">{settings.heroAccent}</em>
          </h1>
          <p className="mx-auto mt-9 max-w-2xl font-serif text-[1.35rem] italic leading-9 text-ivory/66 md:text-2xl">
            {settings.heroDescription}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-7 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ivory/48">
            <span>{series.length} séries</span>
            <span className="text-ivory/18">·</span>
            <span>{totalPhotoCount} photographies</span>
            <span className="text-ivory/18">·</span>
            <span>{settings.statsLabel}</span>
          </div>
          <Link
            className="mt-12 inline-flex border border-ivory/15 px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ivory/82 transition duration-300 hover:border-champagne/50 hover:text-ivory"
            href="#series"
          >
            Entrer
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1fr_1.2fr] md:px-10 md:py-36">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-champagne/68">
            {settings.introEyebrow}
          </p>
          <h2 className="mt-6 max-w-xl font-serif text-5xl leading-none text-ivory md:text-7xl">
            {settings.introTitle}
          </h2>
        </div>
        <p className="max-w-2xl self-end text-lg leading-9 text-ivory/62">{settings.introText}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40" id="series">
        <div className="mb-14 flex flex-col gap-5 border-b border-ivory/10 pb-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-champagne/68">
              {settings.seriesEyebrow}
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-none text-ivory md:text-7xl">
              {settings.seriesTitle}
            </h2>
          </div>
          <p className="max-w-md text-[0.98rem] leading-7 text-ivory/52">{settings.seriesText}</p>
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
