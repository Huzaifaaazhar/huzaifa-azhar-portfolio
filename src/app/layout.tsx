import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { PersonJsonLd } from "@/components/JsonLd";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} -- ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.headline} ${site.description}`,
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
      className={`${kanit.variable} h-full antialiased`}
      style={{ backgroundColor: "#0C0C0C" }}
    >
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
