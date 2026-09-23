// Manuvo - thread di un artigiano lato admin: lettura + risposta.
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getThread, markThreadReadForAdmin } from "@/lib/messages";
import { formatMatricule, LOCALES, type Locale } from "@/lib/constants";
import { MessageComposer } from "@/components/MessageComposer";
import { sendAdminMessage } from "../actions";

export const metadata = { title: "Manuvo" };

const STR: Record<
  Locale,
  {
    back: string;
    empty: string;
    placeholder: string;
    send: string;
    error: string;
    from_admin: string;
    from_artisan: string;
  }
> = {
  it: {
    back: "Tutti i messaggi",
    empty: "Nessun messaggio in questo thread.",
    placeholder: "Scrivi una risposta...",
    send: "Invia",
    error: "Impossibile inviare. Riprova.",
    from_admin: "Tu (assistenza)",
    from_artisan: "Artigiano",
  },
  fr: {
    back: "Tous les messages",
    empty: "Aucun message dans ce fil.",
    placeholder: "Écris une réponse...",
    send: "Envoyer",
    error: "Envoi impossible. Réessaie.",
    from_admin: "Toi (assistance)",
    from_artisan: "Artisan",
  },
  en: {
    back: "All messages",
    empty: "No messages in this thread.",
    placeholder: "Write a reply...",
    send: "Send",
    error: "Could not send. Try again.",
    from_admin: "You (support)",
    from_artisan: "Artisan",
  },
  de: {
    back: "Alle Nachrichten",
    empty: "Keine Nachrichten in diesem Thread.",
    placeholder: "Antwort schreiben...",
    send: "Senden",
    error: "Senden fehlgeschlagen. Erneut versuchen.",
    from_admin: "Du (Support)",
    from_artisan: "Handwerker",
  },
  ar: {
    back: "كل الرسائل",
    empty: "لا رسائل في هذه المحادثة.",
    placeholder: "اكتب ردًا...",
    send: "إرسال",
    error: "تعذّر الإرسال. حاول مجددًا.",
    from_admin: "أنت (الدعم)",
    from_artisan: "الحرفي",
  },
};

export default async function AdminThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artisan = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, matricule: true, role: true },
  });
  if (!artisan || artisan.role !== "ARTIGIANO") notFound();

  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const s = STR[locale];

  const thread = await getThread(id);
  await markThreadReadForAdmin(id);

  const fmt = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <Link
        href="/admin/messaggi"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-red-700"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        {s.back}
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        {artisan.name}{" "}
        <span className="text-base font-normal text-neutral-400">
          {formatMatricule(artisan.matricule)}
        </span>
      </h1>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        {thread.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-500">{s.empty}</p>
        ) : (
          <ul className="space-y-3">
            {thread.map((m) => (
              <li
                key={m.id}
                className={`flex ${m.fromAdmin ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.fromAdmin
                      ? "bg-red-600 text-white"
                      : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{m.body}</div>
                  <div
                    className={`mt-1 text-[11px] ${
                      m.fromAdmin ? "text-red-100" : "text-neutral-400"
                    }`}
                  >
                    {m.fromAdmin ? s.from_admin : s.from_artisan} · {fmt.format(m.createdAt)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <MessageComposer
          action={sendAdminMessage}
          userId={id}
          placeholder={s.placeholder}
          sendLabel={s.send}
          errorLabel={s.error}
        />
      </div>
    </div>
  );
}
