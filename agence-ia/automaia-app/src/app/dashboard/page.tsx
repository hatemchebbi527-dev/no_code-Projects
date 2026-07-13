import { StatCard } from "@/components/dashboard/stat-card";
import { createClient } from "@/lib/supabase/server";

export default async function PanoramicaPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("users").select("full_name").eq("id", user.id).single()
    : { data: null };

  const [
    { count: openTasks },
    { count: completedTasks },
    { count: contacts },
    { count: clients },
    { count: contents },
    { count: published },
    { count: pendingDrafts },
  ] = await Promise.all([
    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .in("status", ["da_fare", "in_corso"]),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "completata"),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("stage", "cliente"),
    supabase.from("content_items").select("*", { count: "exact", head: true }),
    supabase
      .from("content_items")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("email_drafts").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const stats = [
    { label: "Attività aperte", value: openTasks ?? 0 },
    { label: "Attività completate", value: completedTasks ?? 0 },
    { label: "Contatti", value: contacts ?? 0 },
    { label: "Clienti", value: clients ?? 0 },
    { label: "Contenuti generati", value: contents ?? 0 },
    { label: "Pubblicati", value: published ?? 0 },
    { label: "Bozze da validare", value: pendingDrafts ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Bentornato{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
}
