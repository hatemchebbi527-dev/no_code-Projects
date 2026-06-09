import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Reveal } from "@/components/motion/Reveal";

/** "Cosa facciamo" - griglia di 6 servizi cinematografici. */
export function WhatWeDo() {
  return (
    <section id="servizi" className="relative py-24 sm:py-32 lg:py-40">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Cosa facciamo"
          title={
            <>
              Sei aree di expertise,
              <br className="hidden sm:block" /> una sola ossessione: <span className="italic text-gradient-accent">l&apos;impatto.</span>
            </>
          }
          intro="Dalla strategia all'ultimo dettaglio in scena, copriamo l'intero ciclo di vita dell'esperienza di marca."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href="/#contatti"
                  className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl border border-line p-8"
                >
                  <CinematicImage
                    src={service.image}
                    alt={service.title}
                    tone={service.tone}
                    zoom
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Tint per leggibilità */}
                  <div className="absolute inset-0 bg-bg/40 transition-colors duration-500 group-hover:bg-bg/20" />

                  <span className="absolute right-7 top-7 z-10 font-display text-sm text-fg/50">
                    {service.number}
                  </span>

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-fg/15 bg-bg/30 text-accent backdrop-blur-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-medium text-fg">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-fg/75">
                      {service.short}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-fg/80 transition-colors duration-300 group-hover:text-accent">
                      Scopri di più
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
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
