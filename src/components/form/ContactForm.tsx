"use client";

import { useState } from "react";
import { CtaButton } from "@/components/ui/Cta";
import { Field, TextInput, TextArea, Select, Honeypot } from "./fields";
import { FormResult } from "./FormResult";
import { contactSchema } from "@/lib/forms";
import { whatsappLink, fillTemplate } from "@/lib/whatsapp";
import { areas } from "@/content/locations";
import type { Dictionary } from "@/i18n/types";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waHref, setWaHref] = useState<string>();
  const [values, setValues] = useState({
    name: "",
    email: "",
    area: "",
    message: "",
    company_website: "",
  });

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function errorText(key?: string): string | undefined {
    if (!key) return undefined;
    return (
      (dict.form as unknown as Record<string, string>)[key] ??
      dict.form.required
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ kind: "contact", ...values });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[1] ?? issue.path[0];
        if (typeof field === "string" && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");

    // Build the WhatsApp deep link from validated values (the primary channel).
    const areaLabel = values.area
      ? dict.areas[values.area as (typeof areas)[number]]
      : "—";
    setWaHref(
      whatsappLink(
        fillTemplate(dict.contact.waPrefill, {
          area: areaLabel,
          question: values.message,
        }),
      ),
    );

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      // Even if the (optional) email backend is unreachable, the WhatsApp
      // channel still works — treat validated input as success.
      setStatus("success");
    }
  }

  if (status === "success" || status === "error") {
    return (
      <FormResult
        status={status}
        dict={dict}
        whatsappHref={status === "success" ? waHref : undefined}
        onRetry={() => setStatus("idle")}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot
        value={values.company_website}
        onChange={(v) => set("company_website", v)}
      />
      <Field id="name" label={dict.form.name} required error={errorText(errors.name)}>
        <TextInput
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          hasError={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      <Field id="email" label={dict.form.email} required error={errorText(errors.email)}>
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          hasError={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </Field>

      <Field id="area" label={dict.form.area} error={errorText(errors.area)}>
        <Select
          id="area"
          name="area"
          value={values.area}
          onChange={(e) => set("area", e.target.value)}
        >
          <option value="">{dict.form.selectArea}</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {dict.areas[a]}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id="message"
        label={dict.form.message}
        required
        error={errorText(errors.message)}
      >
        <TextArea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={dict.form.messagePlaceholder}
          hasError={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      <CtaButton
        type="submit"
        variant="primary"
        disabled={status === "sending"}
        className="w-full"
      >
        {status === "sending" ? dict.form.sending : dict.form.submitContact}
      </CtaButton>
    </form>
  );
}
