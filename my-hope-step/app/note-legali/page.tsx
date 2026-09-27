"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"

const content = {
  fr: {
    title: "Mentions légales",
    infoTitle: "Informations légales",
    ownerTitle: "Propriétaire du site et opérateur",
    ownerText: "Le site www.myhope-step.com est géré par CHEBBI NAJLA, entreprise individuelle opérant sous l'enseigne commerciale MY HOPE STEP BY NAJLA, dont le siège social est situé Via Alfredo Calzoni 1/3, 40128 Bologne (BO), Italie.",
    ownerItems: [
      "N° TVA IT : 04405401201",
      "Code fiscal : CHBNJL70H66Z352Y",
      "Numéro REA : BO-690782",
      "PEC : chebbinajla@pec.it",
      "Email : prenotazioni@myhope-step.com",
      "Téléphone : +39 352 272 36 25",
      "Propriétaire et directrice technique : Najla Chebbi",
    ],
    coverTitle: "Couvertures obligatoires",
    cover1: "Responsabilité civile professionnelle : Bene Assicurazioni S.p.A. Società Benefit, police n° 10099091000157, du 11 septembre 2026 au 11 septembre 2027, plafond de 2 100 000 € pour les garanties indiquées dans la police.",
    cover2: "Protection en cas d'insolvabilité ou de faillite : Fonds consortial de garantie VACANZE GARANTITE®, certificat n° 2026092813AT, du 15 septembre 2026 au 15 septembre 2027. Contacts : Consorzio Vacanze Garantite, Via Enrico Cosenz 54/B, 20158 Milan ; info@vacanzegarantite.it ; www.vacanzegarantite.it ; tél. +39 02 8717 7065.",
    useTitle: "Conditions d'utilisation du site",
    sections: [
      {
        title: "Objet et acceptation",
        text: "Les présentes conditions régissent l'accès et l'utilisation du site www.myhope-step.com. La consultation du site implique l'acceptation des présentes conditions d'utilisation ; la conclusion d'un contrat de voyage est régie par les conditions contractuelles spécifiques disponibles avant la réservation.",
      },
      {
        title: "Informations et disponibilité",
        text: "MY HOPE STEP BY NAJLA veille à la mise à jour des informations publiées, mais les prix, disponibilités, horaires, itinéraires, conditions d'entrée et services tiers peuvent évoluer. Une offre ne devient contraignante qu'après la confirmation écrite de la réservation et le paiement requis. Les images peuvent avoir une finalité illustrative, sauf indication contraire.",
      },
      {
        title: "Utilisation licite et propriété intellectuelle",
        text: "L'utilisateur s'engage à utiliser le site de manière licite, à ne pas interférer avec son fonctionnement et à ne pas saisir de données fausses ou appartenant à des tiers sans autorisation. Les textes, graphiques, marques, photographies et matériaux sont protégés par les droits de leurs titulaires respectifs. Leur utilisation ou reproduction n'est autorisée que dans les limites prévues par la loi ou après autorisation écrite préalable.",
      },
      {
        title: "Liens et services tiers",
        text: "Le site peut contenir des liens vers des transporteurs, des hébergeurs, des tours opérateurs, des compagnies d'assurance, PayPal ou d'autres tiers. Les sites et services tiers sont soumis à leurs propres conditions et politiques. MY HOPE STEP BY NAJLA reste responsable dans les limites prévues par la loi et le rôle assumé dans chaque contrat.",
      },
      {
        title: "Continuité du service",
        text: "Le site peut être temporairement suspendu pour maintenance, sécurité ou raisons techniques. Aucune clause des présentes conditions n'exclut ni ne limite les responsabilités qui ne peuvent être exclues ou limitées par la loi.",
      },
      {
        title: "Droit applicable",
        text: "Les présentes conditions sont régies par le droit italien. Pour le consommateur, le tribunal du lieu de résidence ou de domicile est compétent lorsque la réglementation impérative le prévoit. Les droits supplémentaires accordés au consommateur par la loi du pays de l'Union européenne dans lequel il réside habituellement restent réservés, si applicable.",
      },
    ],
  },
  it: {
    title: "Note legali",
    infoTitle: "Informazioni legali",
    ownerTitle: "Titolare del sito e operatore economico",
    ownerText: "Il sito www.myhope-step.com è gestito da CHEBBI NAJLA, impresa individuale operante con l'insegna commerciale MY HOPE STEP BY NAJLA, con sede legale in Via Alfredo Calzoni 1/3, 40128 Bologna (BO), Italia.",
    ownerItems: [
      "Partita IVA: 04405401201",
      "Codice fiscale: CHBNJL70H66Z352Y",
      "Numero REA: BO-690782",
      "PEC: chebbinajla@pec.it",
      "Email: prenotazioni@myhope-step.com",
      "Telefono: +39 352 272 36 25",
      "Titolare e direttrice tecnica: Najla Chebbi",
    ],
    coverTitle: "Coperture obbligatorie",
    cover1: "Responsabilità civile professionale: Bene Assicurazioni S.p.A. Società Benefit, polizza n. 10099091000157, durata dal 11 settembre 2026 al 11 settembre 2027, massimale di euro 2.100.000 per le garanzie indicate in polizza.",
    cover2: "Protezione in caso di insolvenza o fallimento: Fondo Consortile di Garanzia VACANZE GARANTITE®, certificato n. 2026092813AT, durata dal 15 settembre 2026 al 15 settembre 2027. Contatti: Consorzio Vacanze Garantite, Via Enrico Cosenz 54/B, 20158 Milano; info@vacanzegarantite.it; www.vacanzegarantite.it; tel. +39 02 8717 7065.",
    useTitle: "Condizioni d'uso del sito",
    sections: [
      {
        title: "Oggetto e accettazione",
        text: "Le presenti condizioni disciplinano l'accesso e l'utilizzo del sito www.myhope-step.com. La consultazione del sito comporta l'accettazione delle presenti condizioni d'uso; la conclusione di un contratto di viaggio è invece disciplinata dalle specifiche condizioni contrattuali rese disponibili prima della prenotazione.",
      },
      {
        title: "Informazioni e disponibilità",
        text: "MY HOPE STEP BY NAJLA cura l'aggiornamento delle informazioni pubblicate, ma prezzi, disponibilità, orari, itinerari, requisiti di ingresso e servizi di terzi possono cambiare. Un'offerta diventa vincolante solo dopo la conferma scritta della prenotazione e il pagamento previsto. Le immagini possono avere finalità illustrative, salvo che siano espressamente indicate come elemento contrattuale.",
      },
      {
        title: "Uso lecito e proprietà intellettuale",
        text: "L'utente si impegna a utilizzare il sito in modo lecito, a non interferire con il suo funzionamento e a non inserire dati falsi o di terzi senza autorizzazione. Testi, grafica, marchi, fotografie e materiali sono protetti dai diritti dei rispettivi titolari. Il loro utilizzo o riproduzione è consentito soltanto nei limiti autorizzati dalla legge o previa autorizzazione scritta.",
      },
      {
        title: "Collegamenti e servizi di terzi",
        text: "Il sito può contenere collegamenti a vettori, strutture ricettive, tour operator, compagnie assicurative, PayPal o altri terzi. I siti e i servizi di terzi sono soggetti alle rispettive condizioni e informative. MY HOPE STEP BY NAJLA resta responsabile nei limiti previsti dalla legge e dal ruolo assunto nel singolo contratto.",
      },
      {
        title: "Continuità del servizio",
        text: "Il sito può essere temporaneamente sospeso per manutenzione, sicurezza o cause tecniche. Nessuna clausola delle presenti condizioni esclude o limita responsabilità che non possono essere escluse o limitate dalla legge.",
      },
      {
        title: "Legge applicabile",
        text: "Le presenti condizioni sono regolate dalla legge italiana. Per il consumatore resta competente il giudice del luogo di residenza o domicilio, quando previsto dalla normativa inderogabile. Restano salvi gli ulteriori diritti riconosciuti al consumatore dalla legge del Paese dell'Unione europea in cui risiede abitualmente, se applicabili.",
      },
    ],
  },
}

const arTitles: Record<string, string> = {
  "note-legali": "المعلومات القانونية",
  "privacy-policy": "سياسة الخصوصية",
  "cookie-policy": "سياسة ملفات تعريف الارتباط",
  "condizioni-di-vendita": "شروط البيع والحجز",
  "reclami": "الشكاوى والمساعدة",
}

export default function NoteLegaliPage() {
  const { lang } = useI18n()
  const c = content[lang === "it" ? "it" : "fr"]
  const isAr = lang === "ar"

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2" dir={isAr ? "rtl" : "ltr"}>
            {isAr ? arTitles["note-legali"] : c.title}
          </h1>
          {isAr && (
            <p className="text-sm text-neutral-500 mb-6 text-right" dir="rtl">
              المحتوى القانوني متاح باللغة الفرنسية
            </p>
          )}

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.infoTitle}</h2>
          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.ownerTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.ownerText}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.ownerItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.coverTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.cover1}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.cover2}</p>

          <hr className="my-10 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.useTitle}</h2>

          {c.sections.map((s) => (
            <div key={s.title}>
              <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{s.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{s.text}</p>
            </div>
          ))}

        </div>
      </main>
      <Footer />
    </>
  )
}
