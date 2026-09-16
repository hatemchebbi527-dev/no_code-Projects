"use client"

import { motion } from "motion/react"
import { ArrowLeft, Calendar, Clock, CheckCircle2, XCircle, MapPin, Utensils, BedDouble, PlaneTakeoff } from "lucide-react"
import { notFound } from "next/navigation"
import { use } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { offers } from "@/data/featured-offers"

function MhsLogo({ className }: { className?: string }) {
  return <img src="/logo.png" alt="" className={className} />
}

export default function OfferDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t } = useI18n()
  const no = t.nosOffres

  const offer = offers.find((o) => o.slug === slug)
  if (!offer) notFound()

  const whatsappNumber = "32471927970"
  const whatsappText = encodeURIComponent(`${no.whatsappMsg}${offer.title}`)
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative h-[50vh] min-h-[320px]">
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-16 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-[10px] font-semibold uppercase tracking-widest bg-cyan-500 text-white px-2.5 py-1 rounded-full mb-3">
                {no.types[offer.type as keyof typeof no.types] ?? offer.type}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{offer.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{offer.destination}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{offer.duration}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{offer.period}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <a
            href="/nos-offres"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {no.backToOffers}
          </a>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main */}
            <div className="lg:col-span-2 space-y-10">

              {/* Description + Highlights */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-neutral-600 leading-relaxed text-sm md:text-base mb-6">{offer.description}</p>
                {offer.highlights.length > 0 && (
                  <div>
                    <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-3">{no.highlights}</h2>
                    <ul className="flex flex-wrap gap-2">
                      {offer.highlights.map((h) => (
                        <li key={h} className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-100 px-3 py-1 rounded-full font-medium">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.section>

              {/* Program */}
              {offer.program.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-4">{no.program}</h2>
                  <div className="space-y-3">
                    {offer.program.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-bold shrink-0">
                            {i + 1}
                          </span>
                          {i < offer.program.length - 1 && (
                            <div className="w-px flex-1 bg-neutral-100 mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <span className="text-[10px] font-semibold text-cyan-500 uppercase tracking-wider">{step.day}</span>
                          <p className="text-sm font-semibold text-neutral-800 mt-0.5">{step.title}</p>
                          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Included / Not Included */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <div>
                  <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-3">{no.included}</h2>
                  <ul className="space-y-2">
                    {offer.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {offer.notIncluded.length > 0 && (
                  <div>
                    <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-3">{no.notIncluded}</h2>
                    <ul className="space-y-2">
                      {offer.notIncluded.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-500">
                          <XCircle className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.section>

              {/* Conditions */}
              {offer.conditions && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="bg-neutral-50 border border-neutral-100 rounded-xl p-5"
                >
                  <h2 className="text-sm font-bold text-neutral-700 mb-2">{no.conditions}</h2>
                  <p className="text-xs text-neutral-500 leading-relaxed">{offer.conditions}</p>
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-5"
            >
              {/* Price card */}
              <div className="rounded-2xl border border-neutral-200 p-5 space-y-4">
                <div className="text-center">
                  {offer.price === null ? (
                    <p className="text-lg font-bold text-cyan-600">{no.priceOnRequest}</p>
                  ) : (
                    <div dir="ltr">
                      <span className="text-xs text-neutral-400">{no.fromPrice}</span>
                      <p className="text-3xl font-bold text-neutral-900">{offer.price.toLocaleString()}€</p>
                      <span className="text-xs text-neutral-400">{no.perPerson}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <MhsLogo className="w-5 h-5 rounded-full object-contain" />
                    {no.whatsappCta}
                  </a>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <a href={`/contact?offre=${offer.slug}`}>{t.destinations.requestQuote}</a>
                </Button>
              </div>

              {/* Details */}
              <div className="rounded-2xl border border-neutral-100 p-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-0.5">{no.duration}</span>
                    <span className="text-neutral-700">{offer.duration}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-0.5">{no.period}</span>
                    <span className="text-neutral-700">{offer.period}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BedDouble className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-0.5">{no.accommodation}</span>
                    <span className="text-neutral-700">{offer.accommodation}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PlaneTakeoff className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-0.5">{no.transport}</span>
                    <span className="text-neutral-700">{offer.transport}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Utensils className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-0.5">{no.meals}</span>
                    <span className="text-neutral-700">{offer.meals}</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
