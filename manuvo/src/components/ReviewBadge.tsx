"use client";

// Badge d'avis Google de Manuvo, fourni par la plateforme AutomaIA (marque
// blanche). Le script du widget s'affiche là où il est inséré : on l'injecte
// donc dans ce conteneur au montage, plutôt qu'avec next/script (qui le
// placerait en fin de <body>).
//
// Retiré des pages le 18/11/2026 (badge non cliquable par défaut) : composant
// gardé pour plus tard. Le badge est un onglet flottant au bord droit et ne
// s'affiche que si la fiche Google a au moins un avis.
import { useEffect, useRef } from "react";

const WIDGET_SRC = "https://embed.mylocalbusiness.io/widgets/production/latest/widgets.js";
const BUSINESS_ID = "6af59b2fe06f0202970388df";
const LOCATION_ID = "6af59bdee06f0202970388ea";

export function ReviewBadge({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || host.childElementCount > 0) return;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.dataset.myWidget = "badge";
    script.dataset.businessId = BUSINESS_ID;
    script.dataset.locationId = LOCATION_ID;
    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, []);

  return <div ref={ref} className={className} />;
}
