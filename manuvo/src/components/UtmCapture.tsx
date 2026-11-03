"use client";

// Manuvo - capture des UTM a l'arrivee sur le site.
// Si l'URL contient utm_source, on memorise source/medium/campaign/content
// dans un cookie first-party (30 jours). Les actions serveur le relisent.
// Dans l'app installee (PWA), la source est toujours "app" / "pwa".
import { useEffect } from "react";

const COOKIE = "manuvo_utm";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export function UtmCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      // App installee (ecran d'accueil) : la visite vient de l'app, pas d'un lien.
      // Sans ca, l'UTM d'une ancienne visite (ex. lien Instagram, copie par iOS
      // a l'installation) serait attribue aux inscriptions faites dans l'app.
      const standalone =
        window.matchMedia?.("(display-mode: standalone)").matches ||
        (navigator as Navigator & { standalone?: boolean }).standalone === true;
      const data = standalone
        ? { source: "app", medium: "pwa", campaign: "", content: "" }
        : {
            source: params.get("utm_source") ?? "",
            medium: params.get("utm_medium") ?? "",
            campaign: params.get("utm_campaign") ?? "",
            content: params.get("utm_content") ?? "",
          };
      if (!data.source) return; // visite web sans UTM : on garde l'attribution precedente
      const value = encodeURIComponent(JSON.stringify(data));
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    } catch {
      // cookies bloques : pas d'attribution, le site fonctionne normalement
    }
  }, []);

  return null;
}
