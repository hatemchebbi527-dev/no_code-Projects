"use client";

import { useEffect, useRef } from "react";
import { OPTIN_ORIGIN, OPTIN_AGENCY_ID } from "@/lib/optin";

// Formulaire opt-in (rapport de visibilité automatique), servi en iframe par la
// plateforme. L'iframe envoie sa hauteur par postMessage : on n'accepte que les
// messages venant de la plateforme et de cette iframe précise.
export default function OptInWidget({ locale = "it", title }) {
  const ref = useRef(null);

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== OPTIN_ORIGIN) return;
      if (!event.data || event.data.type !== "OPT_IN_WIDGET_HEIGHT") return;
      const frame = ref.current;
      if (frame && frame.contentWindow === event.source) {
        frame.style.height = `${event.data.height}px`;
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const src = `${OPTIN_ORIGIN}/#/optin?agency=${OPTIN_AGENCY_ID}&lang=${locale}`;

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      style={{ width: "100%", border: 0, height: 320 }}
    />
  );
}
