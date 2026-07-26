import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";
import { PageHeader } from "@/components/content/PageHeader";
import { PlanCards } from "@/components/content/PlanCards";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { paymentMethods } from "@/content/pricing";
import { href } from "@/i18n/routes";
import { localBusinessSchema, jsonLd } from "@/lib/schema";

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
    route: "pricing",
    title: dict.pricing.metaTitle,
    description: dict.meta.pricing.description,
    keywords: dict.meta.keywords,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema()) }}
      />

      <PageHeader
        kicker={dict.nav.pricing}
        title={dict.pricing.title}
        intro={dict.pricing.intro}
      />

      <Section>
        <Container>
          <PlanCards locale={l} dict={dict} />
        </Container>
      </Section>

      <Section className="border-t border-marine-line bg-ink-2">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.nav.pricing}</Kicker>
            <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
              {dict.pricing.compareHeading}
            </h2>
          </Reveal>
          <div className="mt-8 rounded-lg border border-marine-line bg-ink p-5 sm:p-8">
            <ComparisonTable dict={dict} />
          </div>
        </Container>
      </Section>

      {/* Payment methods — clearly "to confirm", nothing invented */}
      <Section>
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <Kicker>{dict.nav.pricing}</Kicker>
              <h2 className="mt-4 font-display text-2xl font-bold text-clinical">
                {dict.pricing.paymentHeading}
              </h2>
              <p className="mt-4 text-sm text-cement-2">
                {dict.pricing.paymentNote}
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.candidates.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center gap-2 rounded-md border border-dashed border-marine-line bg-ink-2 px-4 py-3 text-sm text-cement-2"
                >
                  <span className="h-2 w-2 rounded-full bg-uv/50" aria-hidden />
                  {dict.payments[method]}
                  <span className="text-xs text-cement">
                    · {dict.common.comingSoon}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-marine-line">
        <Container className="text-center">
          <Cta href={href(l, "locations")} variant="primary" className="text-base">
            {dict.pricing.ctaFind}
          </Cta>
        </Container>
      </Section>
    </>
  );
}
