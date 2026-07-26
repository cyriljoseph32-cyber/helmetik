import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { Reassurance } from "@/components/home/Reassurance";
import { PlanCards } from "@/components/content/PlanCards";
import { HostBlock } from "@/components/home/HostBlock";
import { ReviewsPlaceholder } from "@/components/home/ReviewsPlaceholder";
import { ConversionBlock } from "@/components/home/ConversionBlock";
import { FullCycleStrip } from "@/components/content/FullCycleStrip";
import {
  localBusinessSchema,
  serviceSchema,
  jsonLd,
} from "@/lib/schema";

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
    route: "home",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    keywords: dict.meta.keywords,
  });
}

export default async function HomePage({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(dict)) }}
      />

      <Hero locale={l} dict={dict} />
      <Reassurance dict={dict} />

      {/* The cleaning cycle */}
      <Section id="cycle">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.common.selfService}</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold text-clinical sm:text-4xl">
              {dict.home.cycleHeading}
            </h2>
            <p className="mt-4 text-cement-2">{dict.home.cycleSub}</p>
          </Reveal>
          <div className="mt-10">
            <FullCycleStrip dict={dict} />
          </div>
        </Container>
      </Section>

      {/* Plans */}
      <Section className="border-t border-marine-line bg-ink-2">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.nav.pricing}</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold text-clinical sm:text-4xl">
              {dict.home.plansHeading}
            </h2>
            <p className="mt-4 text-cement-2">{dict.home.plansSub}</p>
          </Reveal>
          <div className="mt-10">
            <PlanCards locale={l} dict={dict} />
          </div>
        </Container>
      </Section>

      <HostBlock locale={l} dict={dict} />
      <ReviewsPlaceholder dict={dict} />
      <ConversionBlock locale={l} dict={dict} />
    </>
  );
}
