import type { SiteContent } from "@/types/content";

export const fallbackContent: SiteContent = {
  settings: {
    siteTitle: "XLR Photographie",
    siteDescription: "Chapitres photographiques éditoriaux, sobres et intemporels.",
    heroEyebrow: "Carnet photographique",
    heroTitle: "Les chapitres",
    heroAccent: "silencieux",
    heroDescription: "Séries d’auteur, matières urbaines, lumière retenue et instants suspendus.",
    introEyebrow: "Approche",
    introTitle: "Un site pensé comme un beau livre.",
    introText:
      "Chaque série fonctionne comme un chapitre photographique. Les contenus viennent d’un fichier de données central, afin d’ajouter ou modifier les séries sans toucher aux composants.",
    seriesEyebrow: "Sommaire",
    seriesTitle: "Séries",
    seriesText: "Les blocs se remplissent automatiquement dès que des photos externes sont ajoutées.",
    footerText: "Ville · lumière · matière · instants"
  },
  pages: [
    {
      slug: "series",
      title: "Séries",
      label: "Séries",
      href: "/#series",
      order: 1
    },
    {
      slug: "a-propos",
      title: "À propos",
      label: "À propos",
      href: "/a-propos/",
      description: "Présentation de l'approche éditoriale du site XLR Photographie.",
      order: 2
    },
    {
      slug: "contact",
      title: "Contact",
      label: "Contact",
      href: "/contact/",
      description: "Contact XLR Photographie.",
      order: 3
    }
  ],
  series: [
    {
      slug: "ville",
      title: "Ville",
      subtitle: "Lignes, façades, passages",
      description: "Fragments urbains, lignes, façades et passages.",
      quote: "Une lecture graphique de la ville, entre structure et mouvement.",
      order: 1,
      photos: []
    },
    {
      slug: "sur-le-vif",
      title: "Sur le vif",
      subtitle: "Gestes, rencontres, secondes",
      description: "Instants courts, gestes anonymes et scènes aperçues.",
      quote: "Des images prises au bord de l'événement, quand tout tient dans une seconde.",
      order: 2,
      photos: []
    },
    {
      slug: "heure-doree",
      title: "Heure dorée",
      subtitle: "Lumières basses, ombres longues",
      description: "Lumières basses, matières chaudes et ombres longues.",
      quote: "Un chapitre consacré aux transitions, quand la lumière adoucit les formes.",
      order: 3,
      photos: []
    },
    {
      slug: "aube",
      title: "Aube",
      subtitle: "Silence, seuil, premières couleurs",
      description: "Premiers silences, rues vides et couleurs retenues.",
      quote: "Des photographies calmes, composées avant que la ville ne reprenne son rythme.",
      order: 4,
      photos: []
    },
    {
      slug: "details-urbains",
      title: "Détails urbains",
      subtitle: "Matières, traces, surfaces",
      description: "Surfaces, signes, traces et accidents de la matière.",
      quote: "Une attention portée aux petites architectures du quotidien.",
      order: 5,
      photos: []
    },
    {
      slug: "noir-et-blanc",
      title: "Noir & blanc",
      subtitle: "Contrastes, volumes, densités",
      description: "Contrastes, volumes, silences et densités.",
      quote: "Une série pensée pour la ligne, la lumière et les rapports de masse.",
      order: 6,
      photos: []
    }
  ]
};
