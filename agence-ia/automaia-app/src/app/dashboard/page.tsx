import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

import { signOut } from "./actions";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, studio_id")
    .eq("id", user.id)
    .single();

  const { data: studio } = profile
    ? await supabase.from("studios").select("name, plan").eq("id", profile.studio_id).single()
    : { data: null };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Bentornato{profile?.full_name ? `, ${profile.full_name}` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Studio: {studio?.name ?? "—"} · Piano: {studio?.plan ?? "—"}
          </p>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Esci
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
