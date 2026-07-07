import { cache } from "react";
import { fallbackContent } from "@/data/series";
import { parseCsv } from "@/lib/csv";
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_MODE, REQUIRED_SHEETS } from "@/lib/contentConfig";
import { buildContentFromRows, getPhotoCount, getSeriesBySlug, type SheetRows } from "@/lib/contentTransform";
import type { SiteContent } from "@/types/content";

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const sheetMode = process.env.GOOGLE_SHEET_MODE ?? GOOGLE_SHEET_MODE;
  const sheetId = process.env.GOOGLE_SHEET_ID ?? GOOGLE_SHEET_ID;

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
        if (sheetName === "ADRESSES") {
          return [sheetName, []] as const;
        }

        throw new Error(`Unable to read ${sheetName}: ${response.status}`);
      }

      const csv = await response.text();
      return [sheetName, parseCsv(csv)] as const;
    })
  );

  return Object.fromEntries(entries) as SheetRows;
}
export { getPhotoCount, getSeriesBySlug };
