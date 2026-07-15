import { ContentForm } from "./content-form";
import { ContentLibrary } from "./content-library";
import { createClient } from "@/lib/supabase/server";

export default async function VisibilitaPage() {
  const supabase = createClient();

  const { data: items } = await supabase
    .from("content_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Posizionamento e visibilità</h1>
      <ContentForm />
      <div>
        <h2 className="mb-4 text-lg font-semibold">Contenuti generati</h2>
        <ContentLibrary items={items ?? []} />
      </div>
    </div>
  );
}
