import crypto from "crypto";

import { NextResponse } from "next/server";

import { createEmailDraft } from "@/lib/email-draft";
import { createAdminClient } from "@/lib/supabase/admin";

// Mailgun signe chaque requête de Route avec HMAC-SHA256(timestamp + token, signing key).
// Empêche quiconque de forger un email au nom d'un autre studio en devinant son adresse.
function isValidMailgunSignature(timestamp: string, token: string, signature: string): boolean {
  const signingKey = process.env.MAILGUN_WEBHOOK_SIGNING_KEY;
  if (!signingKey || !timestamp || !token || !signature) return false;

  const expected = crypto.createHmac("sha256", signingKey).update(timestamp + token).digest("hex");
  return expected === signature;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const timestamp = formData.get("timestamp")?.toString() ?? "";
  const mailgunToken = formData.get("token")?.toString() ?? "";
  const signature = formData.get("signature")?.toString() ?? "";

  if (!isValidMailgunSignature(timestamp, mailgunToken, signature)) {
    return NextResponse.json({ error: "Firma non valida" }, { status: 401 });
  }

  const recipient = formData.get("recipient")?.toString() ?? "";
  const studioToken = recipient.split("@")[0];

  const supabase = createAdminClient();
  const { data: webhookToken } = await supabase
    .from("webhook_tokens")
    .select("studio_id")
    .eq("token", studioToken)
    .maybeSingle();

  if (!webhookToken) {
    return NextResponse.json({ error: "Nessuno studio corrisponde a questo indirizzo" }, { status: 404 });
  }

  const receivedEmail =
    formData.get("stripped-text")?.toString() || formData.get("body-plain")?.toString() || "";

  if (!receivedEmail) {
    return NextResponse.json({ error: "Corpo email mancante" }, { status: 400 });
  }

  const result = await createEmailDraft(supabase, {
    studioId: webhookToken.studio_id,
    receivedEmail,
    senderEmail: formData.get("from")?.toString() ?? formData.get("sender")?.toString(),
    subject: formData.get("subject")?.toString(),
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ id: result.id }, { status: 201 });
}
