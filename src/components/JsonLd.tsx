import { site } from "@/lib/site";
import { products, statusLabel, type Product } from "@/data/products";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Person + ProfessionalService — rendered once, in the root layout. */
export function PersonJsonLd() {
  const sameAs = Object.values(site.socials);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        url: site.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: `${site.name} — ${site.role}`,
        description: site.description,
        url: site.url,
        email: `mailto:${site.email}`,
        founder: { "@id": `${site.url}/#person` },
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
        sameAs,
      },
    ],
  };
  return <JsonLdScript data={data} />;
}

/** SoftwareApplication list — rendered on /products. */
export function ProductsJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p: Product, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.solution,
        url: p.liveUrl ?? `${site.url}/products#${p.slug}`,
        applicationCategory: "BusinessApplication",
        creativeWorkStatus: statusLabel[p.status],
        author: { "@id": `${site.url}/#person` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Custom builds — contact for scope and pricing.",
        },
      },
    })),
  };
  return <JsonLdScript data={data} />;
}
