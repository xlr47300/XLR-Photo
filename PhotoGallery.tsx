"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EmptyChapter } from "@/components/EmptyChapter";
import { RevealImage } from "@/components/RevealImage";
import type { Photo } from "@/types/content";

type PhotoGalleryProps = {
  photos: Photo[];
  seriesTitle: string;
};

export function PhotoGallery({ photos, seriesTitle }: PhotoGalleryProps) {
  const availablePhotos = useMemo(() => photos.filter((photo) => photo.src), [photos]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryScrollPosition = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activePhoto = activeIndex === null ? null : availablePhotos[activeIndex];

  function openPhoto(index: number) {
    galleryScrollPosition.current = window.scrollY;
    setActiveIndex(index);
  }

  function returnToGallery() {
    const scrollPosition = galleryScrollPosition.current;
    setActiveIndex(null);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  }

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        returnToGallery();
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % availablePhotos.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + availablePhotos.length) % availablePhotos.length
        );
      }
    }

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, availablePhotos.length]);

  if (availablePhotos.length === 0) {
    return <EmptyChapter title={seriesTitle} className="min-h-[24rem] md:min-h-[30rem]" />;
  }

  function goToPrevious() {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + availablePhotos.length) % availablePhotos.length
    );
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % availablePhotos.length
    );
  }

  function startSwipe(event: React.TouchEvent) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function finishSwipe(event: React.TouchEvent) {
    if (!touchStart.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-7">
        {availablePhotos.map((photo, index) => (
          <button
            className="group relative min-h-[22rem] overflow-hidden bg-slate-surface text-left md:col-span-4 md:min-h-[32rem] md:[&:nth-child(5n+1)]:col-span-8 md:[&:nth-child(5n+4)]:col-span-8"
            key={`${photo.id}-${index}`}
            type="button"
            onClick={() => openPhoto(index)}
          >
            <RevealImage
              className="h-full w-full object-cover group-hover:scale-[1.025] group-hover:brightness-75"
              src={photo.src}
              alt={photo.alt}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="absolute inset-x-5 bottom-5 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="block font-serif text-2xl text-ivory">{photo.title}</span>
              {photo.caption ? (
                <span className="mt-1 block text-[0.95rem] leading-6 text-ivory/62">{photo.caption}</span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-night/95 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
        >
          <button
            className="absolute inset-0 cursor-zoom-out"
            type="button"
            aria-label="Retour à la galerie"
            onClick={returnToGallery}
          />
          <div className="relative z-10 grid max-h-[calc(100svh-2rem)] w-full max-w-7xl grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
            <div className="flex items-center justify-between gap-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-ivory/45">
              <p>
                № {String(activeIndex! + 1).padStart(2, "0")} /{" "}
                {String(availablePhotos.length).padStart(2, "0")}
              </p>
              <button className="transition-colors hover:text-ivory" type="button" onClick={returnToGallery}>
                Retour galerie
              </button>
            </div>
            <div
              className="relative flex min-h-0 touch-pan-y items-center justify-center"
              onTouchStart={startSwipe}
              onTouchEnd={finishSwipe}
            >
              <RevealImage
                className="mx-auto max-h-[72svh] w-full object-contain"
                src={activePhoto.src}
                alt={activePhoto.alt}
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-5 border-t border-ivory/10 pt-5 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="font-serif text-3xl text-ivory md:text-5xl">{activePhoto.title}</h2>
                {activePhoto.caption ? (
                  <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-ivory/62">
                    {activePhoto.caption}
                  </p>
                ) : null}
                {activePhoto.credit ? (
                  <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ivory/38">
                    Crédit : {activePhoto.credit}
                  </p>
                ) : null}
              </div>
              {availablePhotos.length > 1 ? (
                <div className="flex gap-3 font-mono text-[0.66rem] uppercase tracking-[0.2em]">
                  <button className="border border-ivory/15 px-4 py-3 text-ivory/70 transition hover:border-champagne/50 hover:text-ivory" type="button" onClick={goToPrevious}>
                    Préc.
                  </button>
                  <button className="border border-ivory/15 px-4 py-3 text-ivory/70 transition hover:border-champagne/50 hover:text-ivory" type="button" onClick={goToNext}>
                    Suiv.
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
