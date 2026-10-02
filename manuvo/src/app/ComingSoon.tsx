"use client";

// Manuvo - page « coming soon » (pre-lancement) : hero + capture d'email (waitlist).
import { useActionState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/constants";
import { joinWaitlist } from "./waitlist-actions";

type WaitState = { ok?: boolean; error?: string } | undefined;

// Liens vers les reseaux sociaux (modifiables ici si les URLs changent).
const SOCIAL = {
  facebook: "https://www.facebook.com/manuvo.it",
  instagram: "https://www.instagram.com/manuvo.it",
  tiktok: "https://www.tiktok.com/@manuvo.it",
};

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
    follow: "Seguici",
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
    follow: "Suis-nous",
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
    follow: "Follow us",
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
    follow: "Folge uns",
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
    follow: "تابعنا",
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

        {/* Icones reseaux sociaux cliquables (Facebook, Instagram, TikTok). */}
        <div className="mt-4 flex items-center gap-3">
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
            </svg>
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.95c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.32a4.57 4.57 0 1 0 0 9.14 4.57 4.57 0 0 0 0-9.14Zm0 7.54a2.97 2.97 0 1 1 0-5.94 2.97 2.97 0 0 1 0 5.94Zm5.82-7.74a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0Z" />
            </svg>
          </a>
          <a
            href={SOCIAL.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
              <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.53 2.53 0 0 1-2.53 2.45 2.53 2.53 0 0 1-.4-5.03v-3.15a5.64 5.64 0 0 0-5.1 5.61A5.64 5.64 0 0 0 10.06 21a5.64 5.64 0 0 0 5.64-5.64V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.4-1.48Z" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}
