import { Cta } from "@/components/ui/Cta";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactMethods } from "@/components/content/ContactMethods";
import { href } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function ConversionBlock({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Section className="border-t border-marine-line">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-clinical sm:text-4xl">
            {dict.home.finalHeading}
          </h2>
          <p className="mt-4 text-cement-2">{dict.home.finalSub}</p>
          <div className="mt-8 flex justify-center">
            <Cta href={href(locale, "locations")} variant="primary" className="text-base">
              {dict.common.findNearest}
            </Cta>
          </div>
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl">
          <ContactMethods dict={dict} />
        </div>
      </Container>
    </Section>
  );
}
