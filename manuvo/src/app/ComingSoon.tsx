"use client";

// Manuvo - page « coming soon » (pre-lancement) : hero + capture d'email (waitlist).
import { useActionState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/constants";
import { joinWaitlist, type WaitState } from "./waitlist-actions";

type Strings = {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  placeholder: string;
  button: string;
  success: string;
  invalid: string;
  generic: string;
  follow: string;
};

const S: Record<Locale, Strings> = {
  it: {
    badge: "In arrivo a Rimini",
    title: "Presto a Rimini.",
    subtitle: "La piattaforma che collega privati e artigiani di fiducia. Contatti verificati via SMS, recensioni reali, zero numeri falsi.",
    cta: "Lascia la tua email: sarai tra i primi ad accedere al lancio.",
    placeholder: "La tua email",
    button: "Avvisami al lancio",
    success: "Ci sei! Ti avviseremo appena Manuvo apre a Rimini. 🎉",
    invalid: "Inserisci un'email valida.",
    generic: "Qualcosa è andato storto. Riprova.",
    follow: "Seguici @manuvo.it",
  },
  fr: {
    badge: "Bientôt à Rimini",
    title: "Bientôt à Rimini.",
    subtitle: "La plateforme qui relie particuliers et artisans de confiance. Contacts vérifiés par SMS, avis réels, zéro faux numéro.",
    cta: "Laisse ton email : tu seras parmi les premiers au lancement.",
    placeholder: "Ton email",
    button: "Préviens-moi au lancement",
    success: "C'est bon ! On te préviendra dès l'ouverture de Manuvo à Rimini. 🎉",
    invalid: "Saisis une adresse email valide.",
    generic: "Une erreur est survenue. Réessaie.",
    follow: "Suis-nous @manuvo.it",
  },
  en: {
    badge: "Coming soon to Rimini",
    title: "Coming soon to Rimini.",
    subtitle: "The platform connecting people with trusted local artisans. SMS-verified contacts, real reviews, zero fake numbers.",
    cta: "Leave your email to be among the first at launch.",
    placeholder: "Your email",
    button: "Notify me at launch",
    success: "You're in! We'll let you know as soon as Manuvo opens in Rimini. 🎉",
    invalid: "Enter a valid email.",
    generic: "Something went wrong. Try again.",
    follow: "Follow us @manuvo.it",
  },
  de: {
    badge: "Demnächst in Rimini",
    title: "Demnächst in Rimini.",
    subtitle: "Die Plattform, die Privatleute mit vertrauenswürdigen Handwerkern verbindet. SMS-verifizierte Kontakte, echte Bewertungen, keine Fake-Nummern.",
    cta: "Hinterlasse deine E-Mail und sei beim Start unter den Ersten.",
    placeholder: "Deine E-Mail",
    button: "Beim Start benachrichtigen",
    success: "Geschafft! Wir melden uns, sobald Manuvo in Rimini startet. 🎉",
    invalid: "Gib eine gültige E-Mail ein.",
    generic: "Etwas ist schiefgelaufen. Versuch es erneut.",
    follow: "Folge uns @manuvo.it",
  },
  ar: {
    badge: "قريباً في ريميني",
    title: "قريباً في ريميني.",
    subtitle: "المنصة التي تربط الأفراد بحرفيين موثوقين. جهات اتصال موثّقة عبر SMS، تقييمات حقيقية، بلا أرقام مزيفة.",
    cta: "اترك بريدك الإلكتروني لتكون من الأوائل عند الإطلاق.",
    placeholder: "بريدك الإلكتروني",
    button: "أبلغني عند الإطلاق",
    success: "تم! سنعلمك فور انطلاق Manuvo في ريميني. 🎉",
    invalid: "أدخل بريداً إلكترونياً صحيحاً.",
    generic: "حدث خطأ ما. حاول مجدداً.",
    follow: "تابعنا @manuvo.it",
  },
};

export function ComingSoon({ locale }: { locale: Locale }) {
  const s = S[locale] ?? S.it;
  const [state, formAction, isPending] = useActionState<WaitState, FormData>(joinWaitlist, undefined);
  const errorMsg = state?.error === "invalid" ? s.invalid : state?.error ? s.generic : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#FF5758] text-white">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5">
        {/* Marque rendue en blanc via filtre. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark.svg" alt="Manuvo" className="h-9 w-9 brightness-0 invert" />
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 pb-16">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          {s.badge}
        </span>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{s.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-white/90">{s.subtitle}</p>

        {state?.ok ? (
          <div className="mt-8 rounded-2xl bg-white/15 px-5 py-4 text-base font-semibold">
            {s.success}
          </div>
        ) : (
          <form action={formAction} className="mt-8">
            <p className="mb-3 text-sm font-medium text-white/90">{s.cta}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder={s.placeholder}
                className="w-full rounded-xl border-0 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={isPending}
                className="shrink-0 rounded-xl bg-white px-6 py-3 font-semibold text-[#FF5758] transition hover:bg-neutral-100 disabled:opacity-60"
              >
                {isPending ? "..." : s.button}
              </button>
            </div>
            {errorMsg && <p className="mt-2 text-sm font-medium text-white">{errorMsg}</p>}
          </form>
        )}

        <p className="mt-10 text-sm font-semibold text-white/90">{s.follow}</p>
      </main>
    </div>
  );
}
