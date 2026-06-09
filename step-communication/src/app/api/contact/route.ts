import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = Record<string, string>;

/**
 * Endpoint del form di contatto.
 *
 * ⚠️ Per ricevere davvero i lead via email, collegare un provider.
 * Esempio con Resend (npm i resend):
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "Sito Step <noreply@stepcommunication.net>",
 *     to: "eventi@stepcommunication.net",
 *     replyTo: data.email,
 *     subject: `Nuova richiesta da ${data.nome}`,
 *     text: JSON.stringify(data, null, 2),
 *   });
 *
 * Finché non è configurato, il lead viene loggato lato server
 * (visibile nei log di Vercel) e l'utente riceve comunque conferma.
 */
export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot anti-spam: se il campo nascosto è compilato, è un bot.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const { nome, email, messaggio, privacy } = data;
  if (!nome || !email || !messaggio || !privacy) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // TODO: collegare l'invio email reale (vedi commento sopra).
  console.log("[contact] nuovo lead:", JSON.stringify(data));

  return NextResponse.json({ ok: true });
}
