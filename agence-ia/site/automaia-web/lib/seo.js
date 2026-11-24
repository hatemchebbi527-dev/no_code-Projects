// Helpers SEO multilingues, pilotés par la liste des locales de next-intl.
// Ajouter une langue dans i18n/routing.js suffit : hreflang, canonical et
// og:url s'adaptent automatiquement partout.
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/brand";

// Locale -> valeur Open Graph (og:locale).
const OG_LOCALES = {
  it: "it_IT",
  fr: "fr_FR",
  en: "en_US",
};

export function ogLocale(locale) {
  return OG_LOCALES[locale] || OG_LOCALES[routing.defaultLocale];
}

// Chemin absolu d'une page pour une langue donnée.
// Locale par défaut (it) : pas de préfixe. Autres langues : /<locale>.
export function localizedUrl(path, locale) {
  const suffix = path || "";
  if (locale === routing.defaultLocale) {
    return `${SITE_URL}${suffix}` || `${SITE_URL}/`;
  }
  return `${SITE_URL}/${locale}${suffix}`;
}

// Bloc `alternates` pour l'export metadata : canonical de la langue courante
// + liens hreflang vers toutes les langues + x-default (langue par défaut).
export function buildAlternates(path, locale) {
  const languages = {};
  for (const loc of routing.locales) {
    languages[loc] = localizedUrl(path, loc);
  }
  languages["x-default"] = localizedUrl(path, routing.defaultLocale);

  const canonical =
    locale === routing.defaultLocale
      ? path || "/"
      : `/${locale}${path || ""}`;

  return { canonical, languages };
}

// Bloc `openGraph` complet pour une page.
// ATTENTION : Next.js REMPLACE l'objet openGraph du layout, il ne le fusionne
// pas. Une page qui définit son propre bloc sans `images` perd l'og:image, et
// LinkedIn ou Facebook vont alors piocher une image au hasard dans la page.
// Passer par ce helper évite de réintroduire le problème.
export function buildOpenGraph({ path, locale, title, description, imageAlt }) {
  return {
    type: "website",
    locale: ogLocale(locale),
    siteName: "AutomaIA",
    url: localizedUrl(path, locale),
    title,
    description,
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: imageAlt || title },
    ],
  };
}
