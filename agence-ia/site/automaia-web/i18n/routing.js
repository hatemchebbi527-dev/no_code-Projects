import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Langues disponibles sur le site.
  locales: ["it", "fr", "en"],

  // Langue par défaut. L'italien reste sans préfixe (URLs historiques inchangées).
  defaultLocale: "it",

  // 'as-needed' : l'italien reste sur '/', '/servizi'... et le français est
  // préfixé par '/fr', '/fr/servizi'... Preserve le SEO des URLs italiennes.
  localePrefix: "as-needed",
});
