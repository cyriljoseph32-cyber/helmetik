/**
 * FAQ — structural ids only. Question/answer text lives in the i18n
 * dictionaries (keyed by id) so every language is hand-written natively.
 * These ids also drive the schema.org FAQPage markup.
 *
 * No unproven sanitary claims: we describe "UV-C disinfection cycle + 3D foam
 * treatment", never "kills 99.9% of germs" (that requires a citable lab test /
 * manufacturer sheet, which is a NEEDS-CLIENT-DATA item).
 */
export const faqIds = [
  "frequency",
  "wetHelmet",
  "bluetooth",
  "kidsHelmet",
  "howLong",
  "whatCleaned",
  "germClaim",
] as const;

export type FaqId = (typeof faqIds)[number];
