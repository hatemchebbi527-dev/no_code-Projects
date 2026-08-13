"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { smoothHover } from "@/components/motion/variants";

const features = [
  { title: "Un premier pas", text: "Commence là où tu es, avec ce que tu as." },
  { title: "De l'élan", text: "Chaque petite action construit la suivante." },
  { title: "De l'espoir", text: "Avancer, même lentement, reste avancer." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 text-white">
      {/* HERO — fade + stagger au chargement */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          My Hope Step
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 max-w-md text-lg text-slate-300"
        >
          Un nouveau départ, un pas à la fois.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={smoothHover}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-full bg-white px-8 py-3 font-medium text-slate-900"
          style={{ transitionDelay: "0.7s" }}
        >
          Commencer
        </motion.button>

        <p className="mt-16 animate-pulse text-sm text-slate-500">
          Descends pour voir les animations au scroll ↓
        </p>
      </section>

      {/* SECTION — fade déclenché au scroll */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Chaque section apparaît en douceur
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-slate-300">
            Ce bloc utilise un fade déclenché quand il entre dans l&apos;écran.
          </p>
        </Reveal>
      </section>

      {/* GRILLE — révélation en cascade + hover doux */}
      <section className="mx-auto max-w-5xl px-6 pb-40">
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <Stagger.Item key={f.title}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={smoothHover}
                className="h-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-300">{f.text}</p>
              </motion.div>
            </Stagger.Item>
          ))}
        </Stagger>
      </section>
    </main>
  );
}
