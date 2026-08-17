"use client"

import { motion } from "motion/react"
import { Plane, Mail, Phone, MapPin } from "lucide-react"
import { useI18n } from "@/lib/i18n"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.3v13.24a2.53 2.53 0 0 1-2.53 2.4 2.53 2.53 0 1 1 .68-4.96V10.3a5.9 5.9 0 0 0-.68-.04 5.87 5.87 0 1 0 5.85 5.87V9.01a7.55 7.55 0 0 0 4.44 1.42V7.13a4.29 4.29 0 0 1-3.4-1.31Z" />
    </svg>
  )
}

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/myhopestep.be" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584486091134" },
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@my.hope.by.n" },
]

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      {/* CTA banner */}
      <div className="bg-cyan-600 py-14 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
            {t.footer.ctaTitle}
          </h2>
          <p className="text-cyan-100 text-sm mb-6">
            {t.footer.ctaSubtitle}
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-white text-cyan-700 font-semibold px-8 py-3 rounded-lg text-sm hover:bg-cyan-50 transition-colors shadow-md"
          >
            {t.footer.ctaButton}
          </motion.a>
        </motion.div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">

          {/* Brand col */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Plane className="w-5 h-5 text-cyan-400" />
              My Hope Step
            </a>
            <p className="text-sm leading-relaxed mb-6">
              {t.footer.brandDesc}
            </p>
            {/* Contact */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                contact@myhope-step.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                <span dir="ltr">+32 471 92 79 70</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                {t.footer.location}
              </li>
            </ul>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-cyan-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-neutral-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          {t.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {new Date().getFullYear()} My Hope Step. {t.footer.rights}</span>
          <span className="text-neutral-600">{t.footer.madeWith}</span>
        </div>
      </div>
    </footer>
  )
}
