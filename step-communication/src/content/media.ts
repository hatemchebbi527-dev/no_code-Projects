/**
 * Media centrale du site (direction cinématographique).
 *
 * ⚠️ Les `src` sont des PHOTOS STOCK PLACEHOLDER (Unsplash), non vérifiables dans
 * l'environnement de build. Elles s'afficheront quand le site tourne sur une
 * machine ayant accès à Unsplash (ton ordinateur en local, ou Vercel).
 *
 * POUR METTRE TES VRAIES PHOTOS:
 *   1. Dépose tes fichiers dans /public/images/ (ex: hero.jpg, progetto-1.jpg)
 *   2. Remplace le `src` par le chemin local (ex: src: "/images/hero.jpg")
 *
 * Si une image ne charge pas, un dégradé cinématographique (`tone`) s'affiche
 * automatiquement à la place. Jamais d'image cassée.
 */

export type Tone = "ember" | "gold" | "night" | "crimson" | "slate";

/** Dégradés cinématographiques de secours, façon éclairage de scène. */
export const tones: Record<Tone, string> = {
  ember: "linear-gradient(155deg, #3a1808 0%, #160d07 55%, #0b0a09 100%)",
  gold: "linear-gradient(155deg, #3a2c0a 0%, #18130a 55%, #0b0a09 100%)",
  night: "linear-gradient(155deg, #111a38 0%, #0d1020 55%, #0b0a09 100%)",
  crimson: "linear-gradient(155deg, #380e1a 0%, #1a0a0f 55%, #0b0a09 100%)",
  slate: "linear-gradient(155deg, #1b2024 0%, #121417 55%, #0b0a09 100%)",
};

/** Construit une URL Unsplash optimisée. */
export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const heroMedia = {
  src: img("1470229722913-7c0e2dbbafd3", 2000),
  alt: "Pubblico a un evento live con luci di scena",
  tone: "ember" as Tone,
};

export const ctaMedia = {
  src: img("1459749411175-04bf5292c004"),
  alt: "Palco illuminato durante uno spettacolo dal vivo",
  tone: "ember" as Tone,
};
