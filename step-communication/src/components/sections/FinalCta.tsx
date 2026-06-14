import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * CTA finale emotivo. Funge anche da ancora #contatti per la Fase 1.
 * In Fase 2 verrà sostituito/affiancato dalla pagina /contatti con form smart,
 * calendario appuntamenti e Google Maps.
 */
export function FinalCta() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Richiesta di consulenza - 7 Sport Agency"
  )}&body=${encodeURIComponent(
    "Ciao 7 Sport Agency,\n\nVorrei ricevere una consulenza per il mio progetto.\n\nAzienda / Club:\nTipo di progetto:\nObiettivi:\nBudget orientativo:\n\nGrazie!"
  )}`;

  return (
    <section id="contatti" className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[150px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.15] mask-fade-x"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--line)/0.6) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)/0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-wide relative text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
            <span className="h-px w-8 bg-accent" />
            Costruiamo insieme
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-4xl text-fluid-h2 font-semibold leading-[1.02] text-gradient">
            Il tuo prossimo grande progetto
            <span className="text-gradient-accent"> sportivo inizia qui.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Raccontaci il tuo obiettivo. Ti rispondiamo entro 24 ore con una
            prima proposta strategica, senza impegno.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={mailto} className={buttonVariants({ size: "lg" })}>
              Richiedi una consulenza
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

        {/* Contatti diretti */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-2xl gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-4 bg-bg p-6 text-left transition-colors hover:bg-bg-elevated"
            >
              <Mail className="h-5 w-5 text-accent" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-fg-muted">
                  Email
                </span>
                <span className="text-sm text-fg">{siteConfig.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 bg-bg p-6 text-left">
              <Mail className="h-5 w-5 text-accent opacity-0" />
              <span>
                <span className="block text-xs uppercase tracking-wider text-fg-muted">
                  Sede
                </span>
                <span className="text-sm text-fg">
                  {siteConfig.address.street}, {siteConfig.address.city}
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
