"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { heroMedia } from "@/content/media";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const line1 = ["Portiamo", "il", "tuo", "brand"];
const line2 = ["nel", "cuore", "dello", "sport."];

const stats = [
  { value: "10+", label: "anni di esperienza" },
  { value: "100+", label: "clienti sportivi" },
  { value: "900+", label: "aziende nel network" },
  { value: "40M", label: "utenti/mese" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-32 sm:pb-20 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-28"
    >
      {/* Atmosfera: alone ciano del brand + griglia leggera */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-accent/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 mask-fade-x"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--line)/0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)/0.5) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Colonna testo */}
          <div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-bg-elevated/70 px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">
                Marketing sportivo & sponsorizzazioni · San Marino
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={container}
              className="text-fluid-hero font-medium leading-[0.98] text-fg"
            >
              <span className="block">
                {line1.map((w, i) => (
                  <span key={i} className="mr-[0.28em] inline-flex overflow-hidden align-bottom">
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="block">
                {line2.map((w, i) => (
                  <span key={i} className="mr-[0.28em] inline-flex overflow-hidden align-bottom">
                    <motion.span
                      variants={word}
                      className={cn(
                        "inline-block",
                        w.startsWith("sport") && "italic text-gradient-accent pr-[0.08em]"
                      )}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.6 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
            >
              Da oltre 10 anni progettiamo sponsorizzazioni sportive, tour
              promozionali ed eventi che connettono le aziende alla passione di
              milioni di tifosi.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              transition={{ delay: 0.75 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/contatti" className={buttonVariants({ size: "lg" })}>
                Richiedi una consulenza
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/clienti"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <Play className="h-4 w-4 fill-current" />
                Scopri i nostri clienti
              </Link>
            </motion.div>
          </div>

          {/* Colonna immagine cinematografica */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={imageReveal}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-line shadow-[0_40px_90px_-40px_rgba(0,0,0,0.4)] lg:aspect-[4/5]">
              <CinematicImage
                src={heroMedia.src}
                alt={heroMedia.alt}
                tone={heroMedia.tone}
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>

            {/* Card statistica fluttuante */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -left-4 flex items-center gap-4 rounded-2xl border border-line bg-bg-elevated/95 px-6 py-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] backdrop-blur-md sm:-left-6"
            >
              <span className="font-display text-4xl font-semibold text-accent">40M</span>
              <span className="max-w-[8rem] text-sm leading-snug text-fg-muted">
                utenti raggiunti ogni mese dal nostro network
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistiche */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-5 border-t border-line pt-8 lg:mt-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-3xl font-medium text-fg">{s.value}</span>
              <span className="text-sm text-fg-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
