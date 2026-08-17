"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Globe, Check } from "lucide-react"
import { LANGS, useI18n } from "@/lib/i18n"

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0]

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Changer de langue"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-lg text-sm font-medium text-neutral-600 hover:text-cyan-600 transition-colors ${
          compact ? "px-2 py-1.5 w-full justify-start" : "px-2.5 py-1.5 border border-neutral-200 hover:border-cyan-300"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>{current.short}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-lg ${
              compact ? "left-0" : "ltr:right-0 rtl:left-0"
            }`}
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-sm transition-colors hover:bg-cyan-50 ${
                    l.code === lang ? "text-cyan-600 font-semibold" : "text-neutral-700"
                  }`}
                >
                  <span>{l.label}</span>
                  {l.code === lang && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
