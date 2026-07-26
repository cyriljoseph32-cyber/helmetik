import type { SVGProps } from "react";

/**
 * HELMETIK mascot — a clean, geometric monkey mark wearing a helmet.
 *
 * Rebuilt as a single vector so it reads from 24px to 200px and works in
 * monochrome (uses `currentColor` for the line work). This is a crafted
 * placeholder for the client's original monkey mascot; swapping it means
 * replacing this one component.
 *
 * `accent` colours the visor glow (UV cyan) — set to "none" for a fully
 * monochrome lockup (e.g. footer, favicon rasterisation).
 */
export function Mascot({
  accent = "var(--color-uv)",
  ...props
}: SVGProps<SVGSVGElement> & { accent?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-hidden="true"
      {...props}
    >
      {/* Helmet shell */}
      <path
        d="M32 6c12.7 0 22 8.7 22 21v9.5c0 2.5-2 4.5-4.5 4.5H47"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10 40.5V27C10 14.7 19.3 6 32 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Visor opening + UV glow */}
      <path
        d="M14 30.5c3.5-1.6 8-2.5 12-2.5"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Ears */}
      <circle cx="12" cy="45" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="52" cy="45" r="6" stroke="currentColor" strokeWidth="3" />
      {/* Face */}
      <path
        d="M18 40c0-2 1.5-3 3.5-3h21c2 0 3.5 1 3.5 3v6c0 7.2-5.8 13-13 13h-2c-7.2 0-13-5.8-13-13v-6Z"
        fill="currentColor"
      />
      {/* Muzzle */}
      <path
        d="M25 49c0-2.2 3.1-3.5 7-3.5s7 1.3 7 3.5-3.1 6-7 6-7-3.8-7-6Z"
        fill="var(--color-ink)"
      />
      {/* Eyes */}
      <circle cx="27" cy="43.5" r="2.1" fill="var(--color-ink)" />
      <circle cx="37" cy="43.5" r="2.1" fill="var(--color-ink)" />
      {/* Nostrils */}
      <circle cx="30" cy="49.5" r="1.1" fill={accent} />
      <circle cx="34" cy="49.5" r="1.1" fill={accent} />
    </svg>
  );
}
