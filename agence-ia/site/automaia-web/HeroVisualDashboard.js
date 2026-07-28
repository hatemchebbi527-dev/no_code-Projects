"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

/**
 * Enveloppe un bloc et le fait apparaître quand il entre dans l'écran.
 * variant : "up" (défaut), "scale", "left" ou "right" pour varier l'entrée.
 */
export default function Reveal({ children, delay = 0, className = "", variant = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respecte la préférence "réduire les animations"
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${styles[variant] || ""} ${visible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
