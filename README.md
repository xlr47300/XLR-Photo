# XLR Photographie

Projet Next.js App Router + TypeScript + Tailwind CSS, reconstruit à partir de la direction artistique du fichier Claude Design.

Le site est organisé comme un beau livre photographique : ambiance bleu nuit grisé, ivoire chaud, accent champagne, chapitres éditoriaux et beaucoup d’espace.

## Développement

```bash
npm install
npm run dev
```

## Vérification

```bash
npm run lint
npm run build
```

## Cloudflare Pages

- Build command : `npm run build`
- Output directory : `out`

`next.config.ts` utilise `output: "export"` pour générer un site statique compatible Cloudflare Pages via GitHub.

## Modifier les séries

Toutes les séries sont centralisées dans `src/data/series.ts`.

Exemple :

```ts
{
  slug: "ville",
  title: "Ville",
  subtitle: "Lignes, façades, passages",
  description: "Fragments urbains, lignes, façades et passages.",
  quote: "Une lecture graphique de la ville, entre structure et mouvement.",
  photos: [
    {
      id: "rue-au-matin",
      title: "Rue au matin",
      src: "LIEN_IMAGE_GOOGLE_DRIVE_OU_R2",
      alt: "Rue photographiée au matin",
      caption: "Lumière froide sur les façades"
    }
  ]
}
```

Les photographies ne sont pas stockées dans le projet. Le champ `src` peut pointer vers Google Drive, Google Sheets, Cloudflare R2, un CDN ou un autre stockage externe.
