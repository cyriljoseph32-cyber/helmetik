import { BrandMark } from "./BrandMark";

/** Full Helmetik wordmark lockup: real mascot mark + name. */
export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark height={38} className="shrink-0" priority />
      {showText && (
        <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-clinical">
          HELMET
          <span className="text-signal">IK</span>
        </span>
      )}
    </span>
  );
}
