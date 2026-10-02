// Manuvo - config Auth.js "edge-safe" (sans Prisma ni bcrypt).
// Utilisee par proxy.ts (protection des routes) et etendue dans auth.ts.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    // Controle d'acces aux routes protegees (execute dans le proxy).
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const path = nextUrl.pathname;

      // Mode « coming soon » (pre-lancement) : les parcours publics
      // (publier, familles de metiers, inscription artisan) renvoient vers
      // l'accueil, qui affiche la capture d'email. /login et /admin restent ouverts.
      if (
        process.env.COMING_SOON === "1" &&
        (path.startsWith("/pubblica") || path.startsWith("/categorie") || path === "/signup")
      ) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (path.startsWith("/admin")) {
        if (!isLoggedIn) return false; // -> page de login
        if (role !== "ADMIN") return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }
      if (path.startsWith("/dashboard")) return isLoggedIn;
      return true;
    },
    // Injecte id + role dans le token JWT au moment du login.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Expose id + role dans la session cote app.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Le provider Credentials est ajoute dans auth.ts (runtime Node).
} satisfies NextAuthConfig;

export default authConfig;
