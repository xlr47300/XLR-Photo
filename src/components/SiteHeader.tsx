"use client";

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { useSiteContent } from "@/components/ContentProvider";

export function SiteHeader() {
  const { content } = useSiteContent();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-night/25 px-5 py-4 backdrop-blur-sm md:px-10 md:py-7">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-8">
        <BrandMark />
        <nav
          className="flex flex-wrap justify-end gap-x-5 gap-y-2 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ivory/52 md:gap-x-9"
          aria-label="Navigation principale"
        >
          {content.pages.map((item) => (
            <Link
              className="transition-colors duration-300 hover:text-ivory"
              key={item.slug}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
