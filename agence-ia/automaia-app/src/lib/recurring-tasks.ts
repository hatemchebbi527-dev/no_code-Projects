import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, TaskRecurrence } from "@/lib/supabase/types";

const MONTHS_BY_RECURRENCE: Record<TaskRecurrence, number> = {
  none: 0,
  monthly: 1,
  quarterly: 3,
  yearly: 12,
};

// Ajoute des mois en "clampant" au dernier jour du mois cible s'il n'existe pas
// (ex: 31 janvier + 1 mois -> 28 février, pas 3 mars).
export function nextOccurrence(from: string, recurrence: TaskRecurrence): string {
  const [year, month, day] = from.split("-").map(Number);
  const monthsToAdd = MONTHS_BY_RECURRENCE[recurrence];
  const targetMonthIndex = month - 1 + monthsToAdd;

  const daysInTargetMonth = new Date(Date.UTC(year, targetMonthIndex + 1, 0)).getUTCDate();
  const clampedDay = Math.min(day, daysInTargetMonth);

  return new Date(Date.UTC(year, targetMonthIndex, clampedDay)).toISOString().slice(0, 10);
}

// Génère une tâche pour chaque modello arrivé à échéance et avance sa prochaine
// date. Le client passé détermine le périmètre : client admin -> tous les studi
// (cron quotidien), client normal (RLS) -> uniquement le studio de l'utilisateur
// connecté (déclenchement manuel depuis l'app).
export async function generateDueRecurringTasks(
  supabase: SupabaseClient<Database>
): Promise<{ created: number; error?: string }> {
  const today = new Date().toISOString().slice(0, 10);

  const { data: dueTemplates, error } = await supabase
    .from("task_templates")
    .select("*")
    .neq("recurrence", "none")
    .lte("next_due_date", today);

  if (error) return { created: 0, error: error.message };

  let created = 0;

  for (const template of dueTemplates ?? []) {
    if (!template.next_due_date) continue;

    await supabase.from("tasks").insert({
      studio_id: template.studio_id,
      title: template.title,
      description: template.description,
      status: template.default_status,
      due_date: template.next_due_date,
    });

    await supabase
      .from("task_templates")
      .update({ next_due_date: nextOccurrence(template.next_due_date, template.recurrence) })
      .eq("id", template.id);

    created += 1;
  }

  return { created };
}
