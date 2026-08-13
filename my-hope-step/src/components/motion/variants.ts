import type { Variants } from "framer-motion";

// Fade + léger déplacement vers le haut. Base de tous les reveals au scroll.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Conteneur pour les révélations en cascade (staggered reveals).
// Chaque enfant apparaît 0.12s après le précédent.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Enfant d'un conteneur stagger.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Transition douce et réutilisable pour les états de survol.
export const smoothHover = { type: "spring", stiffness: 300, damping: 20 } as const;
