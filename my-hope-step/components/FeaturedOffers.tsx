"use client"

import { motion } from "motion/react"
import { Clock, ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { featuredOffers } from "@/data/featured-offers"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function FeaturedOffers() {
  const { t } = useI18n()
  const ft = t.featuredOffers

  return (
    <section className="py-24 px-4 bg-neutral-50">
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
            {ft.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            {ft.title}
          </h2>
          <p className="mt-4 text-neutral-500 text-sm md:text-base max-w-xl mx-auto">
            {ft.subtitle}
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
          {featuredOffers.map((offer) => (
            <motion.a
              key={offer.id}
              href={`/nos-offres/${offer.slug}`}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 start-3 text-xs font-semibold bg-white/90 text-neutral-800 px-2 py-1 rounded-full">
                  {offer.destination}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-neutral-900 mb-1 group-hover:text-cyan-700 transition-colors">
                  {offer.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{offer.duration}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {offer.highlights.map((h) => (
                    <li key={h} className="text-xs text-neutral-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  {offer.price ? (
                    <p className="text-sm" dir="ltr">
                      <span className="text-xs text-neutral-400">{ft.fromPrice} </span>
                      <span className="font-bold text-neutral-900">{offer.price}€</span>
                      <span className="text-xs text-neutral-400"> {ft.perPerson}</span>
                    </p>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">{ft.priceOnRequest}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 group-hover:gap-2 transition-all">
                    {ft.seeProgram} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Voir toutes les offres */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button variant="outline" asChild>
            <a href="/nos-offres">
              {ft.allOffers} <ArrowRight className="w-4 h-4 ms-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
