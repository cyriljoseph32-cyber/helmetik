"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Cta } from "@/components/ui/Cta";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { href, navOrder, routes } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const navKeyToDict: Record<
  (typeof navOrder)[number],
  keyof Dictionary["nav"]
> = {
  howItWorks: "howItWorks",
  locations: "locations",
  pricing: "pricing",
  partners: "partners",
  about: "about",
  contact: "contact",
};

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(key: (typeof navOrder)[number]): boolean {
    return pathname === `/${locale}/${routes[key]}`;
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-marine-line bg-ink/95 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href={href(locale, "home")} aria-label="Helmetik home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={dict.nav.menu}
        >
          {navOrder.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              aria-current={isActive(key) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(key)
                  ? "text-uv"
                  : "text-cement-2 hover:text-clinical"
              }`}
            >
              {dict.nav[navKeyToDict[key]]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} label={dict.nav.language} />
          {/* Full CTA on desktop (wrapper controls visibility so it can't
              fight the Cta's base `inline-flex`) */}
          <div className="hidden lg:block">
            <Cta
              href={href(locale, "locations")}
              variant="primary"
              className="text-sm"
            >
              {dict.common.findNearest}
            </Cta>
          </div>
          {/* Persistent compact CTA on mobile/tablet — unobtrusive icon button */}
          <Link
            href={href(locale, "locations")}
            aria-label={dict.common.findNearest}
            className="flex h-11 w-11 items-center justify-center rounded-md bg-lime text-ink transition-colors hover:bg-lime-deep lg:hidden"
          >
            <PinIcon />
          </Link>
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? dict.nav.close : dict.common.openMenu}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-marine-line text-clinical lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <nav
            aria-label={dict.nav.menu}
            className="flex flex-col gap-1 border-t border-marine-line bg-ink px-5 py-4"
          >
            {navOrder.map((key) => (
              <Link
                key={key}
                href={href(locale, key)}
                aria-current={isActive(key) ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-base font-medium ${
                  isActive(key)
                    ? "bg-marine text-uv"
                    : "text-clinical hover:bg-marine"
                }`}
              >
                {dict.nav[navKeyToDict[key]]}
              </Link>
            ))}
            <Cta
              href={href(locale, "locations")}
              variant="primary"
              className="mt-3"
            >
              {dict.common.findNearest}
            </Cta>
          </nav>
        </div>
      )}
    </header>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-6.3-7-11a7 7 0 1114 0c0 4.7-7 11-7 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
