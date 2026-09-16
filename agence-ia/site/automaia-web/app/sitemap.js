// Next.js App Router auto-generates /sitemap.xml from this file.
// Chaque route est déclarée dans la langue par défaut avec des liens
// alternates (hreflang) vers toutes les langues, pour un référencement
// multilingue propre. Piloté par la liste des locales de next-intl.
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

export default function sitemap() {
  const routes = ["", "/servizi", "/cliniche", "/chi-sono", "/contatti"];

  return routes.map((route) => {
    const languages = {};
    for (const loc of routing.locales) {
      languages[loc] = localizedUrl(route, loc);
    }
    return {
      url: localizedUrl(route, routing.defaultLocale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: { languages },
    };
  });
}
