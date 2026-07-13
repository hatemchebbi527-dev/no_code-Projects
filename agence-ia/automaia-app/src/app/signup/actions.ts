"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const studioName = formData.get("studioName") as string;
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { studio_name: studioName, full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.session) {
    redirect("/dashboard");
  }

  redirect("/signup?check_email=1");
}
