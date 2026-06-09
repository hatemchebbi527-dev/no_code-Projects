"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Wrapper di rivelazione fluida allo scroll (fade + slide up).
 * Rispetta prefers-reduced-motion tramite il reset CSS globale.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
