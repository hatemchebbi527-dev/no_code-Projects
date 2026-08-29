import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Applique le middleware à tout sauf aux fichiers statiques, à l'API et aux
  // fichiers SEO auto-générés (sitemap, robots).
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
