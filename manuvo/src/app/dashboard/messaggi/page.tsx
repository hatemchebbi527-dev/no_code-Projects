// Manuvo - messaggeria dell'artigiano: thread con l'assistenza (admin).
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { auth } from "@/auth";
import { getThread, markThreadReadForArtisan } from "@/lib/messages";
import { LOCALES, type Locale } from "@/lib/constants";
import { MessageComposer } from "@/components/MessageComposer";
import { sendArtisanMessage } from "./actions";

export const metadata = { title: "Manuvo" };

const STR: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    empty: string;
    placeholder: string;
    send: string;
    error: string;
    from_admin: string;
    from_you: string;
  }
> = {
  it: {
    title: "Messaggi",
    subtitle: "Scrivi all'assistenza Manuvo. Ti rispondiamo qui.",
    empty: "Nessun messaggio. Scrivi qui sotto per iniziare.",
    placeholder: "Scrivi un messaggio...",
    send: "Invia",
    error: "Impossibile inviare. Riprova.",
    from_admin: "Assistenza",
    from_you: "Tu",
  },
  fr: {
    title: "Messages",
    subtitle: "Écris à l'assistance Manuvo. On te répond ici.",
    empty: "Aucun message. Écris ci-dessous pour commencer.",
    placeholder: "Écris un message...",
    send: "Envoyer",
    error: "Envoi impossible. Réessaie.",
    from_admin: "Assistance",
    from_you: "Toi",
  },
  en: {
    title: "Messages",
    subtitle: "Write to Manuvo support. We reply here.",
    empty: "No messages yet. Write below to start.",
    placeholder: "Write a message...",
    send: "Send",
    error: "Could not send. Try again.",
    from_admin: "Support",
    from_you: "You",
  },
  de: {
    title: "Nachrichten",
    subtitle: "Schreib an den Manuvo-Support. Wir antworten hier.",
    empty: "Noch keine Nachrichten. Schreib unten, um zu starten.",
    placeholder: "Nachricht schreiben...",
    send: "Senden",
    error: "Senden fehlgeschlagen. Erneut versuchen.",
    from_admin: "Support",
    from_you: "Du",
  },
  ar: {
    title: "الرسائل",
    subtitle: "راسل دعم Manuvo. نرد عليك هنا.",
    empty: "لا رسائل بعد. اكتب أدناه للبدء.",
    placeholder: "اكتب رسالة...",
    send: "إرسال",
    error: "تعذّر الإرسال. حاول مجددًا.",
    from_admin: "الدعم",
    from_you: "أنت",
  },
};

export default async function MessaggiPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";
  const s = STR[locale];

  const thread = await getThread(session.user.id);
  // Segna come letti i messaggi dell'admin dopo aver caricato lo stato.
  await markThreadReadForArtisan(session.user.id);

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

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        {thread.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-500">{s.empty}</p>
        ) : (
          <ul className="space-y-3">
            {thread.map((m) => (
              <li
                key={m.id}
                className={`flex ${m.fromAdmin ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.fromAdmin
                      ? "bg-neutral-100 text-neutral-800"
                      : "bg-red-600 text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{m.body}</div>
                  <div
                    className={`mt-1 text-[11px] ${
                      m.fromAdmin ? "text-neutral-400" : "text-red-100"
                    }`}
                  >
                    {m.fromAdmin ? s.from_admin : s.from_you} · {fmt.format(m.createdAt)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <MessageComposer
          action={sendArtisanMessage}
          placeholder={s.placeholder}
          sendLabel={s.send}
          errorLabel={s.error}
        />
      </div>
    </div>
  );
}
