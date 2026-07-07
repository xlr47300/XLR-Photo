import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ContentProvider } from "@/components/ContentProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fallbackContent } from "@/data/series";
import { getSiteContent } from "@/lib/siteContent";
import "./globals.css";

export const metadata: Metadata = {
  title: fallbackContent.settings.siteTitle,
  description: fallbackContent.settings.siteDescription,
  applicationName: "XLR Photographie",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "XLR"
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#070b11"
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
