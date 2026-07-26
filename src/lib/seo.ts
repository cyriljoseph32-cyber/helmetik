import type { Metadata } from "next";
import { locales, localeHtmlLang, defaultLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";

/** Absolute site URL (no trailing slash). */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://helmetik.com";
  return raw.replace(/\/$/, "");
}

/**
 * Build per-page, per-locale metadata with correct canonical + hreflang
 * alternates for every supported locale (fixing the old site's missing/broken
 * i18n SEO).
 */
export function buildMetadata({
  locale,
  route,
  title,
  description,
  keywords,
}: {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const base = siteUrl();
  const path = href(locale, route);
  const canonical = `${base}${path}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHtmlLang[l]] = `${base}${href(l, route)}`;
  }
  languages["x-default"] = `${base}${href(defaultLocale, route)}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: "Helmetik",
      title,
      description,
      url: canonical,
      locale: localeHtmlLang[locale],
      images: [
        {
          url: `${base}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "Helmetik — Automated Helmet Cleaning, Koh Samui",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/opengraph-image`],
    },
  };
}
