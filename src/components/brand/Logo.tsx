import { Mascot } from "./Mascot";

/** Full Helmetik wordmark lockup: mascot + name. */
export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mascot className="h-8 w-8 shrink-0 text-clinical" />
      {showText && (
        <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-clinical">
          HELMET
          <span className="text-uv">IK</span>
        </span>
      )}
    </span>
  );
}
