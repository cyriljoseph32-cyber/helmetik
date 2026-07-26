import { plans, comparisonFeatures, currency } from "@/content/pricing";
import type { Dictionary } from "@/i18n/types";

/** Honest feature-by-feature comparison, driven by the single pricing source. */
export function ComparisonTable({ dict }: { dict: Dictionary }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">{dict.pricing.compareHeading}</caption>
        <thead>
          <tr className="border-b border-marine-line">
            <th
              scope="col"
              className="py-4 pr-4 text-sm font-semibold text-cement"
            >
              {dict.pricing.featureCol}
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className={`py-4 px-4 text-center ${
                  plan.featured ? "text-uv" : "text-clinical"
                }`}
              >
                <span className="block font-display text-lg font-bold">
                  {dict.plans[plan.id].name}
                </span>
                <span className="tnum block text-sm font-normal text-cement">
                  {plan.price} {currency}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((feature) => (
            <tr key={feature} className="border-b border-marine-line">
              <th
                scope="row"
                className="py-3.5 pr-4 text-sm font-medium text-clinical"
              >
                {dict.features[feature]}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className="px-4 py-3.5 text-center">
                  {feature === "duration" ? (
                    <span className="tnum text-sm font-semibold text-clinical">
                      {plan.minutes} {dict.common.minutesShort}
                    </span>
                  ) : plan.features[feature] ? (
                    <span className="inline-flex text-lime" aria-label={dict.common.included}>
                      <CheckIcon />
                    </span>
                  ) : (
                    <span
                      className="inline-flex text-cement/40"
                      aria-label={dict.common.notIncluded}
                    >
                      <DashIcon />
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
