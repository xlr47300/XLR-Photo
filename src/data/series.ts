export type Photo = {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  location?: string;
};

export type PhotoSeries = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  photos: Photo[];
};

export const series: PhotoSeries[] = [
  {
    slug: "ville",
    title: "Ville",
    subtitle: "Lignes, façades, passages",
    description: "Fragments urbains, lignes, façades et passages.",
    quote: "Une lecture graphique de la ville, entre structure et mouvement.",
    photos: []
  },
  {
    slug: "sur-le-vif",
    title: "Sur le vif",
    subtitle: "Gestes, rencontres, secondes",
    description: "Instants courts, gestes anonymes et scènes aperçues.",
    quote: "Des images prises au bord de l'événement, quand tout tient dans une seconde.",
    photos: []
  },
  {
    slug: "heure-doree",
    title: "Heure dorée",
    subtitle: "Lumières basses, ombres longues",
    description: "Lumières basses, matières chaudes et ombres longues.",
    quote: "Un chapitre consacré aux transitions, quand la lumière adoucit les formes.",
    photos: []
  },
  {
    slug: "aube",
    title: "Aube",
    subtitle: "Silence, seuil, premières couleurs",
    description: "Premiers silences, rues vides et couleurs retenues.",
    quote: "Des photographies calmes, composées avant que la ville ne reprenne son rythme.",
    photos: []
  },
  {
    slug: "details-urbains",
    title: "Détails urbains",
    subtitle: "Matières, traces, surfaces",
    description: "Surfaces, signes, traces et accidents de la matière.",
    quote: "Une attention portée aux petites architectures du quotidien.",
    photos: []
  },
  {
    slug: "noir-et-blanc",
    title: "Noir & blanc",
    subtitle: "Contrastes, volumes, densités",
    description: "Contrastes, volumes, silences et densités.",
    quote: "Une série pensée pour la ligne, la lumière et les rapports de masse.",
    photos: []
  }
];

export function getSeriesBySlug(slug: string) {
  return series.find((item) => item.slug === slug);
}

export const totalPhotoCount = series.reduce((count, item) => count + item.photos.length, 0);
