import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/content/PageHeader";

/** Shared renderer for Privacy / Terms. */
export function LegalContent({
  kicker,
  title,
  lastUpdatedLabel,
  updatedDate,
  sections,
}: {
  kicker: string;
  title: string;
  lastUpdatedLabel: string;
  updatedDate: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader
        kicker={kicker}
        title={title}
        intro={`${lastUpdatedLabel}: ${updatedDate}`}
      />
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl font-bold text-clinical">
                  {s.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-cement-2">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
