"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, MapPin, ShieldCheck } from "lucide-react";
import { staggerContainer, staggerItem, smoothHover } from "@/components/motion/variants";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-surface-alt"
    >
      {/* Décor: dégradé maîtrisé teal→ambre, discret (pas de blob violet générique) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Colonne texte */}
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <motion.span
            variants={reduce ? undefined : staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Agence de voyage en ligne
          </motion.span>

          <motion.h1
            variants={reduce ? undefined : staggerItem}
            className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl"
          >
            Votre prochain voyage,{" "}
            <span className="text-primary">pensé à la main.</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : staggerItem}
            className="mt-6 max-w-xl text-xl leading-relaxed text-muted"
          >
            On construit des itinéraires sur mesure, on négocie les prix, et on
            gère la logistique. Vous n&apos;avez plus qu&apos;à faire vos valises.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={smoothHover}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Planifier mon voyage
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href="#destinations"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-3.5 font-medium text-ink transition-colors hover:bg-surface-alt"
            >
              Voir les destinations
            </a>
          </motion.div>

          {/* Micro social proof */}
          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <strong className="text-ink">4,9/5</strong> sur 1 200 avis
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Paiement sécurisé &amp; annulation flexible
            </span>
          </motion.div>
        </motion.div>

        {/* Colonne visuelle: carte produit "destination" (design intentionnel) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-teal-800 p-8 text-white shadow-2xl shadow-primary/20">
            <div className="flex items-center justify-between text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Santorin, Grèce
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-medium">
                7 jours
              </span>
            </div>
            <p className="mt-24 text-sm text-white/70">À partir de</p>
            <p className="text-4xl font-bold">
              890&nbsp;€ <span className="text-base font-normal text-white/70">/ pers.</span>
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="ml-1 text-white/70">Vols + hôtel inclus</span>
            </div>
          </div>

          {/* Carte flottante secondaire */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-xl"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-ink">Réservé en 2 min</p>
              <p className="text-muted">Sans frais cachés</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
