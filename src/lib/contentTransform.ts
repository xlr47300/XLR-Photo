import { fallbackContent } from "@/data/series";
import type { SheetRow } from "@/lib/csv";
import type { PageLink, Photo, PhotoSeries, SiteContent, SiteSettings } from "@/types/content";
import { REQUIRED_SHEETS } from "@/lib/contentConfig";

export type SheetName = (typeof REQUIRED_SHEETS)[number];
export type SheetRows = Record<SheetName, SheetRow[]>;

export function buildContentFromRows(rows: SheetRows): SiteContent {
  const settings = buildSettings(rows.SETTINGS);
  const photos = buildPhotos(rows.PHOTOS);
  const series = buildSeries(rows.SERIES, photos);
  const pages = buildPages(rows.PAGES);

  return { settings, pages, series };
}

export function getSeriesBySlug(content: SiteContent, slug: string) {
  return content.series.find((item) => item.slug === slug);
}

export function getPhotoCount(content: SiteContent) {
  return content.series.reduce((count, item) => count + item.photos.length, 0);
}

function buildSettings(rows: SheetRow[]): SiteSettings {
  const remoteSettings = rows.reduce<Partial<SiteSettings>>((result, row) => {
    if (!isActive(row)) {
      return result;
    }

    const key = read(row, "key");
    const value = read(row, "value");

    if (key && value) {
      return { ...result, [key]: value };
    }

    return result;
  }, {});

  return { ...fallbackContent.settings, ...remoteSettings };
}

function buildSeries(rows: SheetRow[], photos: ClientPhoto[]): PhotoSeries[] {
  return rows
    .filter(isActive)
    .map((row, index) => {
      const slug = read(row, "slug");
      const fallback = fallbackContent.series.find((item) => item.slug === slug);

      return {
        slug,
        title: read(row, "title") || fallback?.title || slug,
        subtitle: read(row, "subtitle") || fallback?.subtitle || "",
        description: read(row, "description") || fallback?.description || "",
        quote: read(row, "quote") || fallback?.quote || "",
        order: toOrder(read(row, "order"), fallback?.order ?? index + 1),
        photos: photos
          .filter((photo) => photo.seriesSlug === slug)
          .sort((a, b) => a.order - b.order)
          .map(toPublicPhoto)
      };
    })
    .filter((item) => item.slug)
    .sort((a, b) => a.order - b.order);
}

function toPublicPhoto(photo: ClientPhoto): Photo {
  return {
    id: photo.id,
    title: photo.title,
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
    credit: photo.credit,
    date: photo.date,
    location: photo.location,
    order: photo.order
  };
}

type ClientPhoto = Photo & {
  seriesSlug: string;
};

function buildPhotos(rows: SheetRow[]): ClientPhoto[] {
  return rows
    .filter(isActive)
    .map((row, index) => ({
      id: read(row, "id") || `${read(row, "seriesSlug")}-${index + 1}`,
      title: read(row, "title") || "Sans titre",
      src: normalizeImageUrl(read(row, "src")),
      alt: read(row, "alt") || read(row, "title") || "Photographie",
      caption: optional(read(row, "caption")),
      credit: optional(read(row, "credit")),
      date: optional(read(row, "date")),
      location: optional(read(row, "location")),
      order: toOrder(read(row, "order"), index + 1),
      seriesSlug: read(row, "seriesSlug")
    }))
    .filter((photo) => photo.src && photo.seriesSlug);
}

function buildPages(rows: SheetRow[]): PageLink[] {
  const pages = rows
    .filter(isActive)
    .map((row, index) => {
      const slug = read(row, "slug");

      return {
        slug,
        title: read(row, "title") || read(row, "label") || slug,
        label: read(row, "label") || read(row, "title") || slug,
        href: read(row, "href") || hrefForPage(slug),
        description: optional(read(row, "description")),
        order: toOrder(read(row, "order"), index + 1)
      };
    })
    .filter((page) => page.slug && page.href)
    .sort((a, b) => a.order - b.order);

  return pages.length > 0 ? pages : fallbackContent.pages;
}

function normalizeImageUrl(value: string) {
  const match = value.match(/drive\.google\.com\/file\/d\/([^/]+)/);

  if (match?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return value;
}

function read(row: SheetRow, key: string) {
  return row[key] ?? "";
}

function optional(value: string) {
  return value || undefined;
}

function isActive(row: SheetRow) {
  const value = read(row, "active").toLowerCase();
  return !["false", "0", "no", "non", "inactive"].includes(value);
}

function toOrder(value: string, fallback: number) {
  const order = Number(value);
  return Number.isFinite(order) ? order : fallback;
}

function hrefForPage(slug: string) {
  if (slug === "series") {
    return "/#series";
  }

  return slug ? `/${slug}/` : "";
}
