"use client";

import { useEffect, useRef, useState } from "react";
import { Mascot } from "@/components/brand/Mascot";
import { heroCycleSteps } from "@/content/cycle";
import type { Dictionary } from "@/i18n/types";

/**
 * The 4-beat cycle animation: Disinfect → Deodorize → Dry → Done.
 * Auto-advances while on screen. Respects `prefers-reduced-motion`
 * (static, all steps shown) and pauses when scrolled out of view.
 */
export function CycleAnimation({ dict }: { dict: Dictionary }) {
  const steps = heroCycleSteps;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onScreen = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (onScreen.current) {
        setActive((a) => (a + 1) % steps.length);
      }
    }, 2200);
    return () => clearInterval(id);
  }, [reduced, steps.length]);

  const progress = reduced ? 1 : (active + 1) / steps.length;
  const circumference = 2 * Math.PI * 52;

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-8">
      <div className="relative h-56 w-56 sm:h-64 sm:w-64">
        {/* Progress ring */}
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--color-marine-line)"
            strokeWidth="3"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--color-uv)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: reduced ? "none" : "stroke-dashoffset 0.7s var(--ease-out-quint)" }}
          />
        </svg>

        {/* Chamber core */}
        <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-ink-2 hairline">
          <Mascot className="h-16 w-16 text-clinical" />
          <div className="mt-2 tnum text-3xl font-extrabold text-clinical">
            5:00
          </div>
          <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cement">
            {dict.common.minutes}
          </div>
        </div>
      </div>

      {/* Step chips */}
      <ol className="grid w-full max-w-md grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((step, i) => {
          const isActive = reduced || i <= active;
          const isCurrent = !reduced && i === active;
          return (
            <li
              key={step}
              aria-current={isCurrent ? "step" : undefined}
              className={`flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-center transition-colors duration-500 ${
                isActive
                  ? "border-uv/40 bg-uv/10"
                  : "border-marine-line bg-transparent"
              }`}
            >
              <span
                className={`tnum text-xs font-bold ${
                  isActive ? "text-uv" : "text-cement"
                }`}
              >
                0{i + 1}
              </span>
              <span
                className={`text-sm font-semibold leading-tight ${
                  isActive ? "text-clinical" : "text-cement"
                }`}
              >
                {dict.heroCycle[step].label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Current step description (live region) */}
      <p
        className="min-h-[1.5rem] max-w-sm text-center text-sm text-cement-2"
        aria-live="polite"
      >
        {reduced
          ? dict.heroCycle.done.desc
          : dict.heroCycle[steps[active]!].desc}
      </p>
    </div>
  );
}
