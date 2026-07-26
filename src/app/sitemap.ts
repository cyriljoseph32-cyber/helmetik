import type { MetadataRoute } from "next";
import { locales, localeHtmlLang, defaultLocale } from "@/i18n/config";
import { routes, href, type RouteKey } from "@/i18n/routes";
import { siteUrl } from "@/lib/seo";

/** Multilingual sitemap with hreflang alternates for every route × locale. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const keys = Object.keys(routes) as RouteKey[];
  const entries: MetadataRoute.Sitemap = [];

  for (const key of keys) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[localeHtmlLang[l]] = `${base}${href(l, key)}`;
      }
      entries.push({
        url: `${base}${href(locale, key)}`,
        lastModified: new Date(),
        changeFrequency: key === "locations" ? "weekly" : "monthly",
        priority: key === "home" ? 1 : key === "locations" ? 0.9 : 0.7,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${base}${href(defaultLocale, key)}`,
          },
        },
      });
    }
  }

  return entries;
}
