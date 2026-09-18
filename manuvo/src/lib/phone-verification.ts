// Manuvo - verifica del telefono del privato tramite codice SMS (anti-faux-leads).
// Un codice a 6 cifre viene inviato via SMS e conservato hashato con scadenza.
// Una richiesta e pubblicabile solo se esiste una verifica riuscita e recente.
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { validatePhone } from "@/lib/phone";
import { sendSms } from "@/lib/sms";
import type { CountryCode } from "@/lib/constants";

const CODE_TTL_MIN = 10; // validite du code envoye
const MAX_ATTEMPTS = 5; // essais de saisie du code avant blocage
const VERIFIED_TTL_MIN = 30; // fenetre pendant laquelle une verif permet de publier
const RESEND_COOLDOWN_SEC = 60; // pas plus d'un envoi par minute
const MAX_CODES_PER_HOUR = 5; // plafond d'envois par numero et par heure

function hashCode(phone: string, code: string): string {
  return crypto.createHash("sha256").update(`${phone}:${code}`).digest("hex");
}

export type StartError = "invalid_phone" | "rate_limited" | "sms_failed";
export type StartResult = { ok: true; devCode?: string } | { ok: false; error: StartError };

// Genere un code, l'enregistre hashe et l'envoie par SMS. En mode dev (pas de
// provider), devCode contient le code pour pouvoir tester sans SMS reel.
export async function startPhoneVerification(
  rawPhone: string,
  country: CountryCode,
): Promise<StartResult> {
  const v = validatePhone(rawPhone, country);
  if (!v.ok) return { ok: false, error: "invalid_phone" };
  const phone = v.e164;

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await prisma.phoneVerification.count({
    where: { phone, createdAt: { gt: hourAgo } },
  });
  if (recent >= MAX_CODES_PER_HOUR) return { ok: false, error: "rate_limited" };

  const last = await prisma.phoneVerification.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  if (last && Date.now() - last.createdAt.getTime() < RESEND_COOLDOWN_SEC * 1000) {
    return { ok: false, error: "rate_limited" };
  }

  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = new Date(Date.now() + CODE_TTL_MIN * 60 * 1000);
  await prisma.phoneVerification.create({
    data: { phone, codeHash: hashCode(phone, code), expiresAt },
  });

  const sms = await sendSms(
    phone,
    `Manuvo: il tuo codice di verifica e ${code}. Scade tra ${CODE_TTL_MIN} minuti.`,
  );
  if (!sms.ok) return { ok: false, error: "sms_failed" };
  return { ok: true, devCode: sms.dev ? code : undefined };
}

export type CheckError =
  | "invalid_phone"
  | "no_code"
  | "code_expired"
  | "too_many_attempts"
  | "code_invalid";
export type CheckResult = { ok: true } | { ok: false; error: CheckError };

// Verifie le code saisi contre le dernier code non encore valide pour ce numero.
export async function checkPhoneVerification(
  rawPhone: string,
  country: CountryCode,
  code: string,
): Promise<CheckResult> {
  const v = validatePhone(rawPhone, country);
  if (!v.ok) return { ok: false, error: "invalid_phone" };
  const phone = v.e164;

  const rec = await prisma.phoneVerification.findFirst({
    where: { phone, verifiedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!rec) return { ok: false, error: "no_code" };
  if (rec.expiresAt.getTime() < Date.now()) return { ok: false, error: "code_expired" };
  if (rec.attempts >= MAX_ATTEMPTS) return { ok: false, error: "too_many_attempts" };

  const clean = code.replace(/\D/g, "");
  if (clean.length !== 6 || hashCode(phone, clean) !== rec.codeHash) {
    await prisma.phoneVerification.update({
      where: { id: rec.id },
      data: { attempts: { increment: 1 } },
    });
    return { ok: false, error: "code_invalid" };
  }

  await prisma.phoneVerification.update({
    where: { id: rec.id },
    data: { verifiedAt: new Date() },
  });
  return { ok: true };
}

// Le numero a-t-il ete verifie recemment ? Controle a la soumission de la demande.
export async function isPhoneVerified(
  rawPhone: string,
  country: CountryCode,
): Promise<boolean> {
  const v = validatePhone(rawPhone, country);
  if (!v.ok) return false;
  const since = new Date(Date.now() - VERIFIED_TTL_MIN * 60 * 1000);
  const rec = await prisma.phoneVerification.findFirst({
    where: { phone: v.e164, verifiedAt: { gt: since } },
    select: { id: true },
  });
  return Boolean(rec);
}
