// Manuvo - notifiche: creazione mirata (mestiere + paese) e lettura.
import { prisma } from "./prisma";
import { sendPushToUser } from "./push";
import { sendEmail, adminNoticeHtml } from "./email";

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

// Notifica tutti gli admin per OGNI nuova richiesta (senza filtro).
export async function notifyAdmins(lead: LeadLike): Promise<void> {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true },
  });
  if (admins.length === 0) return;

  await prisma.notification.createMany({
    data: admins.map((a) => ({ userId: a.id, leadId: lead.id })),
    skipDuplicates: true,
  });

  const payload = {
    title: "Manuvo",
    body: "Nuova richiesta pubblicata.",
    url: "/admin/notifiche",
  };
  await Promise.all(admins.map((a) => sendPushToUser(a.id, payload)));
}

// Etichette dei motivi di rimborso (lato admin, in italiano).
const REFUND_REASON_LABEL: Record<string, string> = {
  FAKE_NUMBER: "Numero falso",
  NO_ANSWER: "Irraggiungibile",
  OTHER: "Altro",
};

// Avvisa gli admin (email + push) di una nuova richiesta di rimborso,
// cosi non serve aprire l'interfaccia per accorgersene.
// Best effort: non deve mai bloccare la richiesta dell'artigiano.
export async function notifyAdminsRefundRequest(params: {
  artisanId: string;
  leadId: string;
  reasonCode: string;
  note: string;
  baseUrl: string;
}): Promise<void> {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, email: true },
  });
  if (admins.length === 0) return;

  const [artisan, lead] = await Promise.all([
    prisma.user.findUnique({
      where: { id: params.artisanId },
      select: { matricule: true, name: true },
    }),
    prisma.lead.findUnique({
      where: { id: params.leadId },
      select: { category: true, city: true },
    }),
  ]);

  const artisanRef = artisan
    ? `ART-${String(artisan.matricule).padStart(4, "0")} - ${artisan.name}`
    : params.artisanId;
  const leadRef = lead ? `${lead.category} - ${lead.city}` : params.leadId;
  const reasonLabel = REFUND_REASON_LABEL[params.reasonCode] ?? params.reasonCode;

  // Email a ogni admin (best effort).
  const url = `${params.baseUrl}/admin/rimborsi`;
  const lines = [
    `<b>Artigiano:</b> ${artisanRef}`,
    `<b>Richiesta:</b> ${leadRef}`,
    `<b>Motivo:</b> ${reasonLabel}`,
    ...(params.note.trim() ? [`<b>Nota:</b> ${params.note.trim()}`] : []),
  ];
  const html = adminNoticeHtml({
    title: "Nuova richiesta di rimborso",
    lines,
    button: "Apri i rimborsi",
    url,
  });
  await Promise.all(
    admins
      .filter((a) => a.email)
      .map((a) =>
        sendEmail({ to: a.email, subject: "Manuvo · Nuova richiesta di rimborso", html }),
      ),
  );

  // Push best effort.
  await Promise.all(
    admins.map((a) =>
      sendPushToUser(a.id, {
        title: "Manuvo",
        body: `Nuova richiesta di rimborso da ${artisanRef}.`,
        url: "/admin/rimborsi",
      }),
    ),
  );
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
