"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { href } from "@/i18n/routes";
import { BrandMark } from "@/components/brand/BrandMark";
import { Container } from "@/components/ui/Section";

/**
 * Branded, localized 404. Locale is resolved from the path on the client
 * (not-found components don't receive route params), then the matching
 * dictionary drives the copy. Always steers users to the Locations map.
 */
export default function NotFound() {
  const pathname = usePathname();
  const seg = pathname.split("/")[1] ?? "";
  const locale: Locale = isLocale(seg) ? seg : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <BrandMark height={104} />
      <p className="tnum mt-8 font-display text-7xl font-extrabold text-clinical">
        {dict.notFound.code}
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-clinical">
        {dict.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-cement-2">{dict.notFound.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={href(locale, "locations")}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-signal px-6 font-semibold text-ink transition-colors hover:bg-signal-deep"
        >
          {dict.notFound.findMachine}
        </Link>
        <Link
          href={href(locale, "home")}
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-marine-line px-6 font-semibold text-clinical transition-colors hover:border-uv"
        >
          {dict.notFound.home}
        </Link>
      </div>
    </Container>
  );
}
