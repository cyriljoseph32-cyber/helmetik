/**
 * Pricing — SINGLE SOURCE OF TRUTH.
 * The old site contradicted itself (100/150 THB on offers vs 50/100 THB on
 * About). These figures are defined once and reused on Home, Pricing and in
 * the schema.org `Offer` markup. Never hardcode a price in a component.
 *
 * Human-readable labels live in the i18n dictionaries, keyed by `featureId`,
 * so the numbers/structure stay language-independent.
 */

export const currency = "THB" as const;

export type PlanId = "standard" | "premium";

export type FeatureId =
  | "uvCycle"
  | "foam3d"
  | "deodorize"
  | "dry"
  | "duration"
  | "extraFoam"
  | "visorCare"
  | "linerBoost";

export interface Plan {
  id: PlanId;
  /** Price in whole THB. */
  price: number;
  /** Cycle duration in minutes. */
  minutes: number;
  /** Highlighted plan on the pricing grid. */
  featured: boolean;
  /** Which comparison features this plan includes. */
  features: Record<FeatureId, boolean>;
}

/** Ordered list of features shown in the comparison table (rows). */
export const comparisonFeatures: FeatureId[] = [
  "duration",
  "uvCycle",
  "foam3d",
  "deodorize",
  "dry",
  "extraFoam",
  "linerBoost",
  "visorCare",
];

export const plans: Plan[] = [
  {
    id: "standard",
    price: 100,
    minutes: 5,
    featured: false,
    features: {
      duration: true,
      uvCycle: true,
      foam3d: true,
      deodorize: true,
      dry: true,
      extraFoam: false,
      linerBoost: false,
      visorCare: false,
    },
  },
  {
    id: "premium",
    price: 150,
    minutes: 8,
    featured: true,
    features: {
      duration: true,
      uvCycle: true,
      foam3d: true,
      deodorize: true,
      dry: true,
      extraFoam: true,
      linerBoost: true,
      visorCare: true,
    },
  },
];

export const startingPrice = Math.min(...plans.map((p) => p.price));

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/**
 * Accepted payment methods at the machine.
 * NEEDS CLIENT DATA — not published as fact until confirmed. Rendered as a
 * clearly-marked "to confirm" note rather than invented certainty.
 */
export const paymentMethods = {
  confirmed: false,
  candidates: ["cash", "promptpay", "card"] as const,
};
