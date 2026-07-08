"use client";

import { useSiteContent } from "@/components/ContentProvider";

export function ContactContent() {
  const { content } = useSiteContent();
  const { pages, settings } = content;
  const page = pages.find((item) => item.slug === "contact");

  return (
    <main>
      <section className="mx-auto min-h-svh max-w-7xl px-5 pb-24 pt-40 md:px-10 md:pt-52">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.3em] text-champagne/65">
          {page?.label ?? "Contact"}
        </p>
        <h1 className="mt-7 max-w-4xl font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.92] text-ivory">
          {settings.contactTitle}
        </h1>
        <div className="mt-16 max-w-xl border border-ivory/10 bg-slate-surface/60 p-8 md:p-12">
          <p className="text-lg leading-8 text-ivory/55">{settings.contactText}</p>
          <a
            className="mt-8 block font-serif text-3xl text-ivory transition-colors hover:text-champagne md:text-5xl"
            href={`mailto:${settings.contactEmail}`}
          >
            {settings.contactEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
