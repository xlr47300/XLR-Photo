import { Suspense } from "react";
import { SeriesQueryPage } from "@/components/SeriesQueryPage";

export const metadata = {
  title: "Série | XLR Photographie",
  description: "Chapitre photographique XLR Photographie."
};

export default function SeriesPage() {
  return (
    <Suspense fallback={null}>
      <SeriesQueryPage />
    </Suspense>
  );
}
