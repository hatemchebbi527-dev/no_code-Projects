import { redirect } from "next/navigation";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    ? await supabase.from("studios").select("name").eq("id", profile.studio_id).single()
    : { data: null };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar studioName={studio?.name ?? "—"} userName={profile?.full_name ?? null} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
