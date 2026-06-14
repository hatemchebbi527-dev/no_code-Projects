import { cn } from "@/lib/utils";

/**
 * Logo wordmark di 7 Sport Agency.
 * ⚠️ RICOSTRUZIONE approssimativa del logo ufficiale (colore brand ciano).
 * Sostituire con il file ufficiale: deposita /public/logo.svg e usalo qui con next/image.
 */
const BRAND = "#29ABE2"; // ciano del logo (approssimazione)

export function Logo({
  className,
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex flex-col leading-[0.82]", className)}
      aria-label="7 Sport Agency"
    >
      <span
        className={cn(
          "font-sans font-extrabold italic tracking-tight text-fg",
          large ? "text-[1.7rem]" : "text-[1.3rem]"
        )}
      >
        7<span style={{ color: BRAND }}>S</span>port
      </span>
      <span
        className={cn(
          "self-end font-bold uppercase",
          large ? "text-[0.7rem] tracking-[0.3em]" : "text-[0.56rem] tracking-[0.28em]"
        )}
        style={{ color: BRAND }}
      >
        agency
      </span>
    </span>
  );
}
