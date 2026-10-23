"use server";

// Manuvo - actions serveur d'authentification.
import crypto from "node:crypto";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { getTranslations, getLocale } from "next-intl/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import {
  COUNTRIES,
  isCategory,
  isValidPiva,
  normalizePiva,
  isValidPhone,
  normalizePhone,
  parseMatricule,
  WELCOME_CREDITS,
  REFERRAL_CREDITS,
  REFERRALS_PER_MONTH_CAP,
  type CountryCode,
} from "@/lib/constants";
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
  const piva = normalizePiva(String(formData.get("piva") ?? ""));
  const phone = normalizePhone(String(formData.get("phone") ?? ""));
  // Metiers : liste de cases cochees, on ne garde que les codes valides et uniques.
  const categories = [...new Set(formData.getAll("categories").map(String))].filter(isCategory);
  // Code de parrainage facultatif : le matricule du parrain (ART-0001).
  const refRaw = String(formData.get("ref") ?? "").trim();

  if (!name || !email || !password) {
    return { error: t("required") };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: t("invalid_email") };
  }
  if (categories.length === 0) {
    return { error: t("no_category") };
  }
  if (!phone) {
    return { error: t("phone_required") };
  }
  if (!isValidPhone(phone)) {
    return { error: t("phone_invalid") };
  }
  if (!piva) {
    return { error: t("piva_required") };
  }
  if (!isValidPiva(piva)) {
    return { error: t("piva_invalid") };
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

  // Anti-abus : une meme Partita IVA ne peut recevoir les credits de bienvenue qu'une seule fois.
  const pivaTaken = await prisma.user.findUnique({ where: { piva }, select: { id: true } });
  if (pivaTaken) {
    return { error: t("piva_exists") };
  }

  // Parrainage : on resout le parrain avant de creer le compte, pour pouvoir
  // refuser un code inexistant plutot que de le perdre en silence.
  let referrer: { id: string; piva: string | null; email: string; role: string } | null = null;
  if (refRaw) {
    const matricule = parseMatricule(refRaw);
    if (matricule === null) {
      return { error: t("ref_invalid") };
    }
    referrer = await prisma.user.findUnique({
      where: { matricule },
      select: { id: true, piva: true, email: true, role: true },
    });
    if (!referrer || referrer.role !== "ARTIGIANO") {
      return { error: t("ref_unknown") };
    }
    // Auto-parrainage : meme email ou meme P.IVA que le compte en cours de creation.
    if (referrer.email === email || (referrer.piva !== null && referrer.piva === piva)) {
      return { error: t("ref_self") };
    }
  }

  // Plafond anti-abus : au-dela de REFERRALS_PER_MONTH_CAP filleuls sur 30 jours,
  // l'attribution reste enregistree (elle alimente le KPI parrainage) mais les
  // credits ne sont pas verses. Le filleul n'est jamais penalise pour le quota du parrain.
  let rewardReferrer = false;
  if (referrer) {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recent = await prisma.user.count({
      where: { referredById: referrer.id, createdAt: { gte: since } },
    });
    rewardReferrer = recent < REFERRALS_PER_MONTH_CAP;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const referrerId = referrer?.id ?? null;
  try {
    await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          email,
          passwordHash,
          role: "ARTIGIANO",
          name,
          piva,
          phone,
          city: city || null,
          country,
          categories: categories.join(","),
          credits: WELCOME_CREDITS,
          referredById: referrerId,
          // Credits de bienvenue traces comme BONUS (exclus du chiffre d'affaires).
          transactions: {
            create: {
              type: "BONUS",
              credits: WELCOME_CREDITS,
              amountEur: 0,
              reference: "welcome",
            },
          },
        },
        select: { id: true },
      });

      if (referrerId && rewardReferrer) {
        // Le credit tombe a l'inscription du filleul, pas a son premier achat.
        await tx.user.update({
          where: { id: referrerId },
          data: { credits: { increment: REFERRAL_CREDITS } },
        });
        await tx.creditTransaction.create({
          data: {
            userId: referrerId,
            type: "BONUS",
            credits: REFERRAL_CREDITS,
            amountEur: 0,
            reference: `referral:${created.id}`,
          },
        });
      }
    });
  } catch (error) {
    // Course entre deux inscriptions simultanees avec la meme P.IVA/email : l'index unique tranche.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      const target = String((error as { meta?: { target?: unknown } }).meta?.target ?? "");
      return { error: target.includes("piva") ? t("piva_exists") : t("email_exists") };
    }
    throw error;
  }

  try {
    // registered=1 : declenche l'evenement Meta "CompleteRegistration" une fois arrive sur le dashboard.
    await signIn("credentials", { email, password, redirectTo: "/dashboard?registered=1" });
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
