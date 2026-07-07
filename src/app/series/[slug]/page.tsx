import { notFound } from "next/navigation";
import { SeriesDetailContent } from "@/components/SeriesDetailContent";
import { getSeriesBySlug, getSiteContent } from "@/lib/siteContent";

type SeriesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getSiteContent().then((content) => content.series.map((item) => ({ slug: item.slug })));
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const item = getSeriesBySlug(content, slug);

  return {
    title: item ? `${item.title} | ${content.settings.siteTitle}` : "Série introuvable",
    description: item?.description
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const item = getSeriesBySlug(content, slug);

  if (!item) {
    notFound();
  }

  return <SeriesDetailContent slug={slug} initialSeries={item} />;
}
