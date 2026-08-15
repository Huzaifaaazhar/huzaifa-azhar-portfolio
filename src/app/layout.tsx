import type { Metadata, Viewport } from "next";
import { Kanit, Playfair_Display, JetBrains_Mono, Alex_Brush } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { PersonJsonLd } from "@/components/JsonLd";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alexbrush",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} -- ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI consultant",
    "AI product development",
    "AI consulting services",
    "vertical AI solutions",
    "custom AI development",
    "AI automation consultant",
    "AI consultant for small business",
    "computer vision consultant",
    "AI compliance solutions",
    "logistics AI consultant",
    "healthcare AI product development",
    "fintech AI automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} -- ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} -- ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0C",
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
      className={`${kanit.variable} ${playfair.variable} ${jetbrainsMono.variable} ${alexBrush.variable} h-full antialiased`}
      style={{ backgroundColor: "#0C0C0C" }}
    >
      <head>
        {/* Scroll reveals start hidden and are un-hidden by JS, so without
            JS the page would render blank. */}
        <noscript>
          <style>{`.fade-in{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${kanit.className} min-h-full`}
        style={{ backgroundColor: "#0C0C0C" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-bg-2 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <main id="main" style={{ overflowX: "clip" }}>
          {children}
        </main>
        <PersonJsonLd />
      </body>
    </html>
  );
}
