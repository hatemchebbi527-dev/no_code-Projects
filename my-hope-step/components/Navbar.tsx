"use client"

import * as React from "react"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import LanguageToggle from "@/components/LanguageToggle"

export default function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20)
  })

  const navLinks = [
    { label: t.nav.destinations, href: "#features" },
    { label: t.nav.offers, href: "#pricing" },
    { label: t.nav.testimonials, href: "#social-proof" },
    { label: t.nav.faq, href: "#faq" },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 24px 0 rgba(8,145,178,0.08)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt=""
            className="h-12 w-12 rounded-full object-contain bg-white p-1 shrink-0"
          />
          <span className="font-bold text-lg text-cyan-600">My Hope Step</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 hover:text-cyan-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + language */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Button variant="default" size="sm">
            {t.nav.book}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-neutral-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-white border-t border-neutral-100 px-4 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-neutral-700 hover:text-cyan-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-1">
            <LanguageToggle compact />
          </div>
          <Button variant="default" size="sm" className="w-full mt-1">
            {t.nav.book}
          </Button>
        </motion.div>
      )}
    </motion.header>
  )
}
