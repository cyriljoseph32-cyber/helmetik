"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { locales, localeNames, localeShort, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

/**
 * Accessible language switcher. Only supported (fully translated) locales are
 * offered — the exact thing the old site got wrong by exposing empty locales.
 * Swaps the leading locale segment while preserving the rest of the path.
 */
export function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pathFor(locale: Locale): string {
    const segments = pathname.split("/");
    if (isLocale(segments[1] ?? "")) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex min-h-[44px] items-center gap-1.5 rounded-md border border-marine-line px-3 text-sm font-semibold text-clinical transition-colors hover:border-uv"
      >
        <GlobeIcon />
        {localeShort[current]}
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[9rem] overflow-hidden rounded-md border border-marine-line bg-ink-2 py-1 shadow-xl"
        >
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={locale === current}>
              <Link
                href={pathFor(locale)}
                onClick={() => setOpen(false)}
                lang={locale}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-marine ${
                  locale === current
                    ? "font-semibold text-uv"
                    : "text-clinical"
                }`}
              >
                {localeNames[locale]}
                <span className="tnum text-xs text-cement">
                  {localeShort[locale]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}
