import { CtaButton } from "@/components/ui/Cta";
import type { Dictionary } from "@/i18n/types";

/** Success / error panel shared by both forms. */
export function FormResult({
  status,
  dict,
  whatsappHref,
  onRetry,
}: {
  status: "success" | "error";
  dict: Dictionary;
  whatsappHref?: string;
  onRetry: () => void;
}) {
  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-success/40 bg-success/10 p-6 text-center"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/20 text-success">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-clinical">
          {dict.form.successTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-cement-2">
          {dict.form.successBody}
        </p>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-signal px-6 font-semibold text-ink transition-colors hover:bg-signal-deep"
          >
            {dict.form.orWhatsapp}
          </a>
        )}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="rounded-lg border border-danger/40 bg-danger/10 p-6 text-center"
    >
      <h3 className="font-display text-lg font-bold text-clinical">
        {dict.form.errorTitle}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-cement-2">
        {dict.form.errorBody}
      </p>
      <CtaButton variant="secondary" onClick={onRetry} className="mt-5">
        {dict.form.submitContact}
      </CtaButton>
    </div>
  );
}
