"use client";

// Manuvo - declenche un evenement Meta Pixel une seule fois au montage.
// Utilise apres une redirection serveur (ex. inscription -> /dashboard?registered=1),
// la ou l'etat de succes n'est pas visible cote client. Nettoie le parametre d'URL.
import { useEffect } from "react";
import { trackPixel } from "@/lib/pixel";

export function PixelEvent({
  event,
  params,
  clearParam,
}: {
  event: string;
  params?: Record<string, unknown>;
  clearParam?: string;
}) {
  useEffect(() => {
    trackPixel(event, params);
    if (clearParam && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has(clearParam)) {
        url.searchParams.delete(clearParam);
        window.history.replaceState({}, "", url.toString());
      }
    }
    // Montage unique : on ne re-declenche pas si les props changent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
