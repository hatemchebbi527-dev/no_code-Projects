"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compte de 0 jusqu'à `end` quand le chiffre entre dans l'écran.
 * Respecte la préférence "réduire les animations".
 */
export default function CountUp({
  end,
  duration = 2800,
  prefix = "",
  suffix = "",
  decimals = 0,
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const p = Math.min((now - startTime) / duration, 1);
            // easeOutCubic : démarre vite, ralentit en fin de course
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(end * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
