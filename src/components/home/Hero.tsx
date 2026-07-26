import Image from "next/image";
import { Cta } from "@/components/ui/Cta";
import { Container } from "@/components/ui/Section";
import { CycleAnimation } from "@/components/cycle/CycleAnimation";
import { href } from "@/i18n/routes";
import { startingPrice, currency } from "@/content/pricing";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden border-b border-marine-line">
      {/* Technical grid + UV glow backdrop */}
      {/* Real Helmetik machine — subtle backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/brand/machine-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-20 [mask-image:linear-gradient(to_right,transparent,black_75%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-uv/10 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-marine-line bg-ink-2/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cement-2">
              <span className="h-1.5 w-1.5 rounded-full bg-uv" aria-hidden />
              {dict.home.heroKicker}
            </span>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-clinical sm:text-6xl lg:text-7xl">
              {dict.home.heroTitle}
              <br />
              <span className="text-uv">{dict.home.heroTitleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-cement-2">
              {dict.home.heroSubtitle}
            </p>
            <p className="mt-3 max-w-xl text-sm text-cement">
              {dict.home.heroProblem}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Cta href={href(locale, "locations")} variant="primary" className="text-base">
                {dict.common.findNearest}
              </Cta>
              <Cta
                href={href(locale, "howItWorks")}
                variant="secondary"
                className="text-base"
              >
                {dict.common.howItWorksCta}
              </Cta>
            </div>

            <p className="tnum mt-6 text-sm text-cement">
              {dict.common.from}{" "}
              <span className="font-semibold text-clinical">
                {startingPrice} {currency}
              </span>{" "}
              · {dict.reassurance.time} · {dict.common.selfService}
            </p>
          </div>

          {/* Cycle animation */}
          <div className="flex justify-center lg:justify-end">
            <CycleAnimation dict={dict} />
          </div>
        </div>
      </Container>
    </section>
  );
}
