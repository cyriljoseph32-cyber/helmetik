import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { href, navOrder } from "@/i18n/routes";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const navKeyToDict = {
  howItWorks: "howItWorks",
  locations: "locations",
  pricing: "pricing",
  partners: "partners",
  about: "about",
  contact: "contact",
} as const;

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  // Only real social URLs render; the rest stay as a disabled note — never a
  // fake link (the old "© Island" / dead-link problem).
  const socials = Object.entries(site.social).filter(
    ([, url]) => typeof url === "string" && url,
  ) as [string, string][];

  return (
    <footer className="border-t border-marine-line bg-ink-2">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-cement-2">
            {dict.footer.tagline}
          </p>
          <p className="mt-4 text-xs text-cement">{dict.footer.builtIn}</p>
        </div>

        {/* Explore */}
        <nav aria-label={dict.footer.explore}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-cement">
            {dict.footer.explore}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navOrder.map((key) => (
              <li key={key}>
                <Link
                  href={href(locale, key)}
                  className="text-sm text-cement-2 transition-colors hover:text-clinical"
                >
                  {dict.nav[navKeyToDict[key]]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label={dict.footer.legalHeading}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-cement">
            {dict.footer.legalHeading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                href={href(locale, "privacy")}
                className="text-sm text-cement-2 transition-colors hover:text-clinical"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={href(locale, "terms")}
                className="text-sm text-cement-2 transition-colors hover:text-clinical"
              >
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-cement">
            {dict.footer.contactHeading}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:${site.phone.e164}`}
                className="tnum text-cement-2 transition-colors hover:text-clinical"
              >
                {site.phone.displayIntl}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cement-2 transition-colors hover:text-clinical"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-cement-2 transition-colors hover:text-clinical"
              >
                {site.email}
              </a>
            </li>
          </ul>

          {/* Social: real links only; otherwise an honest note. */}
          <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-cement">
            {dict.footer.followHeading}
          </h2>
          {socials.length > 0 ? (
            <ul className="mt-3 flex gap-3">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm capitalize text-cement-2 hover:text-clinical"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-cement">{dict.footer.socialSoon}</p>
          )}
        </div>
      </div>

      <div className="border-t border-marine-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-6 text-xs text-cement sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {site.legalEntity.name}. {dict.footer.rights}
          </p>
          <p>
            {site.city}, {site.country}
            {!site.legalEntity.confirmed && (
              <span className="ml-2 text-cement/70">
                · {dict.footer.entityNote}
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
