import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { ctaMedia } from "@/content/media";

/**
 * CTA finale emotivo su sfondo cinematografico. Funge da ancora #contatti (Fase 1).
 * In Fase 2: pagina /contatti con form smart, calendario appuntamenti e Google Maps.
 */
export function FinalCta() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Richiesta di proposta - Step Communication"
  )}&body=${encodeURIComponent(
    "Ciao Step Communication,\n\nVorrei ricevere una proposta per il mio progetto.\n\nAzienda:\nTipo di evento:\nDate indicative:\nBudget orientativo:\nObiettivi:\n\nGrazie!"
  )}`;

  return (
    <section id="contatti" className="relative flex min-h-[80svh] items-center overflow-hidden py-28">
      <CinematicImage
        src={ctaMedia.src}
        alt={ctaMedia.alt}
        tone={ctaMedia.tone}
        sizes="100vw"
        overlay={false}
      />
      <div aria-hidden className="absolute inset-0 bg-bg/70" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/70"
      />

      <div className="container-wide relative z-10 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg/80">
            <span className="h-px w-8 bg-accent" />
            Costruiamo insieme
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-4xl text-fluid-h2 font-medium leading-[1.04] text-fg">
            La tua prossima esperienza
            <span className="italic text-gradient-accent"> indimenticabile</span> inizia qui.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg/80">
            Raccontaci il tuo obiettivo. Ti rispondiamo entro 24 ore con una
            prima proposta strategica, senza impegno.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={mailto} className={buttonVariants({ size: "lg" })}>
              Richiedi una proposta
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center justify-center gap-x-10 gap-y-3 text-sm text-fg/80 sm:flex-row">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 text-accent" />
              {siteConfig.email}
            </a>
            <span className="hidden h-4 w-px bg-fg/20 sm:block" />
            <span className="inline-flex items-center gap-2">
              {siteConfig.address.street}, {siteConfig.address.city}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
