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
    route: "privacy",
    title: `${dict.legal.privacyTitle} — Helmetik`,
    description: dict.meta.home.description,
  });
}

export default async function PrivacyPage({
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
      title={dict.legal.privacyTitle}
      lastUpdatedLabel={dict.legal.lastUpdated}
      updatedDate={UPDATED}
      sections={dict.legal.privacy}
    />
  );
}
