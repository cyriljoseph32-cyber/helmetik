import { site } from "@/content/site";
import { whatsappLink, fillTemplate } from "@/lib/whatsapp";
import type { Dictionary } from "@/i18n/types";

/**
 * The three direct contact methods — all genuinely clickable on mobile
 * (fixing the old site's `tel:`/`mailto:` links that pointed to `#`).
 */
export function ContactMethods({ dict }: { dict: Dictionary }) {
  const waPrefilled = whatsappLink(
    fillTemplate(dict.contact.waPrefill, { area: "", question: "" }).trim(),
  );

  const methods = [
    {
      label: dict.common.callUs,
      value: site.phone.displayIntl,
      href: `tel:${site.phone.e164}`,
      icon: <PhoneIcon />,
      external: false,
    },
    {
      label: dict.common.whatsapp,
      value: site.phone.displayIntl,
      href: waPrefilled,
      icon: <WhatsAppIcon />,
      external: true,
    },
    {
      label: dict.common.emailUs,
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <MailIcon />,
      external: false,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {methods.map((m) => (
        <a
          key={m.label}
          href={m.href}
          {...(m.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group flex items-center gap-4 rounded-lg border border-marine-line bg-ink-2 p-5 transition-colors hover:border-uv"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-uv/10 text-uv">
            {m.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wide text-cement">
              {m.label}
            </span>
            <span className="tnum block text-sm font-semibold text-clinical group-hover:text-uv">
              {m.value}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2Zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.7.3-.9.9-.9 2.1-.1 3.4a9 9 0 003.6 3.2c1.3.6 1.8.6 2.5.5.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
