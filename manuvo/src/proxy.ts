// Manuvo - proxy (ex-middleware, renomme en Next.js 16).
// Protege les routes selon le callback `authorized` de auth.config.ts.
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // S'applique a tout sauf API, fichiers statiques et images.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|svg|ico)$).*)"],
};
