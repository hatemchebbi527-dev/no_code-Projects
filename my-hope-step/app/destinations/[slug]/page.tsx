"use client"

import { motion } from "motion/react"
import { ArrowLeft, MapPin, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import { use } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { destinations } from "@/data/destinations"

export default function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t } = useI18n()
  const dt = t.destinations

  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) notFound()

  const name = dt.countries[dest.nameKey as keyof typeof dt.countries] as string
  const tagline = dt.countries[dest.taglineKey as keyof typeof dt.countries] as string
  const desc = dt.countries[`${dest.nameKey}Desc` as keyof typeof dt.countries] as string
  const types = dest.typesKey.map((k) => dt.types[k as keyof typeof dt.types] as string).filter(Boolean)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero image */}
        <div className="relative h-[55vh] min-h-[340px]">
          <img
            src={dest.image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 pt-16 max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-2">{tagline}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{name}</h1>
            </motion.div>
          </div>
        </div>

        {/* Back */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <a
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {dt.chooseCountry}
          </a>
        </div>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Description */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-semibold text-neutral-700">{name}</span>
                </div>
                <p className="text-neutral-600 leading-relaxed text-sm md:text-base mb-8">{desc}</p>

                {/* No active offers message */}
                <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
                  <p className="text-sm text-cyan-800 leading-relaxed">{dt.noOffers}</p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Types */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-semibold text-neutral-700">{dt.travelTypes}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <span key={type} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <Button className="w-full" asChild>
                  <a href={`/contact?destination=${dest.slug}`}>{dt.requestQuote}</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/nos-offres">{dt.seeTrips}</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
