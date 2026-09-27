"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"

const content = {
  fr: {
    title: "Réclamations, assistance et urgences",
    updated: "Dernière mise à jour : septembre 2026",
    intro: "MY HOPE STEP BY NAJLA s'engage à fournir une assistance efficace à chaque étape du voyage. Vous trouverez ci-dessous les canaux de contact et les procédures pour signaler un problème, demander de l'aide ou déposer une réclamation formelle.",
    beforeTitle: "Avant le départ",
    beforeText: "Pour tout problème, clarification ou modification avant le départ, contactez-nous via les canaux suivants :",
    emailLabel: "Email",
    phoneLabel: "Téléphone / WhatsApp",
    beforeNote: "Nous vous demandons de nous contacter le plus tôt possible pour nous permettre de trouver des solutions adaptées. Les demandes de modification sont soumises aux conditions d'annulation et pénalités prévues dans le contrat de voyage.",
    duringTitle: "Pendant le voyage",
    during1: "En cas de problème pendant le voyage, il est essentiel de signaler immédiatement le désagrément au prestataire du service (hôtel, transporteur, guide local) et d'en informer simultanément MY HOPE STEP BY NAJLA.",
    during2: "Le signalement rapide est une obligation prévue par le droit du tourisme et permet au voyageur de demander des solutions de remplacement sur place. MY HOPE STEP BY NAJLA, en tant qu'organisateur, est tenu de prêter assistance lorsque le voyageur se trouve en difficulté.",
    during3: "Pour les urgences pendant le voyage, contactez-nous immédiatement aux coordonnées indiquées lors de la réservation et dans les documents de voyage.",
    formalTitle: "Réclamations formelles",
    formalIntro: "Le voyageur a le droit de déposer une réclamation pour toute inexécution ou mauvaise exécution des services inclus dans le forfait touristique.",
    howTitle: "Comment déposer une réclamation",
    howText: "La réclamation doit être présentée par écrit (par email ou lettre recommandée avec accusé de réception) dans un délai maximum de 10 jours ouvrables à compter de la date de retour du voyage. Une réclamation tardive peut affecter l'évaluation du droit à indemnisation.",
    sendTitle: "La réclamation écrite doit être envoyée à :",
    sendItems: [
      "Email : prenotazioni@myhope-step.com",
      "PEC : chebbinajla@pec.it",
      "Courrier recommandé : CHEBBI NAJLA – MY HOPE STEP BY NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologne (BO)",
    ],
    contentTitle: "Contenu de la réclamation",
    contentText: "La réclamation doit contenir : nom et prénom du réclamant, numéro de réservation ou référence du contrat, date et destination du voyage, description détaillée du problème rencontré, éventuelle documentation à l'appui (photos, reçus, correspondance avec les prestataires), et indication de la solution ou de l'indemnisation demandée.",
    responseTitle: "Délais de réponse",
    responseText: "MY HOPE STEP BY NAJLA s'engage à fournir une réponse écrite dans un délai de 30 jours ouvrables à compter de la réception de la réclamation. En cas d'enquêtes complexes impliquant des fournisseurs tiers, les délais pourraient être prolongés, avec communication préalable à l'intéressé.",
    adrTitle: "Résolution alternative des litiges (ADR/ODR)",
    adrIntro: "En cas de litige non résolu à l'amiable, le consommateur peut recourir aux instruments de résolution alternative des litiges (ADR) :",
    adrItems: [
      "Plateforme ODR européenne : ec.europa.eu/consumers/odr — pour les consommateurs résidant dans l'Union européenne souhaitant résoudre en ligne des litiges avec des opérateurs touristiques",
      "Arbitrage et médiation : auprès des Chambres de Commerce compétentes ou d'organismes de médiation",
      "Conciliation touristique : certains consortiums et associations professionnelles proposent des services de conciliation spécialisés",
    ],
    adrNote: "Le droit du consommateur de saisir l'autorité judiciaire compétente reste réservé.",
    insolvencyTitle: "Protection en cas d'insolvabilité",
    insolvency1: "En cas d'insolvabilité ou de faillite de MY HOPE STEP BY NAJLA, les voyageurs sont protégés par le Fonds consortial de garantie VACANZE GARANTITE®, certificat n° 2026092813AT.",
    insolvencyContact: "Pour demander un remboursement ou un rapatriement en cas d'insolvabilité, contactez directement :",
    insolvencyItems: [
      "Consorzio Vacanze Garantite, Via Enrico Cosenz 54/B, 20158 Milan",
      "Email : info@vacanzegarantite.it",
      "Site : www.vacanzegarantite.it",
      "Téléphone : +39 02 8717 7065",
    ],
  },
  it: {
    title: "Reclami, assistenza ed emergenze",
    updated: "Ultimo aggiornamento: settembre 2026",
    intro: "MY HOPE STEP BY NAJLA si impegna a garantire un'assistenza efficace in ogni fase del viaggio. Di seguito trovi i canali di contatto e le procedure per segnalare problemi, richiedere assistenza o presentare un reclamo formale.",
    beforeTitle: "Prima della partenza",
    beforeText: "Per qualsiasi problema, chiarimento o modifica prima della partenza, contattaci attraverso i seguenti canali:",
    emailLabel: "Email",
    phoneLabel: "Telefono / WhatsApp",
    beforeNote: "Ti chiediamo di contattarci il prima possibile per permetterci di trovare soluzioni adeguate. Le richieste di modifica sono soggette alle condizioni di cancellazione e penali previste nel contratto di viaggio.",
    duringTitle: "Durante il viaggio",
    during1: "In caso di problemi durante il viaggio, è fondamentale segnalare immediatamente il disguido al fornitore del servizio (hotel, vettore, guida locale) e contestualmente informare MY HOPE STEP BY NAJLA.",
    during2: "La segnalazione tempestiva è un obbligo previsto dall'art. 47 del Codice del Turismo (D.Lgs. 79/2011) e consente al viaggiatore di richiedere soluzioni sostitutive in loco. MY HOPE STEP BY NAJLA, in qualità di organizzatore, è tenuto a prestare assistenza qualora il viaggiatore si trovi in difficoltà.",
    during3: "Per emergenze durante il viaggio, contattaci immediatamente ai recapiti indicati in fase di prenotazione e indicati nella documentazione di viaggio.",
    formalTitle: "Reclami formali",
    formalIntro: "Ai sensi dell'art. 49 del Codice del Turismo, il viaggiatore ha diritto di presentare reclamo per ogni mancata o inesatta esecuzione dei servizi inclusi nel pacchetto turistico.",
    howTitle: "Come presentare un reclamo",
    howText: "Il reclamo deve essere presentato per iscritto (via e-mail o lettera raccomandata A/R) entro e non oltre 10 giorni lavorativi dalla data del rientro dal viaggio. Il reclamo tardivo può influire sulla valutazione del diritto al risarcimento.",
    sendTitle: "Il reclamo scritto deve essere inviato a:",
    sendItems: [
      "Email: prenotazioni@myhope-step.com",
      "PEC: chebbinajla@pec.it",
      "Posta raccomandata: CHEBBI NAJLA – MY HOPE STEP BY NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologna (BO)",
    ],
    contentTitle: "Contenuto del reclamo",
    contentText: "Il reclamo deve contenere: nome e cognome del reclamante, numero di prenotazione o riferimento del contratto, data e destinazione del viaggio, descrizione dettagliata del problema riscontrato, eventuale documentazione a supporto (fotografie, ricevute, corrispondenza con i fornitori), e indicazione della soluzione o del risarcimento richiesto.",
    responseTitle: "Tempi di risposta",
    responseText: "MY HOPE STEP BY NAJLA si impegna a fornire un riscontro scritto entro 30 giorni lavorativi dalla ricezione del reclamo. In caso di indagini complesse che richiedano il coinvolgimento di fornitori terzi, i tempi potrebbero prolungarsi, previa comunicazione all'interessato.",
    adrTitle: "Risoluzione alternativa delle controversie (ADR/ODR)",
    adrIntro: "In caso di controversie non risolte in via amichevole, il consumatore può avvalersi degli strumenti di risoluzione alternativa delle controversie (ADR):",
    adrItems: [
      "Piattaforma ODR europea: ec.europa.eu/consumers/odr — per i consumatori residenti nell'Unione Europea che desiderano risolvere online le controversie con operatori turistici",
      "Arbitrato e mediazione: presso le Camere di Commercio competenti o organismi di mediazione accreditati",
      "Conciliazione turistica: alcuni consorzi e associazioni di categoria offrono servizi di conciliazione specializzati",
    ],
    adrNote: "Resta salvo il diritto del consumatore di adire l'autorità giudiziaria competente.",
    insolvencyTitle: "Protezione in caso di insolvenza",
    insolvency1: "In caso di insolvenza o fallimento di MY HOPE STEP BY NAJLA, i viaggiatori sono protetti dal Fondo Consortile di Garanzia VACANZE GARANTITE®, certificato n. 2026092813AT.",
    insolvencyContact: "Per richiedere il rimborso o il rimpatrio in caso di insolvenza, contattare direttamente:",
    insolvencyItems: [
      "Consorzio Vacanze Garantite, Via Enrico Cosenz 54/B, 20158 Milano",
      "Email: info@vacanzegarantite.it",
      "Sito: www.vacanzegarantite.it",
      "Telefono: +39 02 8717 7065",
    ],
  },
}

