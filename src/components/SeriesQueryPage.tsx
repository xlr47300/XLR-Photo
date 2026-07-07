"use client";

import { useSearchParams } from "next/navigation";
import { SeriesDetailContent } from "@/components/SeriesDetailContent";

export function SeriesQueryPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  return <SeriesDetailContent slug={slug} />;
}
