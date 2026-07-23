import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ContentProvider } from "@/components/ContentProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fallbackContent } from "@/data/series";
import { getSiteContent } from "@/lib/siteContent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xlr-photo.pages.dev"),
  title: fallbackContent.settings.siteTitle,
  description: fallbackContent.settings.siteDescription,
  applicationName: "XLR Photographie",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "XLR Photographie",
    title: fallbackContent.settings.siteTitle,
    description: fallbackContent.settings.siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "XLR Photographie"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: fallbackContent.settings.siteTitle,
    description: fallbackContent.settings.siteDescription,
    images: ["/opengraph-image"]
  },
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
