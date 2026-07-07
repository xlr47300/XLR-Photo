"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { parseCsv } from "@/lib/csv";
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_MODE, REQUIRED_SHEETS } from "@/lib/contentConfig";
import { buildContentFromRows, type SheetName, type SheetRows } from "@/lib/contentTransform";
import type { SiteContent } from "@/types/content";

type ContentContextValue = {
  content: SiteContent;
  isLive: boolean;
};

const ContentContext = createContext<ContentContextValue | null>(null);

type ContentProviderProps = {
  children: ReactNode;
  initialContent: SiteContent;
};

export function ContentProvider({ children, initialContent }: ContentProviderProps) {
  const [content, setContent] = useState(initialContent);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (GOOGLE_SHEET_MODE !== "remote" || !GOOGLE_SHEET_ID) {
      return;
    }

    let cancelled = false;

    async function loadLiveContent() {
      try {
        const rows = await fetchBrowserSheetRows(GOOGLE_SHEET_ID);

        if (!cancelled) {
          setContent(buildContentFromRows(rows));
          setIsLive(true);
        }
      } catch (error) {
        console.warn("Live Google Sheet unavailable, keeping static content.", error);
      }
    }

    loadLiveContent();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ content, isLive }), [content, isLive]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const value = useContext(ContentContext);

  if (!value) {
    throw new Error("useSiteContent must be used inside ContentProvider.");
  }

  return value;
}

async function fetchBrowserSheetRows(sheetId: string): Promise<SheetRows> {
  const cacheBuster = Date.now();
  const entries = await Promise.all(
    REQUIRED_SHEETS.map(async (sheetName) => {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&cache=${cacheBuster}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Unable to read ${sheetName}: ${response.status}`);
      }

      const csv = await response.text();
      return [sheetName, parseCsv(csv)] as [SheetName, ReturnType<typeof parseCsv>];
    })
  );

  return Object.fromEntries(entries) as SheetRows;
}
