"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "./variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décale le démarrage de l'animation (en secondes). */
  delay?: number;
};

/**
 * Fade déclenché au scroll : l'élément apparaît quand il entre dans le viewport.
 * `once: true` = l'animation ne se rejoue pas quand on remonte.
 * Respecte prefers-reduced-motion (pas d'animation si l'utilisateur la désactive).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
