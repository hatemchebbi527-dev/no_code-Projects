"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { CheckCircle2, ChevronDown, ChevronUp, Star, ShieldCheck, MapPin, Plane } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.858L.054 23.543a.5.5 0 0 0 .614.612l5.504-1.453A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-4.989-1.359l-.358-.214-3.712.98.994-3.594-.234-.37A9.819 9.819 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  )
}

const WHY_ICONS = [Star, MapPin, Plane, ShieldCheck]

export default function HajjOmraPage() {
  const { t } = useI18n()
  const ho = t.hajjOmra
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const waNumber = "32471927970"
  const waOmra = `https://wa.me/${waNumber}?text=${encodeURIComponent(ho.whatsappMsgOmra)}`
  const waHajj = `https://wa.me/${waNumber}?text=${encodeURIComponent(ho.whatsappMsgHajj)}`

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative h-[55vh] min-h-[340px]">
          <img
            src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1400&auto=format&fit=crop"
            alt="Hajj & Omra"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-cyan-300 uppercase mb-3">
                {ho.eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{ho.title}</h1>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{ho.subtitle}</p>
            </motion.div>
          </div>
        </div>

        {/* Omra + Hajj sections */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Omra */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-neutral-100 p-7 space-y-5"
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-lg">🕌</span>
              <h2 className="text-xl font-bold text-neutral-900">{ho.omraTitle}</h2>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{ho.omraDesc}</p>
            <div className="flex flex-col gap-2 pt-1">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
                <a href={waOmra} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <WhatsAppIcon className="w-4 h-4" />
                  {ho.whatsappCta}
                </a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/contact?sujet=omra">{ho.askPrice}</a>
              </Button>
            </div>
          </motion.div>

          {/* Hajj */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl border border-amber-100 bg-amber-50/40 p-7 space-y-5"
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg">🕋</span>
              <h2 className="text-xl font-bold text-neutral-900">{ho.hajjTitle}</h2>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{ho.hajjDesc}</p>
            <div className="bg-amber-100 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800 leading-relaxed">{ho.hajjNotice}</p>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
              <a href={waHajj} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <WhatsAppIcon className="w-4 h-4" />
                {ho.whatsappCta}
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Omra formulas */}
        <section className="bg-neutral-50 border-y border-neutral-100 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-neutral-900">{ho.formulasTitle}</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {ho.formulas.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className={`rounded-2xl border p-6 space-y-3 bg-white ${i === 1 ? "border-cyan-200 ring-1 ring-cyan-200 shadow-md" : "border-neutral-100"}`}
                >
                  {i === 1 && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-white px-2.5 py-0.5 rounded-full mb-1">★</span>
                  )}
                  <h3 className="font-bold text-neutral-900 text-lg">{f.name}</h3>
                  <ul className="space-y-2">
                    {[f.duration, f.hotel, f.distance, f.meals].map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-cyan-600">{ho.priceOnRequest}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold text-neutral-900">{ho.whyTitle}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ho.whyItems.map((item, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                  className="flex gap-4 rounded-xl border border-neutral-100 p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-neutral-50 border-t border-neutral-100 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-neutral-900">{ho.faqTitle}</h2>
            </motion.div>
            <div className="space-y-3">
              {ho.faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-100 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start"
                  >
                    <span className="text-sm font-semibold text-neutral-800">{item.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-neutral-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
