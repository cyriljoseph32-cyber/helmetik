import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FullCycleStrip } from "@/components/content/FullCycleStrip";
import { Faq } from "@/components/content/Faq";
import { PageHeader } from "@/components/content/PageHeader";
import { cleanScope, compatibility } from "@/content/cycle";
import { faqIds } from "@/content/faq";
import { faqSchema, jsonLd } from "@/lib/schema";

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
    route: "howItWorks",
    title: dict.howItWorks.metaTitle,
    description: dict.meta.howItWorks.description,
    keywords: dict.meta.keywords,
  });
}

export default async function HowItWorksPage({
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
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(dict)) }}
      />

      <PageHeader
        kicker={dict.nav.howItWorks}
        title={dict.howItWorks.title}
        intro={dict.howItWorks.intro}
      />

      {/* Full cycle */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-clinical sm:text-3xl">
              {dict.howItWorks.stepsHeading}
            </h2>
          </Reveal>
          <div className="mt-8">
            <FullCycleStrip dict={dict} />
          </div>
        </Container>
      </Section>

      {/* Scope: what's cleaned / good to know */}
      <Section className="border-t border-marine-line bg-ink-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <Kicker>{dict.howItWorks.scopeHeading}</Kicker>
              <h2 className="mt-4 font-display text-2xl font-bold text-clinical">
                {dict.howItWorks.cleansHeading}
              </h2>
              <ul className="mt-6 space-y-3">
                {cleanScope.cleans.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <CheckDot />
                    <span className="text-clinical">
                      {dict.scope.cleans[key]}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-2xl font-bold text-clinical lg:mt-[3.25rem]">
                {dict.howItWorks.limitsHeading}
              </h2>
              <ul className="mt-6 space-y-4">
                {cleanScope.limits.map((key) => (
                  <li
                    key={key}
                    className="rounded-lg border border-marine-line bg-ink p-4 text-sm text-cement-2"
                  >
                    {dict.scope.limits[key]}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Compatibility */}
      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.nav.howItWorks}</Kicker>
            <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
              {dict.howItWorks.compatHeading}
            </h2>
            <p className="mt-4 text-cement-2">{dict.howItWorks.compatIntro}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compatibility.map((type) => (
              <div
                key={type}
                className="rounded-lg border border-marine-line bg-ink-2 p-5"
              >
                <div className="flex items-center gap-2">
                  <HelmetIcon />
                  <h3 className="font-semibold text-clinical">
                    {dict.helmetTypes[type].label}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-cement-2">
                  {dict.helmetTypes[type].note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ + claim note */}
      <Section className="border-t border-marine-line bg-ink-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <Kicker>FAQ</Kicker>
              <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
                {dict.howItWorks.faqHeading}
              </h2>
              <p className="mt-6 rounded-lg border border-uv/20 bg-uv/5 p-4 text-sm text-cement-2">
                {dict.howItWorks.claimNote}
              </p>
            </Reveal>
            <div>
              <Faq ids={faqIds} dict={dict} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function CheckDot() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-signal"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelmetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-uv" aria-hidden>
      <path
        d="M3 14a9 9 0 0118 0v3a2 2 0 01-2 2h-7l-2-3H4a1 1 0 01-1-1v-1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
