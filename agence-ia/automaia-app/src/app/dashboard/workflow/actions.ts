"use server";

import { revalidatePath } from "next/cache";

import { generateDueRecurringTasks } from "@/lib/recurring-tasks";
import { createClient } from "@/lib/supabase/server";
import type { TaskRecurrence, TaskStatus } from "@/lib/supabase/types";

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

export async function createTask(formData: FormData) {
  const studioId = await currentStudioId();
  if (!studioId) return;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("dueDate") as string;

  const supabase = createClient();
  await supabase.from("tasks").insert({
    studio_id: studioId,
    title,
    description: description || null,
    due_date: dueDate || null,
  });

  revalidatePath("/dashboard/workflow");
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const supabase = createClient();
  await supabase.from("tasks").update({ status }).eq("id", taskId);
  revalidatePath("/dashboard/workflow");
}

export async function deleteTask(taskId: string) {
  const supabase = createClient();
  await supabase.from("tasks").delete().eq("id", taskId);
  revalidatePath("/dashboard/workflow");
}

export async function createTaskTemplate(formData: FormData): Promise<{ error?: string }> {
  const studioId = await currentStudioId();
  if (!studioId) return { error: "Sessione non valida. Effettui di nuovo l'accesso." };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const recurrence = formData.get("recurrence") as TaskRecurrence;
  const nextDueDate = formData.get("nextDueDate") as string;

  const supabase = createClient();
  const { error } = await supabase.from("task_templates").insert({
    studio_id: studioId,
    title,
    description: description || null,
    recurrence,
    next_due_date: recurrence !== "none" && nextDueDate ? nextDueDate : null,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/workflow");
  return {};
}

export async function createTaskFromTemplate(templateId: string) {
  const supabase = createClient();
  const { data: template } = await supabase
    .from("task_templates")
    .select("studio_id, title, description, default_status, next_due_date")
    .eq("id", templateId)
    .single();

  if (!template) return;

  await supabase.from("tasks").insert({
    studio_id: template.studio_id,
    title: template.title,
    description: template.description,
    status: template.default_status,
    due_date: template.next_due_date,
  });

  revalidatePath("/dashboard/workflow");
}

export async function deleteTaskTemplate(templateId: string) {
  const supabase = createClient();
  await supabase.from("task_templates").delete().eq("id", templateId);
  revalidatePath("/dashboard/workflow");
}

// Force la génération immédiate des tâches dont l'échéance est passée, sans
// attendre le cron quotidien (utile pour tester une récurrence tout de suite).
export async function runDueTemplatesNow(): Promise<{ created: number; error?: string }> {
  const supabase = createClient();
  const result = await generateDueRecurringTasks(supabase);
  if (!result.error) revalidatePath("/dashboard/workflow");
  return result;
}
