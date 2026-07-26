/**
 * Standalone mascot SVG string with literal colors (no CSS vars), for use in
 * ImageResponse (favicon / OG) and anywhere a self-contained asset is needed.
 * Mirrors the React <Mascot /> component.
 */
export function mascotSvg({
  line = "#f5f8fb",
  accent = "#35e0ff",
  ink = "#08131f",
  size = 64,
}: {
  line?: string;
  accent?: string;
  ink?: string;
  size?: number;
} = {}): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">
    <path d="M32 6c12.7 0 22 8.7 22 21v9.5c0 2.5-2 4.5-4.5 4.5H47" stroke="${line}" stroke-width="3" stroke-linecap="round"/>
    <path d="M10 40.5V27C10 14.7 19.3 6 32 6" stroke="${line}" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 30.5c3.5-1.6 8-2.5 12-2.5" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="12" cy="45" r="6" stroke="${line}" stroke-width="3"/>
    <circle cx="52" cy="45" r="6" stroke="${line}" stroke-width="3"/>
    <path d="M18 40c0-2 1.5-3 3.5-3h21c2 0 3.5 1 3.5 3v6c0 7.2-5.8 13-13 13h-2c-7.2 0-13-5.8-13-13v-6Z" fill="${line}"/>
    <path d="M25 49c0-2.2 3.1-3.5 7-3.5s7 1.3 7 3.5-3.1 6-7 6-7-3.8-7-6Z" fill="${ink}"/>
    <circle cx="27" cy="43.5" r="2.1" fill="${ink}"/>
    <circle cx="37" cy="43.5" r="2.1" fill="${ink}"/>
    <circle cx="30" cy="49.5" r="1.1" fill="${accent}"/>
    <circle cx="34" cy="49.5" r="1.1" fill="${accent}"/>
  </svg>`;
}

/** Base64 data URI for <img src> in Satori/ImageResponse. */
export function mascotDataUri(opts?: Parameters<typeof mascotSvg>[0]): string {
  const svg = mascotSvg(opts);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
