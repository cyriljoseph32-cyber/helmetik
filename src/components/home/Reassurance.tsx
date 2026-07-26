import { Container } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/types";

/** Slim reassurance strip: Koh Samui · Self-service · 5–8 min · From 100 THB. */
export function Reassurance({ dict }: { dict: Dictionary }) {
  const items = [
    { icon: <IslandIcon />, label: dict.reassurance.location },
    { icon: <SelfIcon />, label: dict.reassurance.selfService },
    { icon: <ClockIcon />, label: dict.reassurance.time },
    { icon: <TagIcon />, label: dict.reassurance.price },
  ];
  return (
    <div className="border-b border-marine-line bg-ink-2">
      <Container>
        <ul className="grid grid-cols-2 divide-marine-line sm:grid-cols-4 sm:divide-x">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-center gap-2.5 py-5 text-sm font-semibold text-clinical"
            >
              <span className="text-uv">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function IslandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 19h18M12 19V9M12 9c0-3 2-5 5-5-1 2-2 3-5 5Zm0 0c0-3-2-5-5-5 1 2 2 3 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function SelfIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3a9 9 0 100 18 9 9 0 000-18Zm0 5v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12l9-9 9 9-9 9-9-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}
