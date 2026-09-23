// Manuvo - conteggio messaggi non letti (per aggiornare il badge lato client).
// Artigiano: messaggi dell'admin non letti. Admin: messaggi degli artigiani non letti.
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getArtisanUnread, getTotalAdminUnread } from "@/lib/messages";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ count: 0 }, { status: 401 });
  }
  const count =
    session.user.role === "ADMIN"
      ? await getTotalAdminUnread()
      : await getArtisanUnread(session.user.id);
  return NextResponse.json({ count }, { headers: { "Cache-Control": "no-store" } });
}
