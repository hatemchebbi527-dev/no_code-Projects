"use client"

import { motion } from "motion/react"
import { Star, Quote } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const testimonialMeta = [
  { name: "Sophie M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop", rating: 5 },
  { name: "Karim B.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop", rating: 5 },
  { name: "Amina T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop", rating: 5 },
]

const statValues = ["2 000+", "4.75/5", "95%"]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function SocialProof() {
  const { t } = useI18n()
  const stats = [
    { value: statValues[0], label: t.social.statLabels[0] },
    { value: statValues[1], label: t.social.statLabels[1] },
    { value: statValues[2], label: t.social.statLabels[2] },
    { value: t.social.expYears, label: t.social.statLabels[3] },
  ]

  return (
    <section id="social-proof" className="py-28 px-4 bg-neutral-50">
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
            {t.social.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            {t.social.title1}{" "}
            <span className="text-cyan-600">{t.social.title2}</span>
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-5 text-center border border-neutral-100 shadow-sm">
              <div className="text-2xl font-bold text-cyan-600">{stat.value}</div>
              <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonialMeta.map((meta, i) => {
            const review = t.social.testimonials[i]
            return (
              <motion.div
                key={meta.name}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-cyan-100 mb-4 rtl:-scale-x-100" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: meta.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">"{review.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-100">
                  <img
                    src={meta.avatar}
                    alt={meta.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{meta.name}</div>
                    <div className="text-xs text-neutral-500">{review.location} · {review.destination}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
