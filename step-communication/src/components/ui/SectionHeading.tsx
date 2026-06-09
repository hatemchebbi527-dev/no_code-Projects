import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Intestazione di sezione coerente: occhiello + titolo + intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
            <span className="h-px w-8 bg-accent" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-fluid-h2 font-medium leading-[1.05] text-gradient">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
