// Manuvo - logique metier des credits (cote serveur uniquement).
import { prisma } from "@/lib/prisma";

export async function getActivePacks() {
  return prisma.creditPack.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getUserBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

export async function getUserTransactions(userId: string, limit = 20) {
  return prisma.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// Achat d'un pack (paiement simule) : credite le compte + journalise, de facon atomique.
export async function purchasePackForUser(userId: string, packId: string): Promise<number> {
  const pack = await prisma.creditPack.findUnique({ where: { id: packId } });
  if (!pack || !pack.active) {
    throw new Error("PACK_NOT_FOUND");
  }

  const [user] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: pack.credits } },
    }),
    prisma.creditTransaction.create({
      data: {
        userId,
        type: "PURCHASE",
        credits: pack.credits,
        amountEur: pack.priceEur,
        reference: pack.id,
      },
    }),
  ]);

  return user.credits;
}
