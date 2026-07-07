import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fallbackContent } from "@/data/series";
import "./globals.css";

export const metadata: Metadata = {
  title: fallbackContent.settings.siteTitle,
  description: fallbackContent.settings.siteDescription
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
