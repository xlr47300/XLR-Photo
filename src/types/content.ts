export type Photo = {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  date?: string;
  location?: string;
  order: number;
};

export type PhotoSeries = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  order: number;
  photos: Photo[];
};

export type PageLink = {
  slug: string;
  title: string;
  label: string;
  href: string;
  description?: string;
  order: number;
};

export type Address = {
  id: string;
  name: string;
  category?: string;
  location?: string;
  description?: string;
  websiteUrl?: string;
  type?: string;
  order: number;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  introEyebrow: string;
  introTitle: string;
  introText: string;
  seriesEyebrow: string;
  seriesTitle: string;
  seriesText: string;
  statsLabel: string;
  aboutTitle: string;
  aboutTextOne: string;
  aboutTextTwo: string;
  contactTitle: string;
  contactText: string;
  contactEmail: string;
  footerText: string;
};

export type SiteContent = {
  settings: SiteSettings;
  pages: PageLink[];
  series: PhotoSeries[];
  addresses: Address[];
};
