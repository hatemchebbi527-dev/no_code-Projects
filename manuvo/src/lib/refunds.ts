// Manuvo - logica dei rimborsi crediti (anti-faux-leads).
// L'artigiano segnala un contatto falso/irraggiungibile su un lead sbloccato,
// l'admin approva o rifiuta. L'approvazione riaccredita i crediti spesi.
import { prisma } from "@/lib/prisma";

// Delai pendant lequel un artisan peut demander un remboursement apres deblocage.
const REFUND_WINDOW_DAYS = 7;

// Motifs valides. "Le client a deja choisi / job pris" n'existe pas ici :
// perdre un client au profit d'un concurrent n'ouvre pas droit a remboursement.
export const REFUND_REASON_CODES = ["FAKE_NUMBER", "NO_ANSWER", "OTHER"] as const;
export type RefundReasonCode = (typeof REFUND_REASON_CODES)[number];

// Etats consideres comme un "signalement" (demande faite, en attente ou aboutie).
const REPORTED = ["REQUESTED", "APPROVED"] as const;
// Tous les etats de signalement (pour la tracabilite / recidive).
const ALL_REPORTED = ["REQUESTED", "APPROVED", "REJECTED"] as const;

export class RefundError extends Error {}

// --- Cote artisan : demande de remboursement ---
export async function requestRefund(
  userId: string,
  leadId: string,
  reasonCode: string,
  note: string,
): Promise<void> {
  if (!(REFUND_REASON_CODES as readonly string[]).includes(reasonCode)) {
    throw new RefundError("INVALID_REASON");
  }
  const unlock = await prisma.unlock.findUnique({
    where: { userId_leadId: { userId, leadId } },
    select: { id: true, refundStatus: true, createdAt: true },
  });
  if (!unlock) throw new RefundError("NOT_FOUND");
  if (unlock.refundStatus !== "NONE") throw new RefundError("ALREADY");

  const deadline = unlock.createdAt.getTime() + REFUND_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  if (Date.now() > deadline) throw new RefundError("WINDOW_EXPIRED");

  await prisma.unlock.update({
    where: { id: unlock.id },
    data: {
      refundStatus: "REQUESTED",
      refundReasonCode: reasonCode,
      refundReason: note.trim().slice(0, 500) || null,
      refundRequestedAt: new Date(),
    },
  });
}

// --- Cote admin : liste des demandes en attente, enrichie pour decider ---
export async function getRefundRequests() {
  const requests = await prisma.unlock.findMany({
    where: { refundStatus: "REQUESTED" },
    orderBy: { refundRequestedAt: "asc" },
    select: {
      id: true,
      userId: true,
      leadId: true,
      creditsSpent: true,
      refundReasonCode: true,
      refundReason: true,
      refundRequestedAt: true,
      user: { select: { matricule: true, name: true, phone: true, email: true } },
      lead: { select: { category: true, city: true, description: true, contactName: true, contactPhone: true } },
    },
  });

  // Enrichissement (corroboration + taux artisan), en quelques requetes groupees.
  const leadIds = [...new Set(requests.map((r) => r.leadId))];
  const userIds = [...new Set(requests.map((r) => r.userId))];

  // Par lead : nb total de deblocages + nb de signalements (REQUESTED/APPROVED).
  const leadTotals = await prisma.unlock.groupBy({
    by: ["leadId"],
    where: { leadId: { in: leadIds } },
    _count: { _all: true },
  });
  const leadReports = await prisma.unlock.groupBy({
    by: ["leadId"],
    where: { leadId: { in: leadIds }, refundStatus: { in: [...REPORTED] } },
    _count: { _all: true },
  });
  // Par artisan : nb total de deblocages + nb de remboursements demandes (tous etats sauf NONE).
  const userTotals = await prisma.unlock.groupBy({
    by: ["userId"],
    where: { userId: { in: userIds } },
    _count: { _all: true },
  });
  const userReports = await prisma.unlock.groupBy({
    by: ["userId"],
    where: { userId: { in: userIds }, refundStatus: { not: "NONE" } },
    _count: { _all: true },
  });

  const map = (rows: { _count: { _all: number } }[], key: "leadId" | "userId") =>
    new Map(rows.map((r) => [(r as Record<string, unknown>)[key] as string, r._count._all]));
  const leadTotalMap = map(leadTotals, "leadId");
  const leadReportMap = map(leadReports, "leadId");
  const userTotalMap = map(userTotals, "userId");
  const userReportMap = map(userReports, "userId");

  return requests.map((r) => ({
    ...r,
    leadUnlockCount: leadTotalMap.get(r.leadId) ?? 1,
    leadReportCount: leadReportMap.get(r.leadId) ?? 1,
    artisanUnlockCount: userTotalMap.get(r.userId) ?? 1,
    artisanReportCount: userReportMap.get(r.userId) ?? 1,
  }));
}

