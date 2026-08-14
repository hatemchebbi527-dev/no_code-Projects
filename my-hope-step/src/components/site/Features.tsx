"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Route, BadgePercent, Headset, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { smoothHover } from "@/components/motion/variants";

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
  /** Photo optionnelle : dépose le fichier dans public/features/ et mets
   *  son chemin ici (ex: "/features/itineraire.jpg"). Laisse "" pour le
   *  placeholder dégradé. */
  img: string;
  /** Dégradé du placeholder quand img est vide. */
  gradient: string;
};

const features: Feature[] = [
  {
    icon: Route,
    title: "Itinéraires 100% sur mesure",
    text: "On dessine chaque étape selon vos envies, votre rythme et votre budget. Aucun package standard, uniquement votre voyage.",
    img: "",
    gradient: "from-primary to-teal-800",
  },
  {
    icon: BadgePercent,
    title: "Les meilleurs prix, négociés",
    text: "Vols, hôtels, activités : on compare et on négocie à votre place. En moyenne 18 % moins cher qu'en réservant seul.",
    img: "",
    gradient: "from-accent to-orange-700",
  },
  {
    icon: Headset,
    title: "Un conseiller dédié 7j/7",
    text: "Une vraie personne joignable avant et pendant le voyage. Un vol annulé à 3 h du matin ? On s'en occupe.",
    img: "",
    gradient: "from-teal-700 to-slate-900",
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
          {features.map(({ icon: Icon, title, text, img, gradient }) => (
            <Stagger.Item key={title}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={smoothHover}
                className="group h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                {/* Zone image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
                    >
                      <Icon className="h-14 w-14 text-white/90" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
                </div>
              </motion.article>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
