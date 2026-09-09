// Manuvo - notifiche: creazione mirata (mestiere + paese) e lettura.
import { prisma } from "./prisma";
import { sendPushToUser } from "./push";

type LeadLike = { id: string; category: string; country: string; city: string };

// Notifica gli artigiani il cui mestiere e paese corrispondono alla richiesta.
export async function notifyMatchingArtisans(lead: LeadLike): Promise<void> {
  // Candidati: stesso paese e categorie che contengono (come sottostringa) il codice.
  const candidates = await prisma.user.findMany({
    where: {
      role: "ARTIGIANO",
      country: lead.country,
      categories: { contains: lead.category },
    },
    select: { id: true, categories: true },
  });
  // Filtro preciso: la categoria deve essere un elemento della lista, non una sottostringa.
  const matches = candidates.filter((u) =>
    u.categories.split(",").map((c) => c.trim()).includes(lead.category),
  );
  if (matches.length === 0) return;

  await prisma.notification.createMany({
    data: matches.map((u) => ({ userId: u.id, leadId: lead.id })),
    skipDuplicates: true,
  });

  // Push best effort. Testo generico in italiano (nessun dato personale del privato).
  const payload = {
    title: "Manuvo",
    body: "Una nuova richiesta corrisponde ai tuoi mestieri nella tua zona.",
    url: "/dashboard/notifiche",
  };
  await Promise.all(matches.map((u) => sendPushToUser(u.id, payload)));
}

export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({ where: { userId, readAt: null } });
}

export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      lead: { select: { id: true, category: true, city: true, country: true, status: true } },
    },
  });
}

export async function markAllRead(userId: string): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
}
