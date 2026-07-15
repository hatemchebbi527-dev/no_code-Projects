"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { Automation, AutomationType } from "@/lib/supabase/types";

const AUTOMATION_TYPES: AutomationType[] = [
  "appuntamenti",
  "solleciti",
  "faq",
  "pubblicazione_social",
  "modulo_contatto",
];

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

export async function ensureAutomations(): Promise<Automation[]> {
  const studioId = await currentStudioId();
  if (!studioId) return [];

  const supabase = createClient();
  const { data: existing } = await supabase
    .from("automations")
    .select("*")
    .eq("studio_id", studioId);

  const existingTypes = new Set((existing ?? []).map((a) => a.type));
  const missing = AUTOMATION_TYPES.filter((type) => !existingTypes.has(type));

  if (missing.length > 0) {
    await supabase
      .from("automations")
      .insert(missing.map((type) => ({ studio_id: studioId, type, is_active: false })));

    const { data: refreshed } = await supabase
      .from("automations")
      .select("*")
      .eq("studio_id", studioId);
    return refreshed ?? [];
  }

  return existing ?? [];
}

export async function updateAutomationUrl(automationId: string, url: string) {
  const supabase = createClient();
  await supabase
    .from("automations")
    .update({ n8n_webhook_url: url || null })
    .eq("id", automationId);
  revalidatePath("/dashboard/automazioni");
}

export async function toggleAutomationActive(automationId: string, isActive: boolean) {
  const supabase = createClient();
  await supabase.from("automations").update({ is_active: isActive }).eq("id", automationId);
  revalidatePath("/dashboard/automazioni");
}

export async function testAutomationConnection(automationId: string) {
  const supabase = createClient();
  const { data: automation } = await supabase
    .from("automations")
    .select("n8n_webhook_url")
    .eq("id", automationId)
    .single();

  if (!automation?.n8n_webhook_url) {
    await supabase
      .from("automations")
      .update({ last_run_at: new Date().toISOString(), last_run_status: "error: nessun URL configurato" })
      .eq("id", automationId);
    revalidatePath("/dashboard/automazioni");
    return;
  }

  let status: string;
  try {
    const response = await fetch(automation.n8n_webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: true, source: "automaia" }),
      signal: AbortSignal.timeout(10_000),
    });
    status = response.ok ? "success" : `error: HTTP ${response.status}`;
  } catch (error) {
    status = `error: ${error instanceof Error ? error.message : "connessione fallita"}`;
  }

  await supabase
    .from("automations")
    .update({ last_run_at: new Date().toISOString(), last_run_status: status })
    .eq("id", automationId);

  revalidatePath("/dashboard/automazioni");
}
