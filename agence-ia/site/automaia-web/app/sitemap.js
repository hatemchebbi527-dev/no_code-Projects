// Next.js App Router auto-generates /sitemap.xml from this file.
// Chaque route est déclarée dans les deux langues avec des liens alternates
// (hreflang) pour un référencement multilingue propre.
export default function sitemap() {
  const base = "https://automa-ia.net";
  const routes = ["", "/servizi", "/cliniche", "/chi-sono", "/contatti"];

  return routes.map((route) => {
    const itUrl = `${base}${route}` || base;
    const frUrl = `${base}/fr${route}`;
    return {
      url: itUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          it: itUrl,
          fr: frUrl,
        },
      },
    };
  });
}
