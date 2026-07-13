import { ContactBoard } from "./contact-board";
import { NewContactDialog } from "./new-contact-dialog";
import { createClient } from "@/lib/supabase/server";

export default async function AcquisizionePage() {
  const supabase = createClient();

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Acquisizione clienti</h1>
        <NewContactDialog />
      </div>
      <ContactBoard contacts={contacts ?? []} />
    </div>
  );
}
