"use client";

import { motion } from "framer-motion";
import { Route, BadgePercent, Headset } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { smoothHover } from "@/components/motion/variants";

const features = [
  {
    icon: Route,
    title: "Itinéraires 100% sur mesure",
    text: "On dessine chaque étape selon vos envies, votre rythme et votre budget. Aucun package standard, uniquement votre voyage.",
  },
  {
    icon: BadgePercent,
    title: "Les meilleurs prix, négociés",
    text: "Vols, hôtels, activités : on compare et on négocie à votre place. En moyenne 18 % moins cher qu'en réservant seul.",
  },
  {
    icon: Headset,
    title: "Un conseiller dédié 7j/7",
    text: "Une vraie personne joignable avant et pendant le voyage. Un vol annulé à 3 h du matin ? On s'en occupe.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pourquoi nous
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Le voyage sans la charge mentale
          </h2>
          <p className="mt-4 text-xl text-muted">
            Vous rêvez la destination, on s&apos;occupe de tout le reste.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <Stagger.Item key={title}>
              <motion.article
                whileHover={{ y: -6, scale: 1.02 }}
                transition={smoothHover}
                className="h-full rounded-2xl border border-border bg-surface-alt p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
              </motion.article>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
