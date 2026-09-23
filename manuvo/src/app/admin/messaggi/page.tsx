// Manuvo - casella messaggi dell'admin: elenco conversazioni con gli artigiani.
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getAdminConversations } from "@/lib/messages";
import { formatMatricule, LOCALES, type Locale } from "@/lib/constants";

export const metadata = { title: "Manuvo" };

const STR: Record<Locale, { title: string; subtitle: string; empty: string }> = {
  it: {
    title: "Messaggi",
    subtitle: "Conversazioni con gli artigiani.",
    empty: "Nessun messaggio dagli artigiani per ora.",
  },
  fr: {
    title: "Messages",
    subtitle: "Conversations avec les artisans.",
    empty: "Aucun message des artisans pour l'instant.",
  },
  en: {
    title: "Messages",
    subtitle: "Conversations with artisans.",
    empty: "No messages from artisans yet.",
  },
  de: {
    title: "Nachrichten",
    subtitle: "Unterhaltungen mit Handwerkern.",
    empty: "Noch keine Nachrichten von Handwerkern.",
  },
  ar: {
    title: "الرسائل",
    subtitle: "المحادثات مع الحرفيين.",
    empty: "لا رسائل من الحرفيين حتى الآن.",
  },
};

export default async function AdminMessaggiPage() {
  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const s = STR[locale];

  const conversations = await getAdminConversations();
  const fmt = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{s.title}</h1>
      <p className="mt-1 text-sm text-neutral-500">{s.subtitle}</p>

      {conversations.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
          {s.empty}
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {conversations.map((c) => (
            <li key={c.userId}>
              <Link
                href={`/admin/messaggi/${c.userId}`}
                className={`flex items-center justify-between gap-3 rounded-xl border p-4 transition hover:bg-neutral-50 ${
                  c.unread > 0 ? "border-red-200 bg-red-50/60" : "border-neutral-200 bg-white"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-semibold">
                    {c.name}{" "}
                    <span className="text-xs font-normal text-neutral-400">
                      {formatMatricule(c.matricule)}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-400">
                    {fmt.format(c.lastAt)}
                  </span>
                </span>
                {c.unread > 0 && (
                  <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold text-white">
                    {c.unread > 9 ? "9+" : c.unread}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
