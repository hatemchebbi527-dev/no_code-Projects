"use client"

import { motion } from "motion/react"
import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/blocks/hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const TRAVEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    alt: "Plage paradisiaque aux Maldives",
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop",
    alt: "Santorin, Grèce",
  },
  {
    src: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2070&auto=format&fit=crop",
    alt: "Bali, Indonésie",
  },
  {
    src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop",
    alt: "Voyage en famille",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    alt: "Aventure en montagne",
  },
]

export default function Hero() {
  const { t } = useI18n()
  return (
    <ContainerScroll className="h-[350vh]">
      {/* Background image grid */}
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-2 md:p-4">
        {TRAVEL_IMAGES.map((image, index) => (
          <BentoCell key={index} className="overflow-hidden rounded-xl shadow-xl">
            <img
              className="size-full object-cover object-center"
              src={image.src}
              alt={image.alt}
            />
          </BentoCell>
        ))}
      </BentoGrid>

      {/* Centered hero text */}
      <ContainerScale className="relative z-10 text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {t.hero.badge}
        </motion.div>

        {/* Headline */}
        <h1 className="mx-auto max-w-2xl text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
          {t.hero.title1}{" "}
          <span className="text-amber-500">{t.hero.title2}</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-lg text-sm md:text-base text-neutral-600 mx-auto">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button variant="accent" size="lg" className="gap-2 shadow-lg">
              {t.hero.cta1} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Button>
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm text-neutral-800 border-neutral-300 hover:bg-white gap-2"
            >
              {t.hero.cta2}
            </Button>
          </motion.a>
        </div>
      </ContainerScale>
    </ContainerScroll>
  )
}
