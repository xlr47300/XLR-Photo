import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const navigation = [
  { href: "/#series", label: "Séries" },
  { href: "/a-propos/", label: "À propos" },
  { href: "/contact/", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-5 md:px-10 md:py-7">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-8">
        <BrandMark />
        <nav
          className="flex flex-wrap justify-end gap-x-6 gap-y-2 pt-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-ivory/45 md:gap-x-9"
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <Link
              className="transition-colors duration-300 hover:text-ivory"
              key={item.href}
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
