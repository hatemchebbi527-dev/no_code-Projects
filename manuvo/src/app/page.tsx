// Manuvo - landing: hero, come funziona (con foto), famiglie di mestieri (tuiles avec photo), privati/artigiani, CTA, footer.
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoWordmark } from "@/components/LogoWordmark";
import { FamilyTile } from "@/components/FamilyTile";
import { StepImage } from "@/components/StepImage";
import { LOCALES, type Locale } from "@/lib/constants";
import { CATEGORY_ICON } from "@/lib/category-icons";
import { FAMILIES, FAMILY_LABEL, FAMILY_SLUG } from "@/lib/category-groups";
import { CATEGORY_PHOTO } from "@/lib/category-photos";
import { FAMILY_PHOTO } from "@/lib/family-photos";
import { HOW_PHOTO } from "@/lib/how-photos";
import { LEGAL, type LegalSlug } from "@/lib/legal";

const LEGAL_LINKS: LegalSlug[] = ["privacy", "termini", "cookie", "note"];

const SERVIZI_WORD: Record<Locale, string> = {
  it: "servizi",
  fr: "services",
  en: "services",
  de: "Leistungen",
  ar: "خدمات",
};

type FaqContent = { title: string; items: { q: string; a: string }[] };

const FAQ_STRINGS: Record<Locale, FaqContent> = {
  it: {
    title: "Domande frequenti",
    items: [
      {
        q: "Devo creare un account per pubblicare una richiesta?",
        a: "No. Pubblichi la tua richiesta senza registrazione: sono gli artigiani a contattarti.",
      },
      {
        q: "Quanto costa per chi cerca un artigiano?",
        a: "È gratuito per i privati. Paghi solo il lavoro concordato direttamente con l'artigiano.",
      },
      {
        q: "Come faccio a essere sicuro che i contatti siano reali?",
        a: "Ogni cliente verifica il proprio numero con un codice SMS prima di pubblicare: un numero falso non supera la verifica. E se un contatto sbloccato risulta falso o irraggiungibile, ti rimborsiamo i crediti. Con Manuvo non paghi mai per un falso contatto.",
      },
      {
        q: "Come funzionano i crediti?",
        a: "1 credito = 2 €. Sbloccare un contatto costa da 3 a 5 crediti, e ogni richiesta è visibile al massimo a 3 artigiani.",
      },
      {
        q: "C'è un importo minimo per ricaricare i crediti?",
        a: "No. La ricarica è libera, nessun minimo imposto: aggiungi i crediti che vuoi, quando vuoi.",
      },
      {
        q: "Come ricevo le richieste dei clienti?",
        a: "Ricevi una notifica quando una richiesta corrisponde al tuo mestiere e alla tua zona. Sblocchi solo i contatti che ti interessano.",
      },
      {
        q: "Cos'è il badge «artigiano verificato»?",
        a: "Gli artigiani con Partita IVA e recensioni positive dei clienti ottengono un badge di fiducia: così i privati sanno subito con chi hanno a che fare.",
      },
    ],
  },
  fr: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Dois-je créer un compte pour publier une demande ?",
        a: "Non. Vous publiez votre demande sans inscription : ce sont les artisans qui vous contactent.",
      },
      {
        q: "Combien ça coûte pour celui qui cherche un artisan ?",
        a: "C'est gratuit pour les particuliers. Vous payez seulement le travail convenu directement avec l'artisan.",
      },
      {
        q: "Comment être sûr que les contacts sont réels ?",
        a: "Chaque client vérifie son numéro avec un code SMS avant de publier : un faux numéro ne passe pas la vérification. Et si un contact débloqué s'avère faux ou injoignable, nous vous remboursons les crédits. Avec Manuvo, vous ne payez jamais pour un faux contact.",
      },
      {
        q: "Comment fonctionnent les crédits ?",
        a: "1 crédit = 2 €. Débloquer un contact coûte de 3 à 5 crédits, et chaque demande est visible par 3 artisans maximum.",
      },
      {
        q: "Y a-t-il un montant minimum pour recharger les crédits ?",
        a: "Non. La recharge est libre, aucun minimum imposé : ajoutez les crédits que vous voulez, quand vous voulez.",
      },
      {
        q: "Comment je reçois les demandes des clients ?",
        a: "Vous recevez une notification quand une demande correspond à votre métier et à votre zone. Vous débloquez seulement les contacts qui vous intéressent.",
      },
      {
        q: "Qu'est-ce que le badge «artisan vérifié» ?",
        a: "Les artisans avec numéro de TVA et avis positifs de clients obtiennent un badge de confiance : ainsi les particuliers savent tout de suite à qui ils ont affaire.",
      },
    ],
  },
  en: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Do I need an account to post a request?",
        a: "No. You post your request without signing up: it's the artisans who contact you.",
      },
      {
        q: "How much does it cost for someone looking for an artisan?",
        a: "It's free for individuals. You only pay for the work agreed directly with the artisan.",
      },
      {
        q: "How can I be sure the contacts are real?",
        a: "Every client verifies their number with an SMS code before posting: a fake number won't pass verification. And if an unlocked contact turns out to be fake or unreachable, we refund your credits. With Manuvo, you never pay for a fake contact.",
      },
      {
        q: "How do credits work?",
        a: "1 credit = €2. Unlocking a contact costs 3 to 5 credits, and each request is visible to a maximum of 3 artisans.",
      },
      {
        q: "Is there a minimum amount to top up credits?",
        a: "No. Top-up is free, with no minimum imposed: add as many credits as you want, whenever you want.",
      },
      {
        q: "How do I receive client requests?",
        a: "You get a notification when a request matches your trade and area. You only unlock the contacts you're interested in.",
      },
      {
        q: "What is the “verified artisan” badge?",
        a: "Artisans with a VAT number and positive client reviews earn a trust badge, so individuals know right away who they're dealing with.",
      },
    ],
  },
  de: {
    title: "Häufige Fragen",
    items: [
      {
        q: "Muss ich ein Konto erstellen, um eine Anfrage zu veröffentlichen?",
        a: "Nein. Sie veröffentlichen Ihre Anfrage ohne Registrierung: Die Handwerker kontaktieren Sie.",
      },
      {
        q: "Wie viel kostet es für jemanden, der einen Handwerker sucht?",
        a: "Für Privatpersonen ist es kostenlos. Sie zahlen nur die direkt mit dem Handwerker vereinbarte Arbeit.",
      },
      {
        q: "Wie kann ich sicher sein, dass die Kontakte echt sind?",
        a: "Jeder Kunde bestätigt seine Nummer vor der Veröffentlichung mit einem SMS-Code: Eine falsche Nummer besteht die Prüfung nicht. Und wenn ein freigeschalteter Kontakt sich als falsch oder nicht erreichbar herausstellt, erstatten wir Ihnen die Credits. Mit Manuvo zahlen Sie nie für einen falschen Kontakt.",
      },
      {
        q: "Wie funktionieren die Credits?",
        a: "1 Credit = 2 €. Das Freischalten eines Kontakts kostet 3 bis 5 Credits, und jede Anfrage ist für höchstens 3 Handwerker sichtbar.",
      },
      {
        q: "Gibt es einen Mindestbetrag zum Aufladen der Credits?",
        a: "Nein. Das Aufladen ist frei, kein Mindestbetrag vorgeschrieben: Fügen Sie so viele Credits hinzu, wie Sie möchten, wann Sie möchten.",
      },
      {
        q: "Wie erhalte ich Kundenanfragen?",
        a: "Sie erhalten eine Benachrichtigung, wenn eine Anfrage zu Ihrem Beruf und Ihrer Region passt. Sie schalten nur die Kontakte frei, die Sie interessieren.",
      },
      {
        q: "Was ist das Abzeichen „verifizierter Handwerker“?",
        a: "Handwerker mit Umsatzsteuer-Nummer und positiven Kundenbewertungen erhalten ein Vertrauensabzeichen, damit Privatpersonen sofort wissen, mit wem sie es zu tun haben.",
      },
    ],
  },
  ar: {
    title: "الأسئلة الشائعة",
    items: [
      {
        q: "هل يجب أن أنشئ حسابًا لنشر طلب؟",
        a: "لا. تنشر طلبك دون تسجيل: الحرفيون هم من يتواصلون معك.",
      },
      {
        q: "كم تبلغ التكلفة لمن يبحث عن حرفي؟",
        a: "مجاني للأفراد. تدفع فقط مقابل العمل المتفق عليه مباشرة مع الحرفي.",
      },
      {
        q: "كيف أتأكد من أن جهات الاتصال حقيقية؟",
        a: "يتحقق كل عميل من رقمه برمز عبر الرسائل القصيرة قبل النشر: الرقم المزيف لا يجتاز التحقق. وإذا تبيّن أن جهة اتصال مفتوحة مزيفة أو يتعذر الوصول إليها، نعيد لك الأرصدة. مع Manuvo لا تدفع أبدًا مقابل جهة اتصال مزيفة.",
      },
      {
        q: "كيف تعمل الأرصدة؟",
        a: "رصيد واحد = 2 يورو. فتح جهة اتصال يكلف من 3 إلى 5 أرصدة، وكل طلب يظهر لثلاثة حرفيين كحد أقصى.",
      },
      {
        q: "هل هناك حد أدنى لإعادة شحن الأرصدة؟",
        a: "لا. الشحن حر، دون حد أدنى مفروض: أضف ما تشاء من الأرصدة، متى شئت.",
      },
      {
        q: "كيف أستقبل طلبات العملاء؟",
        a: "يصلك إشعار عندما يتطابق طلب مع مهنتك ومنطقتك. تفتح فقط جهات الاتصال التي تهمّك.",
      },
      {
        q: "ما هي شارة «الحرفي الموثّق»؟",
        a: "يحصل الحرفيون الذين لديهم رقم ضريبة القيمة المضافة وتقييمات إيجابية من العملاء على شارة ثقة، حتى يعرف الأفراد فورًا مع من يتعاملون.",
      },
    ],
  },
};

