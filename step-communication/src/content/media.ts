/**
 * Media centrale del sito (direction cinématographique sportiva).
 *
 * ⚠️ Les `src` sont des PHOTOS STOCK PLACEHOLDER (Unsplash), non vérifiables
 * dans cet environnement. Elles s'affichent quand le site tourne sur une
 * machine ayant accès à Unsplash (ordinateur local ou Vercel).
 *
 * POUR METTRE LES VRAIES PHOTOS:
 *   1. Déposer les fichiers dans /public/images/ (ex: hero.jpg)
 *   2. Remplacer le `src` par le chemin local (ex: src: "/images/hero.jpg")
 *
 * Si une image ne charge pas, un dégradé cinématographique (`tone`) s'affiche
 * automatiquement. Jamais d'image cassée.
 */

export type Tone = "ember" | "gold" | "night" | "crimson" | "slate";

/** Dégradés cinématographiques de secours, façon éclairage de stade. */
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
  // Majorettes in arena - sostituire con la foto reale del cliente: src: "/images/hero.jpg"
  src: img("1546519638-68e109498ffc", 2400),
  alt: "Animazione di majorettes in arena durante un evento sportivo",
  tone: "crimson" as Tone,
};

export const ctaMedia = {
  src: img("1517649763962-0c623066013b"),
  alt: "Atleti in azione durante una competizione sportiva",
  tone: "ember" as Tone,
};
