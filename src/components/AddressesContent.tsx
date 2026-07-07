"use client";

import { useSiteContent } from "@/components/ContentProvider";

export function AddressesContent() {
  const { content } = useSiteContent();
  const { addresses } = content;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-40 md:px-10 md:pb-28 md:pt-52">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-champagne/68">
          Sélection
        </p>
        <h1 className="mt-7 max-w-4xl font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.92] text-ivory">
          Adresses.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-10 md:pb-44">
        {addresses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {addresses.map((address) => (
              <article className="border border-ivory/10 bg-slate-surface/48 p-7 md:p-9" key={address.id}>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-champagne/62">
                  {address.category ? <span>{address.category}</span> : null}
                  {address.location ? <span>{address.location}</span> : null}
                </div>
                <h2 className="mt-5 font-serif text-4xl leading-none text-ivory md:text-5xl">
                  {address.name}
                </h2>
                {address.description ? (
                  <p className="mt-6 text-[1rem] leading-7 text-ivory/58">{address.description}</p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {address.websiteUrl ? (
                    <a
                      className="border-b border-champagne/40 pb-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ivory/82 transition-colors hover:text-champagne"
                      href={address.websiteUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visiter
                    </a>
                  ) : null}
                  {address.type === "realisation" ? (
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ivory/38">
                      Conception XLR
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="font-serif text-4xl text-ivory/64 md:text-5xl">Adresses à venir.</p>
        )}
      </section>
    </main>
  );
}
