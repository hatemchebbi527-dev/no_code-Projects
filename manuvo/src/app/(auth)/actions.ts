"use server";

// Manuvo - actions serveur d'authentification.
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";

export type AuthState = { error?: string } | undefined;

// Connexion artisan/admin.
export async function authenticate(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Inserisci email e password." };
  }

  // Destinazione in base al ruolo (l'admin va nel pannello admin).
  const account = await prisma.user.findUnique({
    where: { email },
    select: { role: true },
  });
  const destination = account?.role === "ADMIN" ? "/admin" : "/dashboard";

  try {
    await signIn("credentials", { email, password, redirectTo: destination });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email o password non corretti." };
    }
    throw error; // laisse passer la redirection Next.js
  }
  return undefined;
}

// Inscription d'un nouvel artisan.
export async function registerArtisan(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const city = String(formData.get("city") ?? "").trim();

  if (!name || !email || !password) {
    return { error: "Nome, email e password sono obbligatori." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Indirizzo email non valido." };
  }
  if (password.length < 8) {
    return { error: "La password deve avere almeno 8 caratteri." };
  }
  if (password !== confirm) {
    return { error: "Le password non coincidono." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Esiste gia un account con questa email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "ARTIGIANO",
      name,
      city: city || null,
      credits: 0,
    },
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account creato ma login fallito. Prova ad accedere." };
    }
    throw error;
  }
  return undefined;
}

// Deconnexion.
export async function logout() {
  await signOut({ redirectTo: "/login" });
}
