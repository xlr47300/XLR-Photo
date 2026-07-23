"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { useSiteContent } from "@/components/ContentProvider";

export function SiteHeader() {
  const { content } = useSiteContent();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    const cleanHref = href.split("#")[0].replace(/\/$/, "") || "/";
    const cleanPathname = pathname.replace(/\/$/, "") || "/";

    if (cleanHref === "/series") {
      return cleanPathname === "/series" || cleanPathname.startsWith("/series/");
    }

    return cleanPathname === cleanHref;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ivory/5 bg-night/78 px-5 py-4 backdrop-blur-md md:px-10 md:py-7">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <BrandMark />
        <button
          className="grid size-12 place-items-center border border-ivory/15 text-ivory/72 md:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="grid gap-1.5">
            <span className={`block h-px w-5 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
        <nav
          className="hidden flex-wrap justify-end gap-x-9 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ivory/52 md:flex"
          aria-label="Navigation principale"
        >
          {content.pages.map((item) => (
            <Link
              className={`relative py-2 transition-colors duration-300 hover:text-ivory ${
                isActive(item.href) ? "text-ivory after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-champagne/70" : ""
              }`}
              key={item.slug}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav
        id="mobile-navigation"
        className={`mx-auto max-w-7xl overflow-hidden transition-[max-height,opacity,padding] duration-300 md:hidden ${
          menuOpen ? "max-h-96 pb-3 pt-5 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
        aria-label="Navigation mobile"
        aria-hidden={!menuOpen}
      >
        <div className="grid border-t border-ivory/10 pt-3 font-mono text-[0.72rem] uppercase tracking-[0.2em]">
          {content.pages.map((item) => (
            <Link
              className={`flex min-h-12 items-center justify-between border-b border-ivory/8 py-3 transition-colors ${
                isActive(item.href) ? "text-champagne" : "text-ivory/65"
              }`}
              key={item.slug}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <span aria-hidden="true">›</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
