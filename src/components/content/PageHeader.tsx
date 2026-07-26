import { Container, Kicker } from "@/components/ui/Section";

/** Consistent interior-page header with the tech-grid backdrop. */
export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-marine-line">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-uv/10 blur-[110px]"
        aria-hidden
      />
      <Container className="relative py-14 sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-clinical sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-cement-2">{intro}</p>
      </Container>
    </header>
  );
}
