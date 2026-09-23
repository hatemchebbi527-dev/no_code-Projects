// Manuvo - messaggeria in-app admin <-> artigiano (un thread per artigiano).
// Gratuita: nessun credito coinvolto. Solo testo, in-app (nessun SMS).
import { prisma } from "./prisma";

const MAX_LEN = 2000;

// Tutti i messaggi del thread di un artigiano, in ordine cronologico.
export async function getThread(userId: string) {
  return prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    take: 300,
  });
}

// Invia un messaggio nel thread dell'artigiano.
// fromAdmin=false: scritto dall'artigiano ; fromAdmin=true: risposta dell'admin.
export async function sendMessage(
  userId: string,
  fromAdmin: boolean,
  body: string,
): Promise<{ ok: boolean }> {
  const text = body.trim().slice(0, MAX_LEN);
  if (!text) return { ok: false };
  await prisma.message.create({ data: { userId, fromAdmin, body: text } });
  return { ok: true };
}

// --- Lato artigiano ---
export async function getArtisanUnread(userId: string): Promise<number> {
  return prisma.message.count({ where: { userId, fromAdmin: true, readAt: null } });
}

export async function markThreadReadForArtisan(userId: string): Promise<void> {
  await prisma.message.updateMany({
    where: { userId, fromAdmin: true, readAt: null },
    data: { readAt: new Date() },
  });
}

// --- Lato admin ---
export async function getTotalAdminUnread(): Promise<number> {
  return prisma.message.count({ where: { fromAdmin: false, readAt: null } });
}

export async function markThreadReadForAdmin(userId: string): Promise<void> {
  await prisma.message.updateMany({
    where: { userId, fromAdmin: false, readAt: null },
    data: { readAt: new Date() },
  });
}

export type Conversation = {
  userId: string;
  name: string;
  matricule: number;
  lastAt: Date;
  unread: number;
};

// Elenco conversazioni per la casella admin: artigiani con almeno un messaggio,
// piu recenti in cima, con conteggio dei messaggi non letti (scritti dall'artigiano).
export async function getAdminConversations(): Promise<Conversation[]> {
  const grouped = await prisma.message.groupBy({
    by: ["userId"],
    _max: { createdAt: true },
  });
  if (grouped.length === 0) return [];

  const userIds = grouped.map((g) => g.userId);
  const [users, unread] = await Promise.all([
    prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, matricule: true },
    }),
    prisma.message.groupBy({
      by: ["userId"],
      where: { fromAdmin: false, readAt: null },
      _count: { _all: true },
    }),
  ]);

  const userMap = new Map(users.map((u) => [u.id, u]));
  const unreadMap = new Map(unread.map((u) => [u.userId, u._count._all]));

  return grouped
    .map((g) => {
      const u = userMap.get(g.userId);
      return {
        userId: g.userId,
        name: u?.name ?? "",
        matricule: u?.matricule ?? 0,
        lastAt: g._max.createdAt ?? new Date(0),
        unread: unreadMap.get(g.userId) ?? 0,
      };
    })
    .sort((a, b) => b.lastAt.getTime() - a.lastAt.getTime());
}
