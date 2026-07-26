import { site } from "@/content/site";

/** Build a wa.me link with a URL-encoded prefilled message. */
export function whatsappLink(message: string): string {
  return `${site.whatsapp.link}?text=${encodeURIComponent(message)}`;
}

/** Fill a template that uses {area} / {question} placeholders. */
export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}
