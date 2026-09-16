"use server";

// Manuvo - azioni notifiche: abbonamento push e lettura.
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { markAllRead } from "@/lib/notifications";

type SubInput = { endpoint: string; keys: { p256dh: string; auth: string } };

export async function savePushSubscription(sub: SubInput): Promise<{ ok: boolean }> {
  const session = await auth();
  if (!session?.user) return { ok: false };
  if (!sub?.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) return { ok: false };

  await prisma.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    update: { userId: session.user.id, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    create: {
      userId: session.user.id,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
  });
  return { ok: true };
}

export async function removePushSubscription(endpoint: string): Promise<{ ok: boolean }> {
  const session = await auth();
  if (!session?.user) return { ok: false };
  await prisma.pushSubscription
    .deleteMany({ where: { endpoint, userId: session.user.id } })
    .catch(() => {});
  return { ok: true };
}

export async function markNotificationsRead(): Promise<{ ok: boolean }> {
  const session = await auth();
  if (!session?.user) return { ok: false };
  await markAllRead(session.user.id);
  return { ok: true };
}
