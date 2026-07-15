"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { ContactStage } from "@/lib/supabase/types";

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

export async function createContact(formData: FormData) {
  const studioId = await currentStudioId();
  if (!studioId) return;

  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const notes = formData.get("notes") as string;

  const supabase = createClient();
  await supabase.from("contacts").insert({
    studio_id: studioId,
    full_name: fullName,
    email: email || null,
    phone: phone || null,
    notes: notes || null,
  });

  revalidatePath("/dashboard/acquisizione");
}

export async function updateContactStage(contactId: string, stage: ContactStage) {
  const supabase = createClient();
  await supabase.from("contacts").update({ stage }).eq("id", contactId);
  revalidatePath("/dashboard/acquisizione");
}

export async function deleteContact(contactId: string) {
  const supabase = createClient();
  await supabase.from("contacts").delete().eq("id", contactId);
  revalidatePath("/dashboard/acquisizione");
}
