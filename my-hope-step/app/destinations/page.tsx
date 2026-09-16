"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"
import { destinations } from "@/data/destinations"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function DestinationsPage() {
  const { t } = useI18n()
  const dt = t.destinations

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
              {dt.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {dt.title}
            </h1>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              {dt.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {destinations.map((dest) => {
                const name = dt.countries[dest.nameKey as keyof typeof dt.countries] as string
                const tagline = dt.countries[dest.taglineKey as keyof typeof dt.countries] as string
                const types = dest.typesKey.map(
                  (k) => dt.types[k as keyof typeof dt.types] as string
                ).filter(Boolean)

                return (
                  <motion.a
                    key={dest.slug}
                    href={`/destinations/${dest.slug}`}
                    variants={cardVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-neutral-100"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-white font-bold text-base leading-tight mb-0.5">{name}</h2>
                      <p className="text-white/80 text-xs mb-2">{tagline}</p>
                      <div className="flex flex-wrap gap-1">
                        {types.slice(0, 3).map((type) => (
                          <span key={type} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow">
                        <ArrowRight className="w-4 h-4 text-cyan-600" />
                      </span>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
