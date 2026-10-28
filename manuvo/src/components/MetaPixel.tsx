"use client";

// Manuvo - Meta Pixel : chargement unique + PageView a chaque navigation.
// Ne fait rien si NEXT_PUBLIC_META_PIXEL_ID n'est pas defini (dev / avant lancement).
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID, loadPixel } from "@/lib/pixel";

export function MetaPixel() {
  const pathname = usePathname();

  // Le chargement est idempotent et vit dans lib/pixel : un evenement declenche
  // par un composant enfant (effet execute avant celui du layout) l'initialise aussi.
  useEffect(() => {
    loadPixel();
  }, []);

  // PageView a chaque changement de route (navigation SPA incluse).
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    loadPixel();
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