// --- Cote admin : historique des remboursements traites (tracabilite) ---
// Retourne les remboursements APPROVED/REJECTED avec l'artisan et le client,
// plus des compteurs de recidive : combien de signalements partagent le meme
// numero client, et combien pour le meme artisan.
export async function getRefundHistory(limit = 100) {
  const rows = await prisma.unlock.findMany({
    where: { refundStatus: { in: ["APPROVED", "REJECTED"] } },
    orderBy: [{ refundedAt: "desc" }, { refundRequestedAt: "desc" }],
    take: limit,
    select: {
      id: true,
      userId: true,
      creditsSpent: true,
      refundStatus: true,
      refundReasonCode: true,
      refundReason: true,
      refundRequestedAt: true,
      refundedAt: true,
      user: { select: { matricule: true, name: true } },
      lead: { select: { category: true, city: true, contactName: true, contactPhone: true } },
    },
  });

  // Recidive : compte les signalements (tous etats) par numero client et par artisan.
  const reported = await prisma.unlock.findMany({
    where: { refundStatus: { in: [...ALL_REPORTED] } },
    select: { userId: true, lead: { select: { contactPhone: true } } },
  });
  const byPhone = new Map<string, number>();
  const byUser = new Map<string, number>();
  for (const u of reported) {
    const phone = u.lead.contactPhone;
    byPhone.set(phone, (byPhone.get(phone) ?? 0) + 1);
    byUser.set(u.userId, (byUser.get(u.userId) ?? 0) + 1);
  }

  return rows.map((r) => ({
    ...r,
    clientReportCount: byPhone.get(r.lead.contactPhone) ?? 1,
    artisanReportCount: byUser.get(r.userId) ?? 1,
  }));
}

// --- Cote admin : approuver (rembourse les credits) ---
export async function approveRefund(unlockId: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const unlock = await tx.unlock.findUnique({
      where: { id: unlockId },
      select: { id: true, userId: true, leadId: true, creditsSpent: true, refundStatus: true },
    });
    if (!unlock) throw new RefundError("NOT_FOUND");
    if (unlock.refundStatus !== "REQUESTED") throw new RefundError("NOT_PENDING");

    await tx.user.update({
      where: { id: unlock.userId },
      data: { credits: { increment: unlock.creditsSpent } },
    });
    await tx.creditTransaction.create({
      data: {
        userId: unlock.userId,
        type: "REFUND",
        credits: unlock.creditsSpent, // positif : crediti restituiti
        amountEur: 0,
        reference: unlock.leadId,
      },
    });
    await tx.unlock.update({
      where: { id: unlock.id },
      data: { refundStatus: "APPROVED", refundedAt: new Date() },
    });
  });
}

// --- Cote admin : refuser ---
export async function rejectRefund(unlockId: string): Promise<void> {
  const unlock = await prisma.unlock.findUnique({
    where: { id: unlockId },
    select: { refundStatus: true },
  });
  if (!unlock) throw new RefundError("NOT_FOUND");
  if (unlock.refundStatus !== "REQUESTED") throw new RefundError("NOT_PENDING");
  await prisma.unlock.update({
    where: { id: unlockId },
    data: { refundStatus: "REJECTED" },
  });
}
