"use server";

import { revalidatePath } from "next/cache";

import { anthropic, CLAUDE_MODEL, contentGenerationSystemPrompt } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";
import type { ContentPlatform, ContentStatus } from "@/lib/supabase/types";

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

export async function generateContent(formData: FormData) {
  const studioId = await currentStudioId();
  if (!studioId) return;

  const topic = formData.get("topic") as string;
  const platform = formData.get("platform") as ContentPlatform;

  const response = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 1024,
    system: contentGenerationSystemPrompt(platform),
    messages: [{ role: "user", content: `Argomento del post: ${topic}` }],
  });

  const body = response.content.find((block) => block.type === "text")?.text ?? "";

  const supabase = createClient();
  await supabase.from("content_items").insert({
    studio_id: studioId,
    topic,
    platform,
    body,
    status: "draft",
  });

  revalidatePath("/dashboard/visibilita");
}

export async function updateContentStatus(contentId: string, status: ContentStatus) {
  const supabase = createClient();
  await supabase.from("content_items").update({ status }).eq("id", contentId);
  revalidatePath("/dashboard/visibilita");
}
