import { clients } from "@/content/clients";

/**
 * "Scelti dai brand" - striscia loghi in marquee.
 * ⚠️ I nomi provengono da content/clients.ts e sono PLACEHOLDER:
 * sostituire con i loghi reali (SVG monocromatici) prima del lancio.
 */
export function TrustedBy() {
  const row = [...clients, ...clients];

  return (
    <section
      aria-label="Brand che ci hanno scelto"
      className="border-y border-line bg-bg-subtle py-12"
    >
      <div className="container-wide">
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-fg-muted">
          Hanno scelto di lavorare con noi
        </p>
      </div>

      <div className="relative mt-9 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-2xl font-semibold tracking-tightest text-fg-muted/60 transition-colors duration-300 hover:text-fg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
