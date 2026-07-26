import { Reveal } from "@/components/ui/Reveal";
import { fullCycleSteps } from "@/content/cycle";
import type { Dictionary } from "@/i18n/types";

/**
 * The full technical cycle as a readable numbered sequence (not a flat icon
 * frieze). Insert → UV-C → 3D foam → Deodorise → Warm dry → Collect.
 */
export function FullCycleStrip({ dict }: { dict: Dictionary }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fullCycleSteps.map((step, i) => {
        const copy = dict.fullCycle[step];
        return (
          <Reveal
            as="li"
            key={step}
            delay={i * 60}
            className="group relative rounded-lg border border-marine-line bg-ink-2 p-6 transition-colors hover:border-uv/40"
          >
            <div className="flex items-baseline justify-between">
              <span className="tnum font-display text-4xl font-extrabold text-marine-line transition-colors group-hover:text-uv/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="h-2 w-2 rounded-full bg-uv/60"
                aria-hidden
              />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-clinical">
              {copy.label}
            </h3>
            <p className="mt-2 text-sm text-cement-2">{copy.desc}</p>
          </Reveal>
        );
      })}
    </ol>
  );
}
