import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { th } from "@/i18n/dictionaries/th";
import { fr } from "@/i18n/dictionaries/fr";

const dictionaries: Record<Locale, Dictionary> = { en, th, fr };

/** Synchronous dictionary lookup — all locales are bundled and complete. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
