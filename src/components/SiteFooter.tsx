import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-ivory/10 px-5 py-10 text-ivory/40 md:flex-row md:items-end md:justify-between md:px-10">
      <BrandMark compact />
      <div className="max-w-sm font-mono text-[0.62rem] uppercase tracking-[0.24em]">
        <p>Chapitres photographiques</p>
        <p className="mt-2 text-ivory/25">Ville · lumière · matière · instants</p>
      </div>
    </footer>
  );
}
