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
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
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
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Foto full-bleed. Per usare una foto locale: src="/images/hero.jpg" */}
      <CinematicImage
        src={heroMedia.src}
        alt={heroMedia.alt}
        tone={heroMedia.tone}
        priority
        sizes="100vw"
        overlay={false}
        zoom={false}
      />

      {/* Overlay sombre local: assicura la leggibilità del testo bianco
          in entrambi i temi (chiaro e scuro), indipendente dai token --bg. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent"
      />

      <div className="container-wide relative z-10 pb-16 pt-32 sm:pb-20">
        {/* Occhiello */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            Marketing sportivo & sponsorizzazioni · San Marino
          </span>
        </motion.div>

        {/* Titolo editoriale */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-5xl text-fluid-hero font-medium leading-[0.98] text-white"
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

        {/* Sottotitolo + CTA */}
        <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.7 }}
            className="max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            Da oltre 10 anni progettiamo sponsorizzazioni sportive, tour
            promozionali ed eventi che connettono le aziende alla passione di
            milioni di tifosi.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.85 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contatti" className={buttonVariants({ size: "lg" })}>
              Richiedi una consulenza
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/clienti"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "border-white/25 text-white hover:border-white/50 hover:bg-white/10"
              )}
            >
              <Play className="h-4 w-4 fill-current" />
              Scopri i nostri clienti
            </Link>
          </motion.div>
        </div>

        {/* Statistiche */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fade}
          transition={{ delay: 1 }}
          className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-5 border-t border-white/15 pt-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-3xl font-medium text-white">{s.value}</span>
              <span className="text-sm text-white/65">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
