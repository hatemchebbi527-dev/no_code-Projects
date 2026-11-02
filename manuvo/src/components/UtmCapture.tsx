"use client";

// Manuvo - capture des UTM a l'arrivee sur le site.
// Si l'URL contient utm_source, on memorise source/medium/campaign/content
// dans un cookie first-party (30 jours). Les actions serveur le relisent.
import { useEffect } from "react";

const COOKIE = "manuvo_utm";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export function UtmCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const source = params.get("utm_source");
      if (!source) return; // visite sans UTM : on garde l'attribution precedente
      const value = encodeURIComponent(
        JSON.stringify({
          source,
          medium: params.get("utm_medium") ?? "",
          campaign: params.get("utm_campaign") ?? "",
          content: params.get("utm_content") ?? "",
        }),
      );
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    } catch {
      // cookies bloques : pas d'attribution, le site fonctionne normalement
    }
  }, []);

  return null;
}
