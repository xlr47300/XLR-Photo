import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContentProvider } from "@/components/ContentProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fallbackContent } from "@/data/series";
import { getSiteContent } from "@/lib/siteContent";
import "./globals.css";

export const metadata: Metadata = {
  title: fallbackContent.settings.siteTitle,
  description: fallbackContent.settings.siteDescription
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const content = await getSiteContent();

  return (
    <html lang="fr">
      <body>
        <ContentProvider initialContent={content}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ContentProvider>
      </body>
    </html>
  );
}
