import Image from "next/image";

/**
 * The official Helmetik mascot mark (chimpanzee in a helmet), extracted from
 * the brand logo and served as an optimized PNG with transparency. Sized by
 * `height` (px); width follows the logo's intrinsic 560×378 ratio.
 *
 * Replaces the earlier hand-drawn vector placeholder now that the real asset
 * is available.
 */
const RATIO = 560 / 378;

export function BrandMark({
  height = 32,
  className = "",
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src="/brand/helmetik-mark.png"
      alt="Helmetik"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
