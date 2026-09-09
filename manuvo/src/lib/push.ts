// Manuvo - invio Web Push (VAPID). Best effort: se non configurato, non fa nulla.
import webpush from "web-push";
import { prisma } from "./prisma";

const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const subject = process.env.VAPID_SUBJECT ?? "mailto:info@automa-ia.net";

export const pushConfigured = Boolean(publicKey && privateKey);
if (pushConfigured) {
  webpush.setVapidDetails(subject, publicKey as string, privateKey as string);
}

export type PushPayload = { title: string; body: string; url?: string };

export async function sendPushToUser(userId: string, payload: PushPayload): Promise<void> {
  if (!pushConfigured) return;
  const subs = await prisma.pushSubscription.findMany({ where: { userId } });
  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify(payload),
        );
      } catch (err: unknown) {
        const code = (err as { statusCode?: number })?.statusCode;
        // Abbonamento non piu valido: lo rimuoviamo.
        if (code === 404 || code === 410) {
          await prisma.pushSubscription.delete({ where: { id: s.id } }).catch(() => {});
        } else {
          console.error("[push] invio fallito:", code ?? err);
        }
      }
    }),
  );
}
