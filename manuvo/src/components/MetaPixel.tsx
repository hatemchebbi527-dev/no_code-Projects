"use client";

// Manuvo - Meta Pixel : chargement unique + PageView a chaque navigation.
// Ne fait rien si NEXT_PUBLIC_META_PIXEL_ID n'est pas defini (dev / avant lancement).
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID } from "@/lib/pixel";

export function MetaPixel() {
  const pathname = usePathname();
  const loaded = useRef(false);

  // Chargement du snippet officiel (une seule fois).
  useEffect(() => {
    if (!META_PIXEL_ID || loaded.current) return;
    loaded.current = true;

    /* Snippet Meta standard (fbevents.js). */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        // eslint-disable-next-line prefer-rest-params
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable @typescript-eslint/no-explicit-any */

    window.fbq?.("init", META_PIXEL_ID);
  }, []);

  // PageView a chaque changement de route (navigation SPA incluse).
  useEffect(() => {
    if (!META_PIXEL_ID || !loaded.current) return;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
