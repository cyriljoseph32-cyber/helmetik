import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/content/PageHeader";
import { LocationsExplorer } from "@/components/map/LocationsExplorer";
import { placesSchema, jsonLd } from "@/lib/schema";

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
    route: "locations",
    title: dict.locations.metaTitle,
    description: dict.meta.locations.description,
    keywords: dict.meta.keywords,
  });
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);
  const places = placesSchema();

  return (
    <>
      {places.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(places) }}
        />
      )}

      <PageHeader
        kicker={dict.nav.locations}
        title={dict.locations.title}
        intro={dict.locations.intro}
      />

      <Section>
        <Container>
          <LocationsExplorer locale={l} dict={dict} />
        </Container>
      </Section>
    </>
  );
}
