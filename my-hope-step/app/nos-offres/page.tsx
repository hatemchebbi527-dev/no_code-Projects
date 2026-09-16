"use client"

import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { ArrowRight, SlidersHorizontal } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"
import { offers } from "@/data/featured-offers"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function NosOffresPage() {
  const { t } = useI18n()
  const no = t.nosOffres

  const destinations = useMemo(() => {
    const set = new Set(offers.map((o) => o.destination))
    return Array.from(set).sort()
  }, [])

  const periods = useMemo(() => {
    const set = new Set(offers.map((o) => o.period))
    return Array.from(set).sort()
  }, [])

  const [filterDest, setFilterDest] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("")

  const filtered = useMemo(() => {
    return offers.filter((o) => {
      if (filterDest && o.destination !== filterDest) return false
      if (filterType && o.type !== filterType) return false
      if (filterPeriod && o.period !== filterPeriod) return false
      return true
    })
  }, [filterDest, filterType, filterPeriod])

  const typeKeys = Object.keys(no.types) as (keyof typeof no.types)[]

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
              {no.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {no.title}
            </h1>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              {no.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="sticky top-[64px] z-30 bg-white border-b border-neutral-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />

              <select
                value={filterDest}
                onChange={(e) => setFilterDest(e.target.value)}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">{no.allDestinations}</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">{no.allTypes}</option>
                {typeKeys.map((k) => (
                  <option key={k} value={k}>{no.types[k]}</option>
                ))}
              </select>

              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">{no.allPeriods}</option>
                {periods.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              {(filterDest || filterType || filterPeriod) && (
                <button
                  onClick={() => { setFilterDest(""); setFilterType(""); setFilterPeriod("") }}
                  className="text-xs text-neutral-400 hover:text-cyan-600 transition-colors underline"
                >
                  ×&nbsp;Reset
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-neutral-500 text-sm mb-4">{no.noResults}</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
                >
                  {no.contactUs} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <motion.div
                key={`${filterDest}-${filterType}-${filterPeriod}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((offer) => (
                  <motion.a
                    key={offer.id}
                    href={`/nos-offres/${offer.slug}`}
                    variants={cardVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-neutral-100 bg-white"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      <span className="absolute top-3 start-3 text-[10px] font-semibold uppercase tracking-wider bg-cyan-500 text-white px-2.5 py-1 rounded-full">
                        {no.types[offer.type as keyof typeof no.types] ?? offer.type}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-4">
                      <div className="text-xs text-neutral-400 mb-1">{offer.destination} · {offer.duration}</div>
                      <h2 className="font-semibold text-neutral-900 leading-snug mb-2 group-hover:text-cyan-600 transition-colors">
                        {offer.title}
                      </h2>
                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                        {offer.description}
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-2">
                        <div>
                          {offer.price === null ? (
                            <span className="text-sm font-semibold text-cyan-600">{no.priceOnRequest}</span>
                          ) : (
                            <span className="text-sm font-bold text-neutral-900" dir="ltr">
                              {no.fromPrice} {offer.price.toLocaleString()}€
                              <span className="text-xs font-normal text-neutral-400"> {no.perPerson}</span>
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-cyan-600">
                          {no.seeProgram} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
