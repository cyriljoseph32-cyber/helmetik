import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { LegalContent } from "@/components/content/LegalContent";

const UPDATED = "2026-07-26";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "en") as Locale;
  const dict = getDictionary(l);
  return buildMetadata({
    locale: l,
    route: "terms",
    title: `${dict.legal.termsTitle} — Helmetik`,
    description: dict.meta.home.description,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <LegalContent
      kicker={dict.footer.legalHeading}
      title={dict.legal.termsTitle}
      lastUpdatedLabel={dict.legal.lastUpdated}
      updatedDate={UPDATED}
      sections={dict.legal.terms}
    />
  );
}
