// Manuvo - invio Web Push (VAPID). Best effort: se non configurato, non fa nulla.
import webpush from "web-push";
import { prisma } from "./prisma";

const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const rawSubject = process.env.VAPID_SUBJECT ?? "mailto:info@automa-ia.net";
// web-push esige un mailto: o una URL https: normalizziamo (es. una email nuda -> mailto:).
const subject = /^(https?:|mailto:)/i.test(rawSubject) ? rawSubject : `mailto:${rawSubject}`;

let configured = Boolean(publicKey && privateKey);
if (configured) {
  try {
    webpush.setVapidDetails(subject, publicKey as string, privateKey as string);
  } catch (err) {
    // Configurazione VAPID non valida: disattiviamo il push senza rompere l'app.
    console.error("[push] configurazione VAPID non valida, push disattivato:", err);
    configured = false;
  }
}

export const pushConfigured = configured;

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
