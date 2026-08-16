"use client"

import { motion } from "motion/react"
import { Globe, HeadphonesIcon, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "50+ destinations exclusives",
    description:
      "Des plages des Maldives aux temples du Japon, nous sélectionnons pour vous les destinations les plus prisées du monde. Chaque voyage est pensé pour être unique.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    stat: "50+",
    statLabel: "destinations",
  },
  {
    icon: HeadphonesIcon,
    title: "Accompagnement 24h/24",
    description:
      "Un conseiller dédié vous accompagne avant, pendant et après votre voyage. Disponible à toute heure, nous gérons chaque imprévu pour vous.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    stat: "24/7",
    statLabel: "disponible",
  },
  {
    icon: ShieldCheck,
    title: "Prix transparents, zéro surprise",
    description:
      "Pas de frais cachés. Vous voyez le prix total dès le départ. Paiement sécurisé, remboursement garanti en cas d'annulation selon nos conditions.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    stat: "100%",
    statLabel: "transparent",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function Features() {
  return (
    <section id="features" className="py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-600 uppercase mb-3">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Le voyage de vos rêves,{" "}
            <span className="text-cyan-600">sans les complications</span>
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            My Hope Step s'occupe de tout. Vous n'avez plus qu'à profiter.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} mb-6`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Stat */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${feature.color}`}>{feature.stat}</span>
                  <span className="text-sm text-neutral-500">{feature.statLabel}</span>
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
