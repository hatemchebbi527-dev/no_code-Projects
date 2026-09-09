"use server";

// Manuvo - actions serveur d'authentification.
import crypto from "node:crypto";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { getTranslations, getLocale } from "next-intl/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { COUNTRIES, isCategory, type CountryCode } from "@/lib/constants";
import { sendEmail, resetPasswordHtml } from "@/lib/email";

export type AuthState = { error?: string } | undefined;
// Etat des flux de reinitialisation (erreur ou succes generique).
export type ResetState = { error?: string; ok?: boolean } | undefined;

const RESET_TTL_MINUTES = 60;

function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

// URL de base pour construire le lien de reset (env AUTH_URL sinon en-tetes de la requete).
async function baseUrl(): Promise<string> {
  if (process.env.AUTH_URL) return process.env.AUTH_URL.replace(/\/+$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

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

// Demande de reinitialisation : envoie un email avec un lien si le compte existe.
// Reponse toujours generique (ne pas divulguer l'existence d'un compte).
export async function requestPasswordReset(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const t = await getTranslations("forgot");
  const email = String(formData.get("email") ?? "").toLowerCase().trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: t("invalid_email") };
  }

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (user) {
    const raw = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + RESET_TTL_MINUTES * 60_000);
    // Invalider les eventuels jetons non utilises avant d'en creer un nouveau.
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });
    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash: hashToken(raw), expiresAt },
    });

    const url = `${await baseUrl()}/reset?token=${raw}`;
    const et = await getTranslations({ locale: await getLocale(), namespace: "emails" });
    await sendEmail({
      to: email,
      subject: et("reset_subject"),
      html: resetPasswordHtml({
        title: et("reset_title"),
        intro: et("reset_intro"),
        button: et("reset_button"),
        url,
        expires: et("reset_expires"),
        ignore: et("reset_ignore"),
      }),
    });
  }

  return { ok: true };
}

// Reinitialisation effective du mot de passe a partir d'un jeton valide.
export async function resetPassword(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const t = await getTranslations("reset");
  const ta = await getTranslations("authErrors");
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: ta("password_short") };
  }
  if (password !== confirm) {
    return { error: ta("password_mismatch") };
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: t("invalid_token") };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  return { ok: true };
}

// Deconnexion.
export async function logout() {
  await signOut({ redirectTo: "/login" });
}