export default function ReclamiPage() {
  const { lang } = useI18n()
  const c = content[lang === "it" ? "it" : "fr"]
  const isAr = lang === "ar"

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2" dir={isAr ? "rtl" : "ltr"}>
            {isAr ? "الشكاوى والمساعدة" : c.title}
          </h1>
          <p className="text-xs text-neutral-500 mb-8">{c.updated}</p>
          {isAr && (
            <p className="text-sm text-neutral-500 mb-4 text-right" dir="rtl">
              المحتوى القانوني متاح باللغة الفرنسية
            </p>
          )}
          <p className="text-sm text-neutral-600 leading-relaxed">{c.intro}</p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.beforeTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.beforeText}</p>
          <ul className="text-sm text-neutral-600 mt-4 space-y-2 list-none pl-0">
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold shrink-0">{c.emailLabel}</span>
              <a href="mailto:prenotazioni@myhope-step.com" className="text-cyan-600 hover:underline">prenotazioni@myhope-step.com</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold shrink-0">{c.phoneLabel}</span>
              <a href="https://wa.me/393522723625" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">+39 352 272 36 25</a>
            </li>
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-4">{c.beforeNote}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.duringTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.during1}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.during2}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.during3}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.formalTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.formalIntro}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.howTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.howText}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.sendTitle}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.sendItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.contentTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.contentText}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.responseTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.responseText}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.adrTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.adrIntro}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2 list-disc list-inside">
            {c.adrItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.adrNote}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.insolvencyTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.insolvency1}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.insolvencyContact}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.insolvencyItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

        </div>
      </main>
      <Footer />
    </>
  )
}
