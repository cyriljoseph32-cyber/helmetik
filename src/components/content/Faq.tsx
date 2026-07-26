"use client";

import { useState } from "react";
import type { FaqId } from "@/content/faq";
import type { Dictionary } from "@/i18n/types";

/** Accessible FAQ accordion. Schema.org FAQPage is emitted separately (SSR). */
export function Faq({
  ids,
  dict,
}: {
  ids: readonly FaqId[];
  dict: Dictionary;
}) {
  const [open, setOpen] = useState<FaqId | null>(ids[0] ?? null);

  return (
    <div className="divide-y divide-marine-line border-y border-marine-line">
      {ids.map((id) => {
        const item = dict.faq[id];
        const isOpen = open === id;
        return (
          <div key={id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-semibold text-clinical">
                  {item.q}
                </span>
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-marine-line text-uv transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-sm leading-relaxed text-cement-2">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
