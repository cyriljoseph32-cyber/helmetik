import { Cta } from "@/components/ui/Cta";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/brand/BrandMark";
import { href } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function HostBlock({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Section>
      <Container>
        <Reveal className="relative overflow-hidden rounded-lg border border-marine-line bg-marine/30 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-8 -top-8 opacity-15"
            aria-hidden
          >
            <BrandMark height={190} />
          </div>
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-clinical sm:text-4xl">
              {dict.home.hostHeading}
            </h2>
            <p className="mt-4 text-cement-2">{dict.home.hostSub}</p>
            <Cta
              href={href(locale, "partners")}
              variant="primary"
              className="mt-8"
            >
              {dict.home.hostCta}
            </Cta>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
