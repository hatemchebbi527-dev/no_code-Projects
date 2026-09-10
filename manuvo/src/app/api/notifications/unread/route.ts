// Manuvo - conteggio notifiche non lette (per aggiornare il badge lato client).
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUnreadCount } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ count: 0 }, { status: 401 });
  }
  const count = await getUnreadCount(session.user.id);
  return NextResponse.json({ count }, { headers: { "Cache-Control": "no-store" } });
}
