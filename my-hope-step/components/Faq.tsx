"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { useI18n } from "@/lib/i18n"

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      className="border-b border-neutral-100 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold text-neutral-900 group-hover:text-cyan-600 transition-colors">
          {question}
        </span>
        <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-cyan-50 transition-colors">
          {open
            ? <Minus className="w-4 h-4 text-cyan-600" />
            : <Plus className="w-4 h-4 text-neutral-500 group-hover:text-cyan-600 transition-colors" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-neutral-600 leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const { t } = useI18n()
  return (
    <section id="faq" className="py-28 px-4 bg-neutral-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-cyan-600 uppercase mb-3">
            {t.faq.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-neutral-600 text-sm md:text-base">
            {t.faq.subtitle}
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-neutral-100 shadow-sm px-6 divide-y divide-neutral-100"
        >
          {t.faq.items.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-neutral-500">
            {t.faq.stillQuestions}{" "}
            <a
              href="https://wa.me/32471927970"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 font-medium hover:underline"
            >
              {t.faq.contactUs}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
