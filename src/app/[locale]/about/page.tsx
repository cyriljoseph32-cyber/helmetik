import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/content/PageHeader";
import { Mascot } from "@/components/brand/Mascot";

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
    route: "about",
    title: dict.about.metaTitle,
    description: dict.meta.about.description,
    keywords: dict.meta.keywords,
  });
}

export default async function AboutPage({
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
      <PageHeader
        kicker={dict.nav.about}
        title={dict.about.title}
        intro={dict.about.lead}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="space-y-5">
              {dict.about.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg leading-relaxed text-clinical"
                      : "leading-relaxed text-cement-2"
                  }
                >
                  {para}
                </p>
              ))}
            </Reveal>

            {/* Editorial slot — real founder/team photo goes here, no fake portrait */}
            <Reveal delay={100}>
              <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-lg border border-dashed border-marine-line bg-ink-2 p-8 text-center">
                <Mascot className="h-20 w-20 text-uv/60" accent="none" />
                <p className="mt-6 text-sm font-semibold text-clinical">
                  {dict.about.teamHeading}
                </p>
                <p className="mt-2 text-xs text-cement">
                  {dict.about.teamNote}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="border-t border-marine-line bg-ink-2">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.nav.about}</Kicker>
            <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
              {dict.about.valuesHeading}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.about.values.map((value, i) => (
              <Reveal
                as="article"
                key={value.title}
                delay={i * 70}
                className="rounded-lg border border-marine-line bg-ink p-6"
              >
                <h3 className="font-display text-lg font-bold text-clinical">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-cement-2">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
