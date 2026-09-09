"use server";

// Manuvo - actions serveur d'authentification.
import { AuthError } from "next-auth";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { COUNTRIES, isCategory, type CountryCode } from "@/lib/constants";

export type AuthState = { error?: string } | undefined;

// Connexion artisan/admin.
export async function authenticate(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const t = await getTranslations("authErrors");
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: t("missing") };
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
      return { error: t("invalid") };
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
  const t = await getTranslations("authErrors");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const city = String(formData.get("city") ?? "").trim();
  const countryRaw = String(formData.get("country") ?? "IT").trim().toUpperCase();
  const country: CountryCode = (COUNTRIES as readonly string[]).includes(countryRaw)
    ? (countryRaw as CountryCode)
    : "IT";
  // Metiers : liste de cases cochees, on ne garde que les codes valides et uniques.
  const categories = [...new Set(formData.getAll("categories").map(String))].filter(isCategory);

  if (!name || !email || !password) {
    return { error: t("required") };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: t("invalid_email") };
  }
  if (categories.length === 0) {
    return { error: t("no_category") };
  }
  if (password.length < 8) {
    return { error: t("password_short") };
  }
  if (password !== confirm) {
    return { error: t("password_mismatch") };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: t("email_exists") };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "ARTIGIANO",
      name,
      city: city || null,
      country,
      categories: categories.join(","),
      credits: 0,
    },
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: t("created_login_failed") };
    }
    throw error;
  }
  return undefined;
}

// Deconnexion.
export async function logout() {
  await signOut({ redirectTo: "/login" });
}
