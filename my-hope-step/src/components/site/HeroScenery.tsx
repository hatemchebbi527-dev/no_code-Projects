"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Paysage animé (coucher de soleil sur montagnes + mer), 100% en code.
 * Fond du Hero tant qu'aucune vidéo n'est fournie. Léger, performant,
 * couleurs vives (ambre / rose / teal).
 */
export function HeroScenery() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ciel : coucher de soleil vif */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,#1a2a52 0%,#42376f 22%,#8a4f8e 40%,#d15f6e 56%,#f2894e 70%,#f9b45a 83%,#ffd98a 100%)",
        }}
      />

      {/* Halo du soleil */}
      <motion.div
        className="absolute left-[60%] top-[30%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,231,178,0.95) 0%, rgba(250,186,110,0.55) 30%, rgba(250,186,110,0) 62%)",
        }}
        animate={reduce ? undefined : { opacity: [0.85, 1, 0.85], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Disque solaire */}
      <div
        className="absolute left-[60%] top-[46%] h-28 w-28 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle,#fff6e0 0%,#ffd885 55%,#f7ad63 100%)" }}
      />

      {/* Nuages doux qui dérivent */}
      {!reduce && (
        <>
          <motion.div
            className="absolute top-[16%] h-16 w-72 rounded-full bg-white/25 blur-3xl"
            initial={{ x: "-25vw" }}
            animate={{ x: "125vw" }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[26%] h-12 w-56 rounded-full bg-white/15 blur-3xl"
            initial={{ x: "115vw" }}
            animate={{ x: "-35vw" }}
            transition={{ duration: 85, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Reflet du soleil sur la mer (glow adouci, sans arêtes) */}
      <div className="absolute left-[60%] top-[74%] h-40 w-40 -translate-x-1/2 rounded-full bg-amber-200/40 blur-3xl" />

      {/* Montagnes + mer (SVG en couches) */}
      <svg
        className="absolute bottom-0 left-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        {/* Mer */}
        <rect x="0" y="640" width="1440" height="260" fill="url(#sea)" />
        {/* Montagnes lointaines */}
        <path
          d="M0 560 L240 455 L440 545 L660 420 L880 540 L1100 450 L1290 545 L1440 470 L1440 660 L0 660 Z"
          fill="#7b5f86"
          opacity="0.6"
        />
        {/* Montagnes proches */}
        <path
          d="M0 640 L280 520 L560 635 L820 500 L1060 640 L1260 560 L1440 640 L1440 660 L0 660 Z"
          fill="#3b3157"
          opacity="0.9"
        />
        {/* Premier plan sombre */}
        <path d="M0 720 L380 690 L820 716 L1180 690 L1440 714 L1440 900 L0 900 Z" fill="#101f2e" />
        <defs>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e08a54" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#7a5170" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#12303f" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
