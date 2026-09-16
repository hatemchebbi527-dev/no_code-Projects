"use client"

import { useState, FormEvent } from "react"
import { motion } from "motion/react"
import { Mail, CheckCircle2, AlertCircle } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

function MhsLogo({ className }: { className?: string }) {
  return <img src="/logo.png" alt="" className={className} />
}

function FlagBelgium() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="7" height="14" fill="#1c1c1c" />
      <rect x="7" width="6" height="14" fill="#FAE042" />
      <rect x="13" width="7" height="14" fill="#EF3340" />
    </svg>
  )
}

function FlagItaly() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
      <rect width="7" height="14" fill="#009246" />
      <rect x="7" width="6" height="14" fill="#fff" />
      <rect x="13" width="7" height="14" fill="#CE2B37" />
    </svg>
  )
}

type Status = "idle" | "loading" | "success" | "error"

const contacts = [
  { Flag: FlagBelgium, country: "Belgique", city: "Liège", number: "+32 471 92 79 70", href: "https://wa.me/32471927970" },
  { Flag: FlagItaly, country: "Italie", city: "Bologne", number: "+39 352 272 3625", href: "https://wa.me/393522723625" },
]

export default function ContactPage() {
  const { t } = useI18n()
  const co = t.contact
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    data.type = data.subject ?? "Contact"
    data.subject = `[My Hope Step] ${data.subject ?? "Contact"} – ${data.name}`

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? "success" : "error")
      if (res.ok) form.reset()
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
              {co.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
              {co.title}
            </h1>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              {co.subtitle}
            </p>
          </motion.div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-neutral-100 p-7 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 mb-6">{co.formTitle}</h2>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  <p className="font-semibold text-neutral-800">{co.successTitle}</p>
                  <p className="text-sm text-neutral-500">{co.successMsg}</p>
                  <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
                    {co.newMessage}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{co.subjectLabel}</label>
                    <select
                      name="subject"
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                    >
                      {co.subjectOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        {co.nameLabel} <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        placeholder={co.namePlaceholder}
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                        {co.emailLabel} <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={co.emailPlaceholder}
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">{co.phoneLabel}</label>
                    <input
                      name="phone"
                      placeholder={co.phonePlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      {co.messageLabel} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="notes"
                      required
                      rows={5}
                      placeholder={co.messagePlaceholder}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 p-3">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700">{co.errorMsg}</p>
                    </div>
                  )}

                  <Button type="submit" disabled={status === "loading"} className="w-full">
                    {status === "loading" ? co.submitting : co.submit}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-base font-bold text-neutral-800">{co.officesTitle}</h2>

            {/* WhatsApp contacts */}
            <div className="space-y-3">
              {contacts.map(({ Flag, country, city, number, href }) => (
                <a
                  key={number}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-neutral-100 p-4 hover:border-green-200 hover:bg-green-50/40 transition-colors group"
                >
                  <div className="shrink-0">
                    <Flag />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-700">{country} · {city}</p>
                    <p className="text-sm font-medium text-neutral-900 group-hover:text-green-700 transition-colors" dir="ltr">
                      {number}
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{co.whatsappLabel}</p>
                  </div>
                  <MhsLogo className="w-5 h-5 rounded-full object-contain shrink-0" />
                </a>
              ))}
            </div>

            {/* Email */}
            <a
              href={`mailto:${co.emailContact}`}
              className="flex items-center gap-4 rounded-xl border border-neutral-100 p-4 hover:border-cyan-200 hover:bg-cyan-50/40 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">Email</p>
                <p className="text-sm font-medium text-neutral-900 group-hover:text-cyan-600 transition-colors break-all">
                  {co.emailContact}
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
