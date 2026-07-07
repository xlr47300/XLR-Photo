import { cache } from "react";
import { fallbackContent } from "@/data/series";
import { parseCsv, type SheetRow } from "@/lib/csv";
import type { PageLink, Photo, PhotoSeries, SiteContent, SiteSettings } from "@/types/content";

const REQUIRED_SHEETS = ["SETTINGS", "SERIES", "PHOTOS", "PAGES"] as const;
const DEFAULT_GOOGLE_SHEET_ID = "1QDAiDs7yzFg_zZqzrQU-FReYWLiKllKU70f-IYVNFyc";
const DEFAULT_GOOGLE_SHEET_MODE = "remote";

type SheetName = (typeof REQUIRED_SHEETS)[number];

type SheetRows = Record<SheetName, SheetRow[]>;

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const sheetMode = process.env.GOOGLE_SHEET_MODE ?? DEFAULT_GOOGLE_SHEET_MODE;
  const sheetId = process.env.GOOGLE_SHEET_ID ?? DEFAULT_GOOGLE_SHEET_ID;

  if (sheetMode !== "remote" || !sheetId) {
    return fallbackContent;
  }

  try {
    const rows = await fetchGoogleSheetRows(sheetId);
    return buildContentFromRows(rows);
  } catch (error) {
    console.warn("Google Sheet unavailable, using local fallback.", error);
    return fallbackContent;
  }
});

export async function fetchGoogleSheetRows(sheetId: string): Promise<SheetRows> {
  const entries = await Promise.all(
    REQUIRED_SHEETS.map(async (sheetName) => {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
      const response = await fetch(url, { cache: "force-cache" });

      if (!response.ok) {
        throw new Error(`Unable to read ${sheetName}: ${response.status}`);
      }

      const csv = await response.text();
      return [sheetName, parseCsv(csv)] as const;
    })
  );

  return Object.fromEntries(entries) as SheetRows;
}

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

function buildSeries(rows: SheetRow[], photos: Photo[]): PhotoSeries[] {
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
          .filter((photo) => photoSeriesSlug(photo) === slug)
          .sort((a, b) => a.order - b.order)
      };
    })
    .filter((item) => item.slug)
    .sort((a, b) => a.order - b.order);
}

function buildPhotos(rows: SheetRow[]): Photo[] {
  return rows
    .filter(isActive)
    .map((row, index) => ({
      id: read(row, "id") || `${read(row, "seriesSlug")}-${index + 1}`,
      title: read(row, "title") || "Sans titre",
      src: read(row, "src"),
      alt: read(row, "alt") || read(row, "title") || "Photographie",
      caption: optional(read(row, "caption")),
      credit: optional(read(row, "credit")),
      date: optional(read(row, "date")),
      location: optional(read(row, "location")),
      order: toOrder(read(row, "order"), index + 1),
      seriesSlug: read(row, "seriesSlug")
    }))
    .filter((photo) => photo.src && photoSeriesSlug(photo));
}

function buildPages(rows: SheetRow[]): PageLink[] {
  const pages = rows
    .filter(isActive)
    .map((row, index) => ({
      slug: read(row, "slug"),
      title: read(row, "title") || read(row, "label") || read(row, "slug"),
      label: read(row, "label") || read(row, "title") || read(row, "slug"),
      href: read(row, "href") || hrefForPage(read(row, "slug")),
      description: optional(read(row, "description")),
      order: toOrder(read(row, "order"), index + 1)
    }))
    .filter((page) => page.slug && page.href)
    .sort((a, b) => a.order - b.order);

  return pages.length > 0 ? pages : fallbackContent.pages;
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

function photoSeriesSlug(photo: Photo & { seriesSlug?: string }) {
  return photo.seriesSlug ?? "";
}
