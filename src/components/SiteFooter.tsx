"use client";

import { BrandMark } from "@/components/BrandMark";
import { useSiteContent } from "@/components/ContentProvider";

export function SiteFooter() {
  const { content } = useSiteContent();

  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-ivory/10 px-5 py-10 text-ivory/45 md:flex-row md:items-end md:justify-between md:px-10">
      <BrandMark compact />
      <div className="max-w-sm font-mono text-[0.62rem] uppercase tracking-[0.24em]">
        <p>Chapitres photographiques</p>
        <p className="mt-2 text-ivory/32">{content.settings.footerText}</p>
      </div>
    </footer>
  );
}
