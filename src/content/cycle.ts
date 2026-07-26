/**
 * The cleaning cycle — structural data. Copy (labels/descriptions) comes from
 * the i18n dictionaries keyed by these ids, so the sequence stays
 * language-independent. Durations are indicative and marked as such in copy.
 */

/** The 4-beat hero animation: Disinfect → Deodorize → Dry → Done. */
export const heroCycleSteps = [
  "disinfect",
  "deodorize",
  "dry",
  "done",
] as const;
export type HeroCycleStep = (typeof heroCycleSteps)[number];

/** The full technical sequence for the How It Works page. */
export const fullCycleSteps = [
  "insert",
  "uv",
  "foam",
  "deodorize",
  "dry",
  "collect",
] as const;
export type FullCycleStep = (typeof fullCycleSteps)[number];

/** What the cycle treats — and what it does not (honest scope). */
export const cleanScope = {
  cleans: ["outerShell", "innerFoam", "strap", "padding"] as const,
  limits: ["removableLiner", "visorSeparate", "electronics"] as const,
};

/** Helmet types the machine accepts, with honest limits. */
export const compatibility = [
  "fullFace",
  "modular",
  "openFace",
  "motocross",
  "bicycle",
] as const;
export type HelmetType = (typeof compatibility)[number];
