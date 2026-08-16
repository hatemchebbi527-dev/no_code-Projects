"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Comment fonctionne la réservation ?",
    answer:
      "Choisissez votre forfait, remplissez le formulaire de réservation en ligne, et un conseiller vous contacte sous 24h pour finaliser les détails. Le paiement s'effectue en ligne de façon sécurisée, avec possibilité de payer en 3 fois sans frais.",
  },
  {
    question: "Puis-je personnaliser mon voyage ?",
    answer:
      "Absolument. Tous nos forfaits sont adaptables : dates, hôtel, activités, extensions de séjour. Contactez notre équipe et nous concevons un itinéraire sur-mesure selon vos envies et votre budget.",
  },
  {
    question: "Quelle est votre politique d'annulation ?",
    answer:
      "Annulation gratuite jusqu'à 30 jours avant le départ. Entre 30 et 15 jours : 50% remboursé. Moins de 15 jours : non remboursable, mais nous proposons un report de voyage. L'assurance annulation incluse dans nos forfaits Découverte et Prestige couvre les imprévus.",
  },
  {
    question: "Les vols sont-ils inclus dans tous les forfaits ?",
    answer:
      "Oui, tous nos forfaits incluent les vols aller-retour depuis Paris. Départ depuis d'autres villes françaises possible avec un supplément. Le forfait Prestige inclut des vols en classe Business.",
  },
  {
    question: "Est-ce que vous proposez des voyages en groupe ?",
    answer:
      "Oui, nous organisons des voyages de groupe à partir de 8 personnes (famille, amis, team building). Des tarifs préférentiels s'appliquent et nous pouvons gérer l'ensemble de la logistique, y compris les repas de groupe et les animations.",
  },
  {
    question: "Comment me joindre à votre équipe en cas d'urgence pendant le voyage ?",
    answer:
      "Tous nos clients reçoivent un numéro d'urgence dédié, joignable 24h/24 pendant la durée du séjour. Un conseiller local est également disponible dans la plupart de nos destinations.",
  },
]

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
  return (
    <section id="faq" className="py-24 px-4 bg-neutral-50">
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
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Questions fréquentes
          </h2>
          <p className="mt-4 text-neutral-600 text-sm md:text-base">
            Tout ce que vous devez savoir avant de partir.
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
          {faqs.map((faq) => (
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
            Vous n'avez pas trouvé votre réponse ?{" "}
            <a href="mailto:contact@myhopestep.com" className="text-cyan-600 font-medium hover:underline">
              Contactez-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
