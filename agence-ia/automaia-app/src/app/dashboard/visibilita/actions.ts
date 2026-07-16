"use server";

import { revalidatePath } from "next/cache";

import { anthropic, assertApiKeyIsClean, CLAUDE_MODEL, contentGenerationSystemPrompt } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/lib/supabase/types";

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

export async function generateContent(formData: FormData): Promise<{ error?: string }> {
  const studioId = await currentStudioId();
  if (!studioId) return { error: "Sessione non valida. Effettui di nuovo l'accesso." };

  const topic = formData.get("topic") as string;

  try {
    assertApiKeyIsClean();

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: contentGenerationSystemPrompt(),
      messages: [{ role: "user", content: `Argomento del post: ${topic}` }],
    });

    const body = response.content.find((block) => block.type === "text")?.text ?? "";

    const supabase = createClient();
    await supabase.from("content_items").insert({
      studio_id: studioId,
      topic,
      platform: "linkedin",
      body,
      status: "draft",
    });

    revalidatePath("/dashboard/visibilita");
    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Errore sconosciuto." };
  }
}

export async function updateContentStatus(contentId: string, status: ContentStatus) {
  const supabase = createClient();
  await supabase.from("content_items").update({ status }).eq("id", contentId);
  revalidatePath("/dashboard/visibilita");
}
