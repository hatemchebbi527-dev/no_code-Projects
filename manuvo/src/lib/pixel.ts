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

// Declenche un evenement standard Meta (Lead, CompleteRegistration, Purchase...).
// No-op si le Pixel n'est pas configure ou pas encore charge.
export function trackPixel(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!META_PIXEL_ID) return;
  window.fbq?.("track", event, params);
}
