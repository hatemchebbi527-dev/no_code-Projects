"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem } from "./variants";

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Conteneur pour révélations en cascade au scroll.
 * Enveloppe chaque enfant dans <Stagger.Item> : ils apparaissent l'un après l'autre.
 */
export function Stagger({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function Item({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

Stagger.Item = Item;