export default async function Home() {
  const t = await getTranslations("home");
  const tl = await getTranslations("landing");
  const localeRaw = await getLocale();
  const locale = (LOCALES as readonly string[]).includes(localeRaw)
    ? (localeRaw as Locale)
    : "it";

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1b1e24]">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <span className="flex items-center">
          <LogoWordmark className="h-9 w-auto" />
        </span>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="inline-block whitespace-nowrap rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 sm:border-transparent sm:bg-transparent sm:px-4 sm:hover:bg-white"
          >
            {t("login_link")}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -end-24 -top-24 h-96 w-96 rounded-full bg-red-100 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -start-24 top-40 h-80 w-80 rounded-full bg-amber-100 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-sm font-semibold text-red-700">
            {tl("eyebrow")}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">{t("hero_subtitle")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pubblica"
              className="rounded-xl bg-red-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-red-800"
            >
              {t("cta_publish")}
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-neutral-300 bg-white px-6 py-3.5 font-semibold transition hover:bg-neutral-50"
            >
              {t("cta_artisan")}
            </Link>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {tl("how_title")}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <StepImage src={HOW_PHOTO[n - 1]} alt={tl(`how${n}_t`)} />
              <div className="p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-red-50 font-display text-xl font-extrabold text-red-700">
                  {n}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{tl(`how${n}_t`)}</h3>
                <p className="mt-2 text-neutral-600">{tl(`how${n}_d`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Famiglie di mestieri (tuiles avec photo vers /categorie/[slug]) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tl("cats_title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-neutral-600">{tl("cats_sub")}</p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {FAMILIES.map((fam) => (
              <Link
                key={fam.key}
                href={`/categorie/${FAMILY_SLUG[fam.key]}`}
                className="group block"
              >
                <FamilyTile
                  src={FAMILY_PHOTO[fam.key] ?? CATEGORY_PHOTO[fam.categories[0]]}
                  label={FAMILY_LABEL[locale][fam.key]}
                  meta={`${fam.categories.length} ${SERVIZI_WORD[locale]}`}
                  grad={fam.grad}
                  iconPath={CATEGORY_ICON[fam.categories[0]]}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privati / Artigiani */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold">{tl("priv_title")}</h3>
            <p className="mt-3 grow text-neutral-600">{tl("priv_desc")}</p>
            <Link
              href="/pubblica"
              className="mt-6 inline-flex w-fit rounded-xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              {tl("priv_cta")}
            </Link>
          </div>
          <div className="flex flex-col rounded-2xl border border-neutral-900 bg-neutral-900 p-8 text-white shadow-sm">
            <h3 className="font-display text-2xl font-bold">{tl("art_title")}</h3>
            <p className="mt-3 grow text-neutral-300">{tl("art_desc")}</p>
            <Link
              href="/signup"
              className="mt-6 inline-flex w-fit rounded-xl bg-white px-5 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              {tl("art_cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ (accordéon, sans JS via <details>) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {FAQ_STRINGS[locale].title}
          </h2>
          <div className="mt-10 space-y-3">
            {FAQ_STRINGS[locale].items.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-neutral-200 bg-[#FAF8F4] px-5 open:bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="shrink-0 text-red-700 transition-transform group-open:rotate-45"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="pb-5 text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-red-700 py-16 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tl("band_title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-red-100">{tl("band_sub")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pubblica"
              className="rounded-xl bg-white px-6 py-3.5 font-semibold text-red-700 transition hover:bg-red-50"
            >
              {t("cta_publish")}
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-red-300 px-6 py-3.5 font-semibold text-white transition hover:bg-red-800"
            >
              {t("cta_artisan")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <span className="flex items-center">
            <LogoWordmark className="h-7 w-auto" />
          </span>
          <p className="text-sm text-neutral-500">{tl("footer")}</p>
          <Link href="/login" className="text-sm font-semibold text-red-700 hover:underline">
            {t("login_link")}
          </Link>
        </div>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-neutral-500">
          {LEGAL_LINKS.map((s) => (
            <Link key={s} href={`/legal/${s}`} className="hover:text-red-700 hover:underline">
              {LEGAL[s][locale].title}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
