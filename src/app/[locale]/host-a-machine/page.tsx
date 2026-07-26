import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/content/PageHeader";
import { HostForm } from "@/components/form/HostForm";

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
    route: "partners",
    title: dict.partners.metaTitle,
    description: dict.meta.partners.description,
    keywords: dict.meta.keywords,
  });
}

export default async function PartnersPage({
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
        kicker={dict.nav.partners}
        title={dict.partners.title}
        intro={dict.partners.intro}
      />

      {/* Why host */}
      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.nav.partners}</Kicker>
            <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
              {dict.partners.whyHeading}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.partners.why.map((item, i) => (
              <Reveal
                as="article"
                key={item.title}
                delay={i * 70}
                className="rounded-lg border border-marine-line bg-ink-2 p-6"
              >
                <span className="tnum font-display text-3xl font-extrabold text-uv/40">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-clinical">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-cement-2">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who provides what */}
      <Section className="border-t border-marine-line bg-ink-2">
        <Container>
          <Reveal className="max-w-2xl">
            <Kicker>{dict.nav.partners}</Kicker>
            <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
              {dict.partners.provideHeading}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ProvideCard
              title={dict.partners.weProvide}
              items={dict.partners.weProvideItems}
              accent
            />
            <ProvideCard
              title={dict.partners.youProvide}
              items={dict.partners.youProvideItems}
            />
          </div>
        </Container>
      </Section>

      {/* Become a host form */}
      <Section id="become-a-host">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal className="text-center">
              <Kicker>{dict.nav.partners}</Kicker>
              <h2 className="mt-4 font-display text-2xl font-bold text-clinical sm:text-3xl">
                {dict.partners.formHeading}
              </h2>
              <p className="mt-4 text-cement-2">{dict.partners.formIntro}</p>
            </Reveal>
            <div className="mt-8 rounded-lg border border-marine-line bg-ink-2 p-6 sm:p-8">
              <HostForm dict={dict} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ProvideCard({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${
        accent ? "border-uv/40 bg-uv/5" : "border-marine-line bg-ink"
      }`}
    >
      <h3 className="font-display text-lg font-bold text-clinical">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-clinical">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                accent ? "bg-uv" : "bg-cement"
              }`}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
