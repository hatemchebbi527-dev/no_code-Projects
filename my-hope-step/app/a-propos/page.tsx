"use client"

import { motion } from "motion/react"
import { Heart, Lightbulb, Users, Compass } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const VALUE_ICONS = [Heart, Lightbulb, Users, Compass]

export default function AProposPage() {
  const { t } = useI18n()
  const ap = t.aPropos

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">

        {/* Header */}
        <section className="py-16 px-4 bg-neutral-50 border-b border-neutral-100">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-cyan-600 uppercase mb-3">
              {ap.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {ap.title}
            </h1>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              {ap.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">{ap.storyTitle}</h2>
            <div className="space-y-4">
              {ap.storyParagraphs.map((p, i) => (
                <p key={i} className="text-sm text-neutral-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop"
              alt="My Hope Step"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Values */}
        <section className="bg-neutral-50 border-y border-neutral-100 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-neutral-900 text-center mb-10"
            >
              {ap.valuesTitle}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ap.values.map((val, i) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 * i }}
                    className="flex gap-4 rounded-xl bg-white border border-neutral-100 p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-800 text-sm mb-1">{val.title}</p>
                      <p className="text-xs text-neutral-500 leading-relaxed">{val.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-neutral-900 text-center mb-10"
          >
            {ap.officesTitle}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {ap.offices.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.07 * i }}
                className="rounded-2xl border border-neutral-100 p-6 text-center"
              >
                <span className="text-3xl">{office.flag}</span>
                <p className="font-bold text-neutral-900 mt-3">{office.country}</p>
                <p className="text-sm text-neutral-500 mb-3">{office.city}</p>
                <p className="text-sm font-medium text-cyan-600" dir="ltr">{office.phone}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cyan-600 py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">{ap.ctaTitle}</h2>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">{ap.ctaBtn}</a>
            </Button>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  )
}
