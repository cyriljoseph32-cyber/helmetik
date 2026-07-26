import { notFound } from "next/navigation";

/**
 * Any unmatched path under a locale renders the branded, localized 404
 * (src/app/[locale]/not-found.tsx) with a real 404 status.
 */
export default function CatchAll() {
  notFound();
}
