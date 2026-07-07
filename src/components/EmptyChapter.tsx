type EmptyChapterProps = {
  title?: string;
  className?: string;
};

export function EmptyChapter({ title, className = "" }: EmptyChapterProps) {
  return (
    <div
      className={`relative grid min-h-[18rem] overflow-hidden border border-ivory/10 bg-slate-surface/45 p-7 shadow-book md:min-h-[24rem] md:p-10 ${className}`}
    >
      <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-ivory/12 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,112,132,0.16),transparent_60%)]" />
      <div className="relative z-10 self-end">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-champagne/60">
          À compléter
        </p>
        <p className="mt-4 max-w-sm font-serif text-2xl leading-tight text-ivory/64 md:text-4xl">
          {title ? `${title}, bientôt.` : "Photographies à venir."}
        </p>
        <p className="mt-5 max-w-xs text-sm leading-7 text-ivory/42">
          Les images apparaîtront ici dès que leurs URL seront renseignées dans le Sheet.
        </p>
      </div>
    </div>
  );
}
