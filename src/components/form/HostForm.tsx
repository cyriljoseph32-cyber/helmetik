"use client";

import { useState } from "react";
import { CtaButton } from "@/components/ui/Cta";
import { Field, TextInput, TextArea, Select, Honeypot } from "./fields";
import { FormResult } from "./FormResult";
import { hostSchema } from "@/lib/forms";
import { whatsappLink } from "@/lib/whatsapp";
import { areas } from "@/content/locations";
import type { Dictionary } from "@/i18n/types";

type Status = "idle" | "sending" | "success" | "error";

export function HostForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waHref, setWaHref] = useState<string>();
  const [values, setValues] = useState({
    name: "",
    business: "",
    venueType: "",
    area: "",
    phone: "",
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
    const parsed = hostSchema.safeParse({ kind: "host", ...values });
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

    // Structured WhatsApp summary of the host request.
    const areaLabel = dict.areas[values.area as (typeof areas)[number]];
    const summary = [
      `Helmetik — ${dict.partners.formHeading}`,
      `${dict.form.name}: ${values.name}`,
      `${dict.form.business}: ${values.business}`,
      `${dict.form.venueType}: ${values.venueType}`,
      `${dict.form.area}: ${areaLabel}`,
      `${dict.form.phone}: ${values.phone}`,
      values.message ? `${dict.form.message}: ${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    setWaHref(whatsappLink(summary));

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={dict.form.name} required error={errorText(errors.name)}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            hasError={!!errors.name}
          />
        </Field>
        <Field
          id="business"
          label={dict.form.business}
          required
          error={errorText(errors.business)}
        >
          <TextInput
            id="business"
            name="business"
            autoComplete="organization"
            value={values.business}
            onChange={(e) => set("business", e.target.value)}
            hasError={!!errors.business}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="venueType"
          label={dict.form.venueType}
          required
          error={errorText(errors.venueType)}
        >
          <Select
            id="venueType"
            name="venueType"
            value={values.venueType}
            onChange={(e) => set("venueType", e.target.value)}
            hasError={!!errors.venueType}
          >
            <option value="">{dict.form.selectArea}</option>
            {dict.form.venueTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="area" label={dict.form.area} required error={errorText(errors.area)}>
          <Select
            id="area"
            name="area"
            value={values.area}
            onChange={(e) => set("area", e.target.value)}
            hasError={!!errors.area}
          >
            <option value="">{dict.form.selectArea}</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {dict.areas[a]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field id="phone" label={dict.form.phone} required error={errorText(errors.phone)}>
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          hasError={!!errors.phone}
        />
      </Field>

      <Field id="message" label={dict.form.message} error={errorText(errors.message)}>
        <TextArea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={dict.form.messagePlaceholder}
        />
      </Field>

      <CtaButton
        type="submit"
        variant="primary"
        disabled={status === "sending"}
        className="w-full"
      >
        {status === "sending" ? dict.form.sending : dict.form.submitHost}
      </CtaButton>
    </form>
  );
}
