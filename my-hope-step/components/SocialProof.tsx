"use client"

import { motion } from "motion/react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sophie M.",
    location: "Liège, Belgique",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
    destination: "Maldives",
    rating: 5,
    text: "Un voyage absolument parfait. My Hope Step a géré chaque détail — de l'hôtel au transfert. Je n'avais qu'à profiter. Je recommande les yeux fermés.",
  },
  {
    name: "Karim B.",
    location: "Bruxelles, Belgique",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    destination: "Dubai",
    rating: 5,
    text: "Mon voyage au Japon était un rêve de longue date. L'équipe a créé un itinéraire sur-mesure incroyable. Prix clair, aucune mauvaise surprise. 10/10.",
  },
  {
    name: "Amina T.",
    location: "Marseille, France",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    destination: "Bali",
    rating: 5,
    text: "Deuxième voyage avec My Hope Step et toujours la même qualité. Le conseiller était joignable à toute heure. On repart l'année prochaine !",
  },
]

const stats = [
  { value: "2 000+", label: "voyageurs satisfaits" },
  { value: "4.9/5", label: "note moyenne" },
  { value: "98%", label: "recommandent" },
  { value: "5 ans", label: "d'expérience" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function SocialProof() {
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
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Ils ont voyagé avec nous.{" "}
            <span className="text-cyan-600">Ils en parlent.</span>
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
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 text-center border border-neutral-100 shadow-sm">
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
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-cyan-100 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-neutral-600 leading-relaxed flex-1">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.location} · {t.destination}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
