# XLR Photographie

Projet Next.js App Router + TypeScript + Tailwind CSS, conçu comme un beau livre photographique.

Direction artistique : bleu nuit grisé, noir intemporel, ivoire chaud, accent champagne/cuivre discret, chapitres éditoriaux et beaucoup d’espace.

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
- Root directory : vide si `package.json` est à la racine du dépôt

`next.config.ts` utilise `output: "export"` pour générer un site statique compatible Cloudflare Pages via GitHub.

## Source de données

Le site peut fonctionner de deux façons :

- `local` : utilise le fallback dans `src/data/series.ts`
- `remote` : lit un Google Sheet publié sur le web pendant le build

Le Google Sheet actuel est déjà configuré dans `src/lib/siteContent.ts` :

```txt
1QDAiDs7yzFg_zZqzrQU-FReYWLiKllKU70f-IYVNFyc
```

Donc Cloudflare peut fonctionner sans variable d’environnement si ce Sheet reste le bon.

Copiez `.env.example` vers `.env.local` pour tester en local :

```bash
GOOGLE_SHEET_ID=1QDAiDs7yzFg_zZqzrQU-FReYWLiKllKU70f-IYVNFyc
GOOGLE_SHEET_MODE=remote
```

Pour changer de Sheet sans modifier le code, ajoutez ou remplacez ces variables dans Cloudflare Pages :

`Settings -> Environment variables`

```txt
GOOGLE_SHEET_ID=identifiant_du_google_sheet
GOOGLE_SHEET_MODE=remote
```

Si le Google Sheet n’est pas configuré, inaccessible ou incomplet, le site utilise automatiquement les données locales.

## Publier le Google Sheet

Dans Google Sheets :

1. Créez un fichier avec les onglets `SETTINGS`, `SERIES`, `PHOTOS`, `PAGES`
2. Allez dans `Fichier -> Partager -> Publier sur le Web`
3. Publiez le document
4. Copiez l’identifiant du Sheet depuis l’URL

Exemple d’URL :

```txt
https://docs.google.com/spreadsheets/d/GOOGLE_SHEET_ID/edit
```

## Onglet SETTINGS

Colonnes :

```txt
active | key | value
```

Clés disponibles :

```txt
siteTitle
siteDescription
heroEyebrow
heroTitle
heroAccent
heroDescription
introEyebrow
introTitle
introText
seriesEyebrow
seriesTitle
seriesText
footerText
```

Exemple :

```txt
TRUE | heroTitle | Les chapitres
TRUE | heroAccent | silencieux
```

## Onglet SERIES

Colonnes :

```txt
active | order | slug | title | subtitle | description | quote
```

Exemple :

```txt
TRUE | 1 | ville | Ville | Lignes, façades, passages | Fragments urbains, lignes, façades et passages. | Une lecture graphique de la ville.
```

`slug` sert à générer l’URL de la série.

## Onglet PHOTOS

Colonnes :

```txt
active | order | seriesSlug | id | title | src | alt | caption | credit | date | location
```

Exemple :

```txt
TRUE | 1 | ville | rue-au-matin | Rue au matin | https://... | Rue photographiée au matin | Lumière froide sur les façades | XLR Photographie | 2026 | Paris
```

Les photos ne sont pas stockées dans le projet. Le champ `src` peut pointer vers Google Drive, Cloudflare R2, un CDN ou un autre stockage externe.

## Onglet PAGES

Colonnes :

```txt
active | order | slug | title | label | href | description
```

Exemple :

```txt
TRUE | 1 | series | Séries | Séries | /#series | Les séries photographiques
TRUE | 2 | a-propos | À propos | À propos | /a-propos/ | Présentation
TRUE | 3 | contact | Contact | Contact | /contact/ | Contact
```

Si `active` vaut `FALSE`, `0`, `no`, `non` ou `inactive`, la ligne est ignorée.

## Ordre et visibilité

- Les séries sont triées avec la colonne `order`
- Les photos sont associées avec `seriesSlug`
- Les photos sont triées avec `order`
- Les lignes inactives sont ignorées
- Les champs vides sont remplacés par des valeurs sûres ou ignorés selon le cas
