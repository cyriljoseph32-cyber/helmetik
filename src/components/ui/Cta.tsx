import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "uv";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold leading-none transition-[transform,background-color,border-color,color] duration-200 min-h-[44px] px-5 focus-visible:outline-2 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Primary action — electric lime, reserved for the key conversion.
  primary:
    "bg-lime text-ink hover:bg-lime-deep shadow-[0_0_0_1px_rgba(200,242,74,0.4)]",
  // Secondary — outlined on ink.
  secondary:
    "border border-marine-line bg-transparent text-clinical hover:border-uv hover:text-uv",
  // Ghost — minimal.
  ghost: "bg-transparent text-cement-2 hover:text-clinical",
  // UV — cyan-tinted, for technical/secondary tech actions.
  uv: "bg-uv/10 text-uv border border-uv/30 hover:bg-uv/20",
};

export function Cta({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** Same styling as Cta but renders a native <button> (forms). */
export function CtaButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
