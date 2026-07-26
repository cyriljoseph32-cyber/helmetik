import { site } from "@/content/site";
import { plans, currency } from "@/content/pricing";
import { liveLocations } from "@/content/locations";
import { faqIds } from "@/content/faq";
import type { Dictionary } from "@/i18n/types";
import { siteUrl } from "@/lib/seo";

/** LocalBusiness / AutomotiveBusiness with real Offers. No fake data. */
export function localBusinessSchema() {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${base}/#business`,
    name: site.name,
    description: `${site.descriptor} in ${site.city}, ${site.country}.`,
    url: base,
    telephone: site.phone.e164,
    email: site.email,
    areaServed: { "@type": "Place", name: `${site.city}, ${site.country}` },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    makesOffer: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.id,
      price: plan.price,
      priceCurrency: currency,
      category: "Helmet cleaning",
    })),
  };
}

/** One Place per REAL machine (demo entries excluded). */
export function placesSchema() {
  return liveLocations.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "Place",
    name: loc.hostName,
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.area,
      addressCountry: site.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.lat,
      longitude: loc.lng,
    },
  }));
}

/** Service schema. */
export function serviceSchema(dict: Dictionary) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Helmet cleaning",
    provider: { "@id": `${base}/#business` },
    areaServed: `${site.city}, ${site.country}`,
    description: dict.meta.home.description,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      price: plan.price,
      priceCurrency: currency,
    })),
  };
}

/** FAQPage from the localized dictionary. */
export function faqSchema(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqIds.map((id) => ({
      "@type": "Question",
      name: dict.faq[id].q,
      acceptedAnswer: { "@type": "Answer", text: dict.faq[id].a },
    })),
  };
}

/** Serializable <script> payload helper. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data);
}
