// Manuvo - middleware : en mode « coming soon », les parcours publics
// (publier une demande, familles de metiers, inscription artisan) renvoient
// vers la page d'accueil (qui affiche la capture d'email). /login et /admin
// restent accessibles pour l'equipe. Pilote par la variable d'env COMING_SOON.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.COMING_SOON === "1") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Ne gate que les parcours publics ; laisse /login, /admin, /dashboard, /legal libres.
  matcher: ["/pubblica/:path*", "/categorie/:path*", "/signup"],
};
