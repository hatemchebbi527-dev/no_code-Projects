// Manuvo - logica lato server delle richieste (bacheca + sblocco contatti).
import { prisma } from "@/lib/prisma";
import { creditsToEur } from "@/lib/constants";

export type Scope = "national" | "international";

export class UnlockError extends Error {}

// Richieste disponibili per un artigiano (contatto NON incluso = mascherato).
// status OPEN implica gia unlocksCount < maxUnlocks (chiudiamo al raggiungimento del cap).
export async function getAvailableLeads(
  userId: string,
  opts: { scope: Scope; category?: string },
) {
  return prisma.lead.findMany({
    where: {
      status: "OPEN",
      unlocks: { none: { userId } }, // non gia sbloccata da questo artigiano
      ...(opts.scope === "national" ? { country: "IT" } : {}),
      ...(opts.category ? { category: opts.category } : {}),
    },
    select: {
      id: true,
      category: true,
      country: true,
      city: true,
      description: true,
      urgency: true,
      creditCost: true,
      unlocksCount: true,
      maxUnlocks: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// Contatti gia sbloccati dall'artigiano (con coordinate visibili).
export async function getUnlockedLeads(userId: string) {
  const unlocks = await prisma.unlock.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { lead: true },
  });
  return unlocks.map((u) => ({
    unlockedAt: u.createdAt,
    creditsSpent: u.creditsSpent,
    lead: u.lead,
  }));
}

// Sblocco atomico di un contatto. Applica tutte le regole di business.
export async function unlockLead(userId: string, leadId: string) {
  return prisma.$transaction(async (tx) => {
    const lead = await tx.lead.findUnique({ where: { id: leadId } });
    if (!lead || lead.status !== "OPEN") {
      throw new UnlockError("LEAD_UNAVAILABLE");
    }
    if (lead.unlocksCount >= lead.maxUnlocks) {
      throw new UnlockError("LEAD_FULL");
    }

    const already = await tx.unlock.findUnique({
      where: { userId_leadId: { userId, leadId } },
    });
    if (already) throw new UnlockError("ALREADY_UNLOCKED");

    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });
    if (!user) throw new UnlockError("USER_NOT_FOUND");
    if (user.credits < lead.creditCost) {
      throw new UnlockError("INSUFFICIENT_CREDITS");
    }

    // La contrainte unique (userId, leadId) protegge da doppio sblocco concorrente.
    await tx.unlock.create({
      data: { userId, leadId, creditsSpent: lead.creditCost },
    });
    await tx.user.update({
      where: { id: userId },
      data: { credits: { decrement: lead.creditCost } },
    });
    const newCount = lead.unlocksCount + 1;
    await tx.lead.update({
      where: { id: leadId },
      data: {
        unlocksCount: { increment: 1 },
        status: newCount >= lead.maxUnlocks ? "CLOSED" : "OPEN",
      },
    });
    await tx.creditTransaction.create({
      data: {
        userId,
        type: "SPEND",
        credits: -lead.creditCost,
        amountEur: -creditsToEur(lead.creditCost),
        reference: leadId,
      },
    });

    return {
      creditsLeft: user.credits - lead.creditCost,
      contact: {
        name: lead.contactName,
        phone: lead.contactPhone,
        email: lead.contactEmail,
      },
    };
  });
}
