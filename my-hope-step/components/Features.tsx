"use client"

import { motion } from "motion/react"
import { Globe, HeadphonesIcon, ShieldCheck } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const featureStyles = [
  { icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50", stat: "50+" },
  { icon: HeadphonesIcon, color: "text-amber-500", bg: "bg-amber-50", stat: "24/7" },
  { icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", stat: "100%" },
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
  const { t } = useI18n()
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
            {t.features.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            {t.features.title1}{" "}
            <span className="text-cyan-600">{t.features.title2}</span>
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            {t.features.subtitle}
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
          {featureStyles.map((style, i) => {
            const Icon = style.icon
            const card = t.features.cards[i]
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${style.bg} mb-6`}>
                  <Icon className={`w-6 h-6 ${style.color}`} />
                </div>

                {/* Stat */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${style.color}`}>{style.stat}</span>
                  <span className="text-sm text-neutral-500">{card.statLabel}</span>
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-neutral-900 mb-3">{card.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
