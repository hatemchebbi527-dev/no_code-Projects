import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Cosa dicono di noi" - testimonianze.
 * ⚠️ Contenuto placeholder (content/testimonials.ts): sostituire con citazioni reali e autorizzate.
 */
export function Testimonials() {
  return (
    <section className="border-t border-line bg-bg-subtle py-24 sm:py-32 lg:py-40">
      <div className="container-wide">
        <SectionHeading
          align="center"
          eyebrow="Cosa dicono di noi"
          title="La fiducia si costruisce un'esperienza alla volta."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-bg p-8 transition-colors duration-500 hover:border-fg/20">
                <Quote className="h-8 w-8 text-accent" strokeWidth={1.5} />
                <blockquote className="mt-6 flex-1 font-display text-xl font-normal leading-relaxed text-fg/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-6">
                  <p className="font-display font-semibold text-fg">{t.author}</p>
                  <p className="mt-0.5 text-sm text-fg-muted">
                    {t.role} · {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
