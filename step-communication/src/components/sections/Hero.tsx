"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { y: "100%" },
  show: {
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const titleLine1 = ["Trasformiamo", "i", "brand"];
const titleLine2 = ["in", "esperienze."];

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]"
    >
      {/* ====== BACKGROUND IMMERSIVO ======
          Per un video di sfondo reale, decommentare e inserire un file in /public:
          <video autoPlay muted loop playsInline poster="/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-40">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
      */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Base */}
        <div className="absolute inset-0 bg-bg" />
        {/* Glow accento */}
        <div className="absolute -right-[10%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-accent/25 blur-[140px] animate-glow-pulse" />
        <div className="absolute -left-[12%] bottom-[2%] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[130px]" />
        {/* Griglia sottile */}
        <div
          className="absolute inset-0 opacity-[0.18] mask-fade-x"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--line)/0.6) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)/0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_30%,rgb(var(--bg))_92%)]" />
      </div>

      <div className="container-wide w-full">
        <div className="max-w-5xl">
          {/* Occhiello */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-bg-elevated/50 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
              Eventi & marketing esperienziale · Rimini, dal 2005
            </span>
          </motion.div>

          {/* Titolo */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={container}
            className="font-display text-fluid-hero font-semibold leading-[0.95] tracking-tightest"
          >
            <span className="block">
              {titleLine1.map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-flex overflow-hidden align-bottom"
                >
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block">
              {titleLine2.map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-flex overflow-hidden align-bottom"
                >
                  <motion.span
                    variants={word}
                    className={cn(
                      "inline-block",
                      w.startsWith("esperienze") && "text-gradient-accent"
                    )}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h1>

          {/* Sottotitolo */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl"
          >
            Creiamo tour promozionali, eventi MICE e campagne di marketing
            esperienziale indimenticabili che fanno crescere le persone e i
            brand.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.65 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link href="/#contatti" className={buttonVariants({ size: "lg" })}>
              Richiedi una proposta
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/#progetti"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Play className="h-4 w-4 fill-current" />
              Scopri i nostri lavori
            </Link>
          </motion.div>

          {/* Prova sociale rapida */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ delay: 0.8 }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {[
              { value: "20", label: "anni di esperienza" },
              { value: "500+", label: "eventi prodotti" },
              { value: "360°", label: "regia completa" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl font-semibold text-fg">
                  {stat.value}
                </span>
                <span className="text-sm text-fg-muted">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicatore scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-line p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
