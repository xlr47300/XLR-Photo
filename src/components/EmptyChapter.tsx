type EmptyChapterProps = {
  title?: string;
  className?: string;
};

export function EmptyChapter({ title, className = "" }: EmptyChapterProps) {
  return (
    <div
      className={`relative grid min-h-[22rem] overflow-hidden border border-ivory/10 bg-slate-surface/80 p-8 shadow-book md:p-12 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,112,132,0.28),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(235,227,211,0.055),transparent_44%)]" />
      <div className="relative z-10 self-center">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-champagne/75">
          Chapitre prêt
        </p>
        <p className="mt-5 max-w-md font-serif text-3xl leading-tight text-ivory/70 md:text-5xl">
          {title
            ? `${title} attend vos photographies.`
            : "Cette série attend vos photographies."}
        </p>
        <p className="mt-7 max-w-sm text-sm leading-7 text-ivory/42">
          Ajoutez plus tard des URL Google Drive, Cloudflare R2, Google Sheets ou tout autre
          stockage externe dans le fichier de données.
        </p>
      </div>
    </div>
  );
}
