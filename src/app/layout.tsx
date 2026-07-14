import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PersonJsonLd } from "@/components/JsonLd";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.headline} ${site.description}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05080F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-bg-2 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {/* Decorative cosmos layer — the WebGL galaxy mounts here in Phase 4. */}
        <div className="aurora-backdrop" aria-hidden="true" />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <PersonJsonLd />
      </body>
    </html>
  );
}
