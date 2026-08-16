"use client"

import { motion } from "motion/react"
import { Plane, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

const links = {
  Destinations: ["Maldives", "Japon", "Bali", "Santorin", "Maroc", "Islande"],
  Offres: ["Forfait Essentiel", "Forfait Découverte", "Forfait Prestige", "Voyages en groupe", "Sur-mesure"],
  Agence: ["À propos", "Notre équipe", "Témoignages", "Blog voyage", "FAQ"],
  Légal: ["Mentions légales", "CGV", "Politique de confidentialité", "Cookies"],
}

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
]

export default function Footer() {
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
            Prêt à vivre l'aventure de votre vie ?
          </h2>
          <p className="text-cyan-100 text-sm mb-6">
            Parlez à un conseiller dès aujourd'hui. Consultation gratuite, sans engagement.
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-white text-cyan-700 font-semibold px-8 py-3 rounded-lg text-sm hover:bg-cyan-50 transition-colors shadow-md"
          >
            Voir nos offres
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
              Agence de voyage en ligne spécialisée dans les séjours sur-mesure. Nous faisons du rêve une réalité depuis 2019.
            </p>
            {/* Contact */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                contact@myhopestep.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                Paris, France
              </li>
            </ul>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
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
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
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
          <span>© {new Date().getFullYear()} My Hope Step. Tous droits réservés.</span>
          <span className="text-neutral-600">Fait avec ❤️ pour les voyageurs du monde entier</span>
        </div>
      </div>
    </footer>
  )
}
