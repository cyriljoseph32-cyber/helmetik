import { Container, Section, Kicker } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/types";

/**
 * Reviews module, intentionally in an EMPTY, disabled state. The old site
 * showed six unverifiable testimonials; we ship the module ready to receive
 * real Google reviews and show an honest empty state until then. When real
 * reviews exist, pass them in and render the cards.
 */
export function ReviewsPlaceholder({ dict }: { dict: Dictionary }) {
  const reviews: { author: string; text: string }[] = []; // wired for real data

  if (reviews.length === 0) {
    return (
      <Section>
        <Container>
          <div className="text-center">
            <Kicker>{dict.home.reviewsHeading}</Kicker>
          </div>
          <div className="mx-auto mt-6 max-w-xl rounded-lg border border-dashed border-marine-line bg-ink-2 p-8 text-center">
            <QuoteIcon />
            <p className="mt-4 text-sm text-cement-2">
              {dict.home.reviewsEmpty}
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return null;
}

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className="mx-auto text-uv/50"
      aria-hidden
    >
      <path
        d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2m14-12h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
