import type { SupabaseClient } from "@supabase/supabase-js";

import { anthropic, assertApiKeyIsClean, CLAUDE_MODEL, emailDraftSystemPrompt } from "@/lib/anthropic";
import type { Database } from "@/lib/supabase/types";

export async function createEmailDraft(
  supabase: SupabaseClient<Database>,
  params: { studioId: string; receivedEmail: string; senderEmail?: string | null; subject?: string | null }
): Promise<{ id: string; generatedDraft: string } | { error: string }> {
  let generatedDraft: string;
  try {
    assertApiKeyIsClean();
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: emailDraftSystemPrompt(),
      messages: [{ role: "user", content: params.receivedEmail }],
    });
    generatedDraft = response.content.find((block) => block.type === "text")?.text ?? "";
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Errore sconosciuto." };
  }

  const { data, error } = await supabase
    .from("email_drafts")
    .insert({
      studio_id: params.studioId,
      sender_email: params.senderEmail ?? null,
      subject: params.subject ?? null,
      received_email: params.receivedEmail,
      generated_draft: generatedDraft,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  return { id: data.id, generatedDraft };
}
