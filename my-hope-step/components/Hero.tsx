"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

const TRAVEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    alt: "Plage paradisiaque aux Maldives",
    className: "col-span-4 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop",
    alt: "Santorin, Grèce",
    className: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2070&auto=format&fit=crop",
    alt: "Bali, Indonésie",
    className: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop",
    alt: "Voyage en famille",
    className: "col-span-3 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    alt: "Aventure en montagne",
    className: "col-span-3 row-span-1",
  },
]

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Bento grid background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-1">
        {TRAVEL_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className={`${image.className} overflow-hidden`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          +2 000 voyageurs satisfaits
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          className="max-w-2xl text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg leading-tight"
        >
          Votre prochaine aventure{" "}
          <span className="text-amber-400">commence ici</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          className="mt-6 max-w-lg text-sm md:text-base text-white/90 drop-shadow mx-auto"
        >
          My Hope Step conçoit des voyages sur-mesure pour vous offrir des expériences inoubliables.
          Destinations exclusives, prix transparents, accompagnement 24h/24.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a href="#pricing" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button variant="accent" size="lg" className="gap-2 shadow-lg">
              Voir nos offres <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.a>
          <motion.a href="#features" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30 gap-2"
            >
              Découvrir
            </Button>
          </motion.a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-6 text-white/80 text-xs"
        >
          <span>✈️ 50+ destinations</span>
          <span className="w-px h-4 bg-white/30" />
          <span>🏨 Hôtels sélectionnés</span>
          <span className="w-px h-4 bg-white/30" />
          <span>🛡️ Paiement sécurisé</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-white/30 rounded-full"
        />
      </motion.div>
    </section>
  )
}
