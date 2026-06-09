import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** "Cosa facciamo" - griglia di 6 servizi interattivi. */
export function WhatWeDo() {
  return (
    <section id="servizi" className="relative py-24 sm:py-32 lg:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Cosa facciamo"
          title={
            <>
              Sei aree di expertise,
              <br className="hidden sm:block" /> una sola ossessione: l&apos;impatto.
            </>
          }
          intro="Dalla strategia all'ultimo dettaglio in scena, copriamo l'intero ciclo di vita dell'esperienza di marca."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <Link
                  href="/#contatti"
                  className="group relative flex h-full flex-col bg-bg p-8 transition-colors duration-500 hover:bg-bg-elevated lg:p-10"
                >
                  {/* numero */}
                  <span className="absolute right-8 top-8 font-display text-sm font-medium text-fg-muted/40">
                    {service.number}
                  </span>

                  {/* icona */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-bg-subtle text-fg transition-all duration-500 group-hover:border-accent group-hover:text-accent">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>

                  <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-fg">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-fg-muted">
                    {service.short}
                  </p>

                  {/* highlights */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-line px-3 py-1 text-xs text-fg-muted"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* freccia */}
                  <div className="mt-7 flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors duration-300 group-hover:text-accent">
                    Scopri di più
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
