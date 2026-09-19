// Manuvo - avis client (etoiles). L'artigiano che ha trattato la richiesta
// chiede una recensione ; il link viene inviato via SMS al cliente (l'artigiano
// non lo vede : niente auto-recensioni). Base del futuro badge "artisan verifie".
import crypto from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendSms } from "@/lib/sms";

const RESEND_COOLDOWN_SEC = 60;

export class ReviewError extends Error {}

async function baseUrl(): Promise<string> {
  if (process.env.AUTH_URL) return process.env.AUTH_URL.replace(/\/+$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export type RequestReviewResult = { ok: true; dev: boolean } | { ok: false; error: string };

// L'artisan (qui a debloque la demande) demande un avis au client.
export async function requestReview(
  artisanId: string,
  leadId: string,
): Promise<RequestReviewResult> {
  // Seul un artisan ayant debloque ce lead peut demander un avis.
  const unlock = await prisma.unlock.findUnique({
    where: { userId_leadId: { userId: artisanId, leadId } },
    select: { id: true },
  });
  if (!unlock) return { ok: false, error: "not_unlocked" };

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { contactPhone: true },
  });
  if (!lead) return { ok: false, error: "not_found" };

  const artisan = await prisma.user.findUnique({
    where: { id: artisanId },
    select: { name: true },
  });

  const existing = await prisma.review.findUnique({
    where: { artisanId_leadId: { artisanId, leadId } },
    select: { id: true, token: true, submittedAt: true, createdAt: true },
  });
  if (existing?.submittedAt) return { ok: false, error: "already_reviewed" };

  let token = existing?.token;
  if (existing) {
    // Renvoi : anti-spam (1 SMS par minute).
    if (Date.now() - existing.createdAt.getTime() < RESEND_COOLDOWN_SEC * 1000) {
      return { ok: false, error: "rate_limited" };
    }
    await prisma.review.update({ where: { id: existing.id }, data: { createdAt: new Date() } });
  } else {
    token = crypto.randomBytes(24).toString("hex");
    await prisma.review.create({ data: { artisanId, leadId, token } });
  }

  const link = `${await baseUrl()}/recensione/${token}`;
  const who = artisan?.name ? ` con ${artisan.name}` : "";
  const sms = await sendSms(
    lead.contactPhone,
    `Manuvo: com'e andato il lavoro${who}? Lascia una recensione qui: ${link}`,
  );
  if (!sms.ok) return { ok: false, error: "sms_failed" };
  return { ok: true, dev: sms.dev };
}

// --- Page publique d'avis ---
export async function getReviewByToken(token: string) {
  return prisma.review.findUnique({
    where: { token },
    select: {
      id: true,
      rating: true,
      submittedAt: true,
      artisan: { select: { name: true } },
    },
  });
}

export async function submitReview(
  token: string,
  rating: number,
  comment: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "invalid_rating" };
  }
  const review = await prisma.review.findUnique({
    where: { token },
    select: { id: true, submittedAt: true },
  });
  if (!review) return { ok: false, error: "not_found" };
  if (review.submittedAt) return { ok: false, error: "already" };

  await prisma.review.update({
    where: { id: review.id },
    data: { rating, comment: comment.trim().slice(0, 500) || null, submittedAt: new Date() },
  });
  return { ok: true };
}
