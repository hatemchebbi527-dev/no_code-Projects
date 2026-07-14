"use server";

import crypto from "crypto";

import { revalidatePath } from "next/cache";

import { anthropic, CLAUDE_MODEL, emailDraftSystemPrompt } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";
import type { EmailDraftStatus } from "@/lib/supabase/types";

async function currentStudioId() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("studio_id")
    .eq("id", user.id)
    .single();

  return profile?.studio_id ?? null;
}

export async function getOrCreateWebhookToken(): Promise<string | null> {
  const studioId = await currentStudioId();
  if (!studioId) return null;

  const supabase = createClient();
  const { data: existing } = await supabase
    .from("webhook_tokens")
    .select("token")
    .eq("studio_id", studioId)
    .maybeSingle();

  if (existing) return existing.token;

  const token = crypto.randomBytes(24).toString("hex");
  await supabase.from("webhook_tokens").insert({ studio_id: studioId, token });
  return token;
}

export async function regenerateWebhookToken() {
  const studioId = await currentStudioId();
  if (!studioId) return;

  const supabase = createClient();
  const token = crypto.randomBytes(24).toString("hex");

  const { data: existing } = await supabase
    .from("webhook_tokens")
    .select("id")
    .eq("studio_id", studioId)
    .maybeSingle();

  if (existing) {
    await supabase.from("webhook_tokens").update({ token }).eq("id", existing.id);
  } else {
    await supabase.from("webhook_tokens").insert({ studio_id: studioId, token });
  }

  revalidatePath("/dashboard/bozze-email");
}

export async function generateEmailDraftTest(formData: FormData) {
  const studioId = await currentStudioId();
  if (!studioId) return;

  const receivedEmail = formData.get("receivedEmail") as string;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 1024,
    system: emailDraftSystemPrompt(),
    messages: [{ role: "user", content: receivedEmail }],
  });

  const generatedDraft = response.content.find((block) => block.type === "text")?.text ?? "";

  const supabase = createClient();
  await supabase.from("email_drafts").insert({
    studio_id: studioId,
    received_email: receivedEmail,
    generated_draft: generatedDraft,
    status: "pending",
  });

  revalidatePath("/dashboard/bozze-email");
}

export async function updateDraftStatus(draftId: string, status: EmailDraftStatus) {
  const supabase = createClient();
  await supabase.from("email_drafts").update({ status }).eq("id", draftId);
  revalidatePath("/dashboard/bozze-email");
}
