"use client";

// Manuvo - registrazione del service worker (PWA).
import { useEffect } from "react";

export function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignora errori di registrazione */
      });
    }
  }, []);
  return null;
}
