import type { ReactNode } from "react";

const fieldBase =
  "w-full rounded-md border bg-ink px-3.5 py-3 text-sm text-clinical placeholder:text-cement/70 transition-colors focus:border-uv focus:outline-none min-h-[44px]";

export function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-clinical"
      >
        {label}
        {required && <span className="ml-0.5 text-uv">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  hasError,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      {...props}
      className={`${fieldBase} ${hasError ? "border-danger" : "border-marine-line"}`}
    />
  );
}

export function TextArea({
  hasError,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
}) {
  return (
    <textarea
      {...props}
      className={`${fieldBase} min-h-[120px] resize-y ${hasError ? "border-danger" : "border-marine-line"}`}
    />
  );
}

export function Select({
  hasError,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  return (
    <select
      {...props}
      className={`${fieldBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 fill=%22none%22 stroke=%22%238a97a6%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${hasError ? "border-danger" : "border-marine-line"}`}
    >
      {children}
    </select>
  );
}

/** Visually-hidden honeypot field. Real users never see or fill it. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="company_website">Do not fill this field</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
