import { createClient } from "@/lib/supabase/server";

export default async function PanoramicaPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("users").select("full_name").eq("id", user.id).single()
    : { data: null };

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Bentornato{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Le statistiche del suo studio saranno disponibili qui a breve.
      </p>
    </div>
  );
}
