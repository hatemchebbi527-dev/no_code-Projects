import { NextResponse } from "next/server";

import { createEmailDraft } from "@/lib/email-draft";
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

  const result = await createEmailDraft(supabase, {
    studioId: webhookToken.studio_id,
    receivedEmail,
    senderEmail: body?.sender_email as string | undefined,
    subject: body?.subject as string | undefined,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ id: result.id, generated_draft: result.generatedDraft }, { status: 201 });
}
