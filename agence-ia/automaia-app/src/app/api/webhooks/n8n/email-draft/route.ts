import { NextResponse } from "next/server";

import { anthropic, assertApiKeyIsClean, CLAUDE_MODEL, emailDraftSystemPrompt } from "@/lib/anthropic";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token mancante" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: webhookToken } = await supabase
    .from("webhook_tokens")
    .select("studio_id")
    .eq("token", token)
    .maybeSingle();

  if (!webhookToken) {
    return NextResponse.json({ error: "Token non valido" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const receivedEmail = body?.received_email as string | undefined;

  if (!receivedEmail) {
    return NextResponse.json({ error: "Campo received_email mancante" }, { status: 400 });
  }

  const senderEmail = body?.sender_email as string | undefined;
  const subject = body?.subject as string | undefined;

  let generatedDraft: string;
  try {
    assertApiKeyIsClean();
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: emailDraftSystemPrompt(),
      messages: [{ role: "user", content: receivedEmail }],
    });
    generatedDraft = response.content.find((block) => block.type === "text")?.text ?? "";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { data: draft, error } = await supabase
    .from("email_drafts")
    .insert({
      studio_id: webhookToken.studio_id,
      sender_email: senderEmail ?? null,
      subject: subject ?? null,
      received_email: receivedEmail,
      generated_draft: generatedDraft,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: "Errore nella creazione della bozza" }, { status: 500 });
  }

  return NextResponse.json({ id: draft.id, generated_draft: generatedDraft }, { status: 201 });
}
