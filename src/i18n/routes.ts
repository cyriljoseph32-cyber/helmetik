import type { Locale } from "@/i18n/config";

/** Canonical route keys → path segment (locale prefix added by `href`). */
export const routes = {
  home: "",
  howItWorks: "how-it-works",
  locations: "locations",
  pricing: "pricing",
  partners: "host-a-machine",
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
} as const;

export type RouteKey = keyof typeof routes;

/** Build a locale-prefixed href, e.g. href("en","pricing") → "/en/pricing". */
export function href(locale: Locale, key: RouteKey, hash?: string): string {
  const seg = routes[key];
  const base = seg ? `/${locale}/${seg}` : `/${locale}`;
  return hash ? `${base}#${hash}` : base;
}

/** Primary nav order. */
export const navOrder = [
  "howItWorks",
  "locations",
  "pricing",
  "partners",
  "about",
  "contact",
] as const satisfies readonly RouteKey[];
