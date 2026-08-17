"use client"

import { motion } from "motion/react"
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const planStyles = [
  { price: "799", color: "border-neutral-200", badgeType: null as null | "popular" | "luxe", ctaVariant: "outline" as const, highlighted: false },
  { price: "1 490", color: "border-cyan-500", badgeType: "popular" as const, ctaVariant: "default" as const, highlighted: true },
  { price: "2 990", color: "border-amber-400", badgeType: "luxe" as const, ctaVariant: "accent" as const, highlighted: false },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function Pricing() {
  const { t } = useI18n()
  const plans = planStyles.map((style, i) => ({
    ...style,
    ...t.pricing.plans[i],
    badgeLabel:
      style.badgeType === "popular"
        ? t.pricing.popularBadge
        : style.badgeType === "luxe"
        ? t.pricing.luxeBadge
        : null,
  }))

  return (
    <section id="pricing" className="py-28 px-4 bg-white">
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
            {t.pricing.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            {t.pricing.title1}{" "}
            <span className="text-cyan-600">{t.pricing.title2}</span>
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            {t.pricing.subtitle}
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
                plan.highlighted ? "ring-2 ring-cyan-500 ring-offset-2" : ""
              }`}
            >
              {/* Badge */}
              {plan.badgeLabel && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  plan.badgeType === "popular"
                    ? "bg-cyan-600 text-white"
                    : "bg-amber-400 text-white"
                }`}>
                  <Zap className="w-3 h-3" />
                  {plan.badgeLabel}
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-neutral-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1" dir="ltr">
                  <span className="text-4xl font-bold text-neutral-900">{plan.price}€</span>
                  <span className="text-sm text-neutral-500">{t.pricing.period}</span>
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
          {t.pricing.footerNote}
        </motion.p>
      </div>
    </section>
  )
}
