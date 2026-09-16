"use client"

import { motion } from "motion/react"
import { MapPin, Briefcase, Star, Ticket, Wand2, ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const icons = [MapPin, Briefcase, Star, Ticket, Wand2]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function HomeWindows() {
  const { t } = useI18n()
  const items = t.homeWindows.items

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-600 uppercase mb-3">
            {t.homeWindows.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            {t.homeWindows.title}
          </h2>
        </motion.div>

        {/* Grid : 2 + 2 + 1 centré */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((item, i) => {
            const Icon = icons[i]
            const isLast = i === items.length - 1
            return (
              <motion.a
                key={item.href}
                href={item.href}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-7 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all ${
                  isLast ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
              >
                {/* Icon */}
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 transition-colors">
                  <Icon className="w-5 h-5 text-cyan-600" />
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-neutral-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 group-hover:gap-2.5 transition-all">
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
