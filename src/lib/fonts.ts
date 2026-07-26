import { Archivo, Inter, Noto_Sans_Thai } from "next/font/google";

/**
 * Display face — a wide geometric grotesque with strong character, used for
 * headings and the hero "5 minutes" argument. Two weights only.
 */
export const fontDisplay = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Technical grotesque for information. Inter ships proper tabular figures
 * (used for prices, minutes and temperatures via `font-feature-settings`).
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Thai script coverage for the `th` locale. Not a stylistic third family —
 * Inter/Archivo do not cover Thai glyphs, so this is a script fallback.
 */
export const fontThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});
