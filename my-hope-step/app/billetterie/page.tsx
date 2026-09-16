"use client"

import { useState, FormEvent } from "react"
import { motion } from "motion/react"
import { Plane, Ship, CheckCircle2, AlertCircle } from "lucide-react"
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

type Status = "idle" | "loading" | "success" | "error"

export default function BilletteriePage() {
  const { t } = useI18n()
  const bi = t.billetterie

  const [ticketType, setTicketType] = useState<"vol" | "ferry">("vol")
  const [status, setStatus] = useState<Status>("idle")

  const waNumber = "32471927970"
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent("Bonjour, je souhaite une demande de billet.")}`

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    data.type = ticketType === "vol" ? bi.typeVol : bi.typeFerry
    data.subject = `Demande ${data.type} – ${data.name}`

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

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
              {bi.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {bi.title}
            </h1>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              {bi.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Service cards */}
        <section className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-4 rounded-2xl border border-neutral-100 p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h2 className="font-bold text-neutral-900 mb-2">{bi.volTitle}</h2>
              <p className="text-sm text-neutral-500 leading-relaxed">{bi.volDesc}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex gap-4 rounded-2xl border border-neutral-100 p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
              <Ship className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h2 className="font-bold text-neutral-900 mb-2">{bi.ferryTitle}</h2>
              <p className="text-sm text-neutral-500 leading-relaxed">{bi.ferryDesc}</p>
            </div>
          </motion.div>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-neutral-100 p-7 shadow-sm"
          >
            <h2 className="text-lg font-bold text-neutral-900 mb-6">{bi.formTitle}</h2>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <p className="font-semibold text-neutral-800">{bi.successTitle}</p>
                <p className="text-sm text-neutral-500">{bi.successMsg}</p>
                <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
                  Nouvelle demande
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Ticket type toggle */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-2">{bi.typeLabel}</label>
                  <div className="flex rounded-xl overflow-hidden border border-neutral-200">
                    {(["vol", "ferry"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTicketType(type)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                          ticketType === type
                            ? "bg-cyan-500 text-white"
                            : "bg-white text-neutral-500 hover:bg-neutral-50"
                        }`}
                      >
                        {type === "vol" ? <Plane className="w-4 h-4" /> : <Ship className="w-4 h-4" />}
                        {type === "vol" ? bi.typeVol : bi.typeFerry}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      {bi.nameLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      placeholder={bi.namePlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      {bi.emailLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={bi.emailPlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.phoneLabel}</label>
                  <input
                    name="phone"
                    placeholder={bi.phonePlaceholder}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* From + To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.fromLabel}</label>
                    <input
                      name="from"
                      placeholder={bi.fromPlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.toLabel}</label>
                    <input
                      name="to"
                      placeholder={bi.toPlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Dates + passengers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.departLabel}</label>
                    <input
                      name="departDate"
                      type="date"
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.returnLabel}</label>
                    <input
                      name="returnDate"
                      type="date"
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.passengersLabel}</label>
                    <input
                      name="passengers"
                      type="number"
                      min={1}
                      placeholder={bi.passengersPlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{bi.notesLabel}</label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder={bi.notesPlaceholder}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 p-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{bi.errorMsg}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full"
                >
                  {status === "loading" ? bi.submitting : bi.submit}
                </Button>
              </form>
            )}
          </motion.div>

          {/* WhatsApp alternative */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-400 mb-3">{bi.whatsappAlt}</p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp +32 471 92 79 70
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
