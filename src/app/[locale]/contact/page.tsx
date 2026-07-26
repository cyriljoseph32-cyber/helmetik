import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { Container, Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/content/PageHeader";
import { ContactMethods } from "@/components/content/ContactMethods";
import { ContactForm } from "@/components/form/ContactForm";

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
    route: "contact",
    title: dict.contact.metaTitle,
    description: dict.meta.contact.description,
    keywords: dict.meta.keywords,
  });
}

export default async function ContactPage({
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
        kicker={dict.nav.contact}
        title={dict.contact.title}
        intro={dict.contact.intro}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* Direct methods + hours */}
            <div>
              <Reveal>
                <Kicker>{dict.contact.directHeading}</Kicker>
                <div className="mt-6">
                  <ContactMethods dict={dict} />
                </div>
              </Reveal>

              <Reveal delay={80} className="mt-8 rounded-lg border border-marine-line bg-ink-2 p-6">
                <h2 className="font-display text-lg font-bold text-clinical">
                  {dict.contact.hoursHeading}
                </h2>
                <p className="mt-3 text-sm text-cement-2">
                  {dict.contact.hoursBody}
                </p>
                <p className="mt-4 text-xs text-cement">
                  {dict.footer.socialSoon}
                </p>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={120}>
              <div className="rounded-lg border border-marine-line bg-ink-2 p-6 sm:p-8">
                <h2 className="font-display text-lg font-bold text-clinical">
                  {dict.contact.formHeading}
                </h2>
                <div className="mt-6">
                  <ContactForm dict={dict} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
