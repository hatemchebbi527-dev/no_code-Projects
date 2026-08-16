"use client"

import { motion } from "motion/react"
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Essentiel",
    price: "799",
    period: "/ personne",
    description: "Idéal pour un premier voyage organisé, sans prise de tête.",
    color: "border-neutral-200",
    badge: null,
    cta: "Choisir Essentiel",
    ctaVariant: "outline" as const,
    features: [
      "Vol aller-retour inclus",
      "Hôtel 3 étoiles sélectionné",
      "Transferts aéroport",
      "Assistance email 9h-18h",
      "Guide de destination PDF",
    ],
    missing: [
      "Conseiller dédié",
      "Activités incluses",
    ],
  },
  {
    name: "Découverte",
    price: "1 490",
    period: "/ personne",
    description: "Notre offre la plus populaire. Expérience complète, zéro stress.",
    color: "border-cyan-500",
    badge: "Le plus populaire",
    cta: "Choisir Découverte",
    ctaVariant: "default" as const,
    features: [
      "Vol aller-retour inclus",
      "Hôtel 4 étoiles sélectionné",
      "Transferts aéroport",
      "Conseiller dédié 7j/7",
      "2 activités incluses",
      "Assurance voyage complète",
      "Itinéraire personnalisé",
    ],
    missing: [],
  },
  {
    name: "Prestige",
    price: "2 990",
    period: "/ personne",
    description: "Le voyage d'exception. Sur-mesure de A à Z, service 5 étoiles.",
    color: "border-amber-400",
    badge: "Luxe",
    cta: "Choisir Prestige",
    ctaVariant: "accent" as const,
    features: [
      "Vol business class inclus",
      "Hôtel 5 étoiles ou villa privée",
      "Transferts limousine",
      "Conseiller dédié 24h/24",
      "Activités illimitées",
      "Assurance tous risques",
      "Itinéraire 100% sur-mesure",
      "Conciergerie privée sur place",
    ],
    missing: [],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-600 uppercase mb-3">
            Nos offres
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Des forfaits clairs,{" "}
            <span className="text-cyan-600">pour chaque budget</span>
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            Prix par personne, tout inclus. Aucun frais caché. Choisissez votre niveau d'expérience.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border-2 ${plan.color} p-8 shadow-sm hover:shadow-md transition-shadow bg-white ${
                plan.badge === "Le plus populaire" ? "ring-2 ring-cyan-500 ring-offset-2" : ""
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  plan.badge === "Le plus populaire"
                    ? "bg-cyan-600 text-white"
                    : "bg-amber-400 text-white"
                }`}>
                  <Zap className="w-3 h-3" />
                  {plan.badge}
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-neutral-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-neutral-900">{plan.price}€</span>
                  <span className="text-sm text-neutral-500">{plan.period}</span>
                </div>
              </div>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant={plan.ctaVariant} className="w-full mb-6">
                  {plan.cta}
                </Button>
              </motion.div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <Check className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
                {plan.missing.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-400 line-through">
                    <Check className="w-4 h-4 text-neutral-200 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-neutral-400 mt-10"
        >
          Prix indicatifs pour des départs en basse saison. Contactez-nous pour un devis personnalisé.
        </motion.p>
      </div>
    </section>
  )
}
