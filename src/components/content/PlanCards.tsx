import { Cta } from "@/components/ui/Cta";
import { plans, currency } from "@/content/pricing";
import { href } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/** Two formulas side by side, prices from the single pricing source. */
export function PlanCards({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {plans.map((plan) => {
        const meta = dict.plans[plan.id];
        return (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-lg border p-6 sm:p-8 ${
              plan.featured
                ? "border-uv/50 bg-marine/40"
                : "border-marine-line bg-ink-2"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-uv px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-ink">
                {dict.common.mostPopular}
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-clinical">
              {meta.name}
            </h3>
            <p className="mt-1 text-sm text-cement-2">{meta.summary}</p>

            <div className="mt-6 flex items-end gap-2">
              <span className="tnum font-display text-5xl font-extrabold text-clinical">
                {plan.price}
              </span>
              <span className="mb-1.5 text-sm font-semibold text-cement">
                {currency} · {dict.common.perWash}
              </span>
            </div>
            <p className="tnum mt-1 text-sm text-uv">
              {plan.minutes} {dict.common.minutes}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {(Object.keys(plan.features) as (keyof typeof plan.features)[])
                .filter((f) => f !== "duration" && plan.features[f])
                .map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-clinical"
                  >
                    <CheckIcon />
                    {dict.features[f]}
                  </li>
                ))}
            </ul>

            <Cta
              href={href(locale, "locations")}
              variant={plan.featured ? "primary" : "secondary"}
              className="mt-8 w-full"
            >
              {dict.common.findNearest}
            </Cta>
          </div>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-lime"
      aria-hidden
    >
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
