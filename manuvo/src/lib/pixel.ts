// Manuvo - helper Meta Pixel (cote client).
// Le Pixel n'est actif que si NEXT_PUBLIC_META_PIXEL_ID est defini.
// Un ID de Pixel est une donnee publique (expose au navigateur) : pas un secret.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    // fbq est injecte par le snippet Meta ; signature volontairement large.
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let initialized = false;

// Charge le snippet Meta et initialise le Pixel. Idempotent : les appels suivants
// ne font rien. Appele par MetaPixel (layout) et par trackPixel, car React execute
// les effets des enfants avant ceux du parent : un evenement peut donc partir avant
// que le layout n'ait monte, et sans fbq il serait perdu silencieusement.
export function loadPixel(): void {
  if (typeof window === "undefined") return;
  if (!META_PIXEL_ID || initialized) return;
  initialized = true;

  /* Snippet Meta standard (fbevents.js). */
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions, prefer-spread */
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
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions, prefer-spread */

  window.fbq?.("init", META_PIXEL_ID);
}

// Declenche un evenement standard Meta (Lead, CompleteRegistration, Purchase...).
// No-op si le Pixel n'est pas configure. Le snippet met l'appel en file d'attente
// tant que fbevents.js n'est pas charge : rien n'est perdu.
export function trackPixel(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!META_PIXEL_ID) return;
  loadPixel();
  window.fbq?.("track", event, params);
}
