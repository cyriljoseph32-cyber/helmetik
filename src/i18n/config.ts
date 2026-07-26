/**
 * i18n configuration — single source of truth for supported locales.
 *
 * A locale is exposed to visitors ONLY when its dictionary is complete
 * (see `src/i18n/dictionaries`). This is the exact defect of the old site,
 * which shipped empty FR/ES/TH shells; we never link an incomplete locale.
 */
export const locales = ["en", "th", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  fr: "Français",
};

/** Short label shown in the compact language switcher. */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  fr: "FR",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  th: "th",
  fr: "fr",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
