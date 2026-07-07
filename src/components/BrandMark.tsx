import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link className="group inline-flex items-center gap-4" href="/" aria-label="XLR Photographie">
      <span className="relative grid size-12 place-items-center rounded-full border border-ivory/20 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/80 transition-colors duration-300 group-hover:border-champagne/45 group-hover:text-ivory">
        XLR
        <span className="absolute bottom-2 right-2 size-1 rounded-full bg-champagne/80" />
      </span>
      {!compact ? (
        <span className="hidden sm:block">
          <span className="block font-serif text-xl leading-none tracking-[0.08em] text-ivory">
            XLR
          </span>
          <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.32em] text-ivory/45">
            Photographie
          </span>
        </span>
      ) : null}
    </Link>
  );
}
