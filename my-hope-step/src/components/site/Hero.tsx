"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { staggerContainer, staggerItem, smoothHover } from "@/components/motion/variants";
import { HERO_VIDEO_URL, HERO_POSTER } from "@/lib/hero-media";
import { HeroScenery } from "./HeroScenery";

export function Hero() {
  const reduce = useReducedMotion();
  // On ne joue la vidéo que si une URL est fournie ET que l'utilisateur
  // n'a pas désactivé les animations (accessibilité + perf).
  const showVideo = Boolean(HERO_VIDEO_URL) && !reduce;

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ── Fond ─────────────────────────────────────────────── */}
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER || undefined}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      ) : HERO_POSTER ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Repli : paysage animé (aucune vidéo/poster fournis)
        <HeroScenery />
      )}

      {/* Voile léger : lisibilité à gauche, couleurs préservées à droite */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/40 to-transparent" />

      {/* ── Contenu ──────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-28">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="max-w-2xl"
        >
          <motion.span
            variants={reduce ? undefined : staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            Agence de voyage en ligne
          </motion.span>

          <motion.h1
            variants={reduce ? undefined : staggerItem}
            className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
          >
            Votre prochain voyage,{" "}
            <span className="text-accent">pensé à la main.</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : staggerItem}
            className="mt-6 max-w-xl text-xl leading-relaxed text-white/80"
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Planifier mon voyage
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href="#destinations"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-3.5 font-medium text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Voir les destinations
            </a>
          </motion.div>

          <motion.div
            variants={reduce ? undefined : staggerItem}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80"
          >
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <strong className="text-white">4,9/5</strong> sur 1 200 avis
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Paiement sécurisé &amp; annulation flexible
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
