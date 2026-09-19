// Manuvo - logica dei rimborsi crediti (anti-faux-leads).
// L'artigiano segnala un contatto falso/irraggiungibile su un lead sbloccato,
// l'admin approva o rifiuta. L'approvazione riaccredita i crediti spesi.
import { prisma } from "@/lib/prisma";

// Delai pendant lequel un artisan peut demander un remboursement apres deblocage.
const REFUND_WINDOW_DAYS = 7;

export class RefundError extends Error {}

// --- Cote artisan : demande de remboursement ---
export async function requestRefund(
  userId: string,
  leadId: string,
  reason: string,
): Promise<void> {
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
      refundReason: reason.trim().slice(0, 500) || null,
      refundRequestedAt: new Date(),
    },
  });
}

// --- Cote admin : liste des demandes en attente ---
export async function getRefundRequests() {
  return prisma.unlock.findMany({
    where: { refundStatus: "REQUESTED" },
    orderBy: { refundRequestedAt: "asc" },
    select: {
      id: true,
      creditsSpent: true,
      refundReason: true,
      refundRequestedAt: true,
      user: { select: { matricule: true, name: true, phone: true, email: true } },
      lead: { select: { category: true, city: true, description: true, contactName: true, contactPhone: true } },
    },
  });
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
