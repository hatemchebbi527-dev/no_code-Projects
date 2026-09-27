"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"

const tableRows = {
  fr: [
    { treatment: "Demandes de devis et d'informations", purpose: "Répondre aux demandes reçues via le formulaire de contact ou d'autres canaux", basis: "Mesures précontractuelles à la demande de la personne concernée (art. 6.1.b RGPD)", retention: "12 mois à compter de la réponse, sauf conversion en réservation" },
    { treatment: "Réservation et exécution du contrat de voyage", purpose: "Conclure et gérer le contrat de forfait touristique ou de service individuel, y compris les relations avec les fournisseurs", basis: "Exécution du contrat (art. 6.1.b RGPD) ; pour données médicales et religieuses, consentement explicite (art. 9.2.a RGPD)", retention: "10 ans à compter de la fin de la relation contractuelle (obligations civiles)" },
    { treatment: "Comptabilité et obligations fiscales", purpose: "Émission de factures, enregistrements comptables et obligations fiscales", basis: "Obligation légale (art. 6.1.c RGPD)", retention: "10 ans conformément à la législation fiscale italienne" },
    { treatment: "Service client et gestion des réclamations", purpose: "Répondre aux demandes d'assistance avant, pendant et après le voyage ; gérer les réclamations et litiges", basis: "Exécution du contrat / intérêt légitime (art. 6.1.b-f RGPD)", retention: "3 ans à compter de la clôture de la réclamation" },
    { treatment: "Newsletter et communications commerciales", purpose: "Envoi d'offres, de promotions et de mises à jour sur les destinations", basis: "Consentement (art. 6.1.a RGPD), révocable à tout moment", retention: "Jusqu'à la révocation du consentement ou après 2 ans d'inactivité" },
    { treatment: "Sécurité du site et journaux techniques", purpose: "Garantir la sécurité informatique, prévenir les abus et les dysfonctionnements", basis: "Intérêt légitime (art. 6.1.f RGPD)", retention: "30 jours, sauf nécessité de conservation pour enquêtes" },
  ],
  it: [
    { treatment: "Richieste di preventivi e informazioni", purpose: "Rispondere alle richieste ricevute tramite il modulo di contatto o altri canali", basis: "Misure precontrattuali su richiesta dell'interessato (art. 6.1.b GDPR)", retention: "12 mesi dalla risposta, salvo conversione in prenotazione" },
    { treatment: "Prenotazione ed esecuzione del contratto di viaggio", purpose: "Stipulare e gestire il contratto di pacchetto turistico o servizio singolo, compresi i rapporti con fornitori", basis: "Esecuzione del contratto (art. 6.1.b GDPR); per dati sanitari e religiosi, consenso esplicito (art. 9.2.a GDPR)", retention: "10 anni dalla conclusione del rapporto contrattuale (obblighi civilistici)" },
    { treatment: "Contabilità e obblighi fiscali", purpose: "Emissione di fatture, registrazioni contabili e adempimenti tributari", basis: "Obbligo legale (art. 6.1.c GDPR)", retention: "10 anni ai sensi del DPR 600/1973" },
    { treatment: "Assistenza clienti e gestione reclami", purpose: "Rispondere alle richieste di assistenza prima, durante e dopo il viaggio; gestire reclami e controversie", basis: "Esecuzione del contratto / legittimo interesse (art. 6.1.b-f GDPR)", retention: "3 anni dalla chiusura del reclamo" },
    { treatment: "Newsletter e comunicazioni commerciali", purpose: "Invio di offerte, promozioni e aggiornamenti sulle destinazioni", basis: "Consenso (art. 6.1.a GDPR), revocabile in qualsiasi momento", retention: "Fino alla revoca del consenso o dopo 2 anni di inattività" },
    { treatment: "Sicurezza del sito e log tecnici", purpose: "Garantire la sicurezza informatica, prevenire abusi e malfunzionamenti", basis: "Legittimo interesse (art. 6.1.f GDPR)", retention: "30 giorni, salvo necessità di conservazione per indagini" },
  ],
}

const content = {
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : septembre 2026",
    intro: "MY HOPE STEP BY NAJLA (titulaire : CHEBBI NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologne) traite les données personnelles des personnes concernées dans le respect du Règlement UE 2016/679 (RGPD) et de la législation italienne applicable. La présente politique décrit comment nous collectons, utilisons et protégeons les données personnelles des utilisateurs et clients.",
    tableTitle: "Traitements, finalités et bases juridiques",
    tableHeaders: ["Traitement", "Finalité", "Base juridique", "Conservation"],
    specialTitle: "Données sensibles (catégories particulières)",
    specialText: "Pour la fourniture de certains services (ex. gestion des exigences alimentaires liées à des convictions religieuses, assistance aux personnes handicapées, administration de médicaments pendant le voyage), il peut être nécessaire de traiter des données médicales ou religieuses. Ces données ne sont traitées qu'avec le consentement explicite de la personne concernée, dans les limites strictement nécessaires à la prestation du service demandé.",
    recipientsTitle: "Destinataires des données",
    recipientsIntro: "Les données personnelles peuvent être communiquées aux catégories de destinataires suivantes, dans la mesure strictement nécessaire :",
    recipientsItems: [
      "Transporteurs (compagnies aériennes, ferroviaires, maritimes) pour l'émission des titres de transport",
      "Hébergeurs (hôtels, resorts) pour la confirmation des réservations",
      "Tours opérateurs et fournisseurs de services locaux",
      "Compagnies d'assurance pour la souscription des polices prévues au contrat",
      "Fonds de garantie VACANZE GARANTITE® en cas d'insolvabilité",
      "Autorités publiques (douanes, forces de sécurité) lorsque requis par la loi",
      "Fournisseurs de services informatiques et cloud agissant comme sous-traitants",
    ],
    recipientsNote: "Les données ne sont pas cédées à des tiers à des fins de marketing sans le consentement de la personne concernée.",
    confermentTitle: "Caractère obligatoire ou facultatif de la fourniture",
    confermentText: "La fourniture des données nécessaires à la conclusion et à l'exécution du contrat (nom, coordonnées, références du document d'identité) est obligatoire : le refus rend impossible la prestation du service demandé. La fourniture des données à des fins de marketing (newsletter) est facultative.",
    rightsTitle: "Droits des personnes concernées",
    rightsIntro: "Conformément aux articles 15 à 22 du RGPD, la personne concernée dispose du droit de :",
    rightsItems: [
      "Accès à ses données personnelles (art. 15)",
      "Rectification des données inexactes ou incomplètes (art. 16)",
      "Effacement (« droit à l'oubli ») dans les cas prévus par la loi (art. 17)",
      "Limitation du traitement dans certains cas (art. 18)",
      "Portabilité des données fournies avec consentement ou contrat (art. 20)",
      "Opposition au traitement fondé sur l'intérêt légitime ou à des fins de marketing (art. 21)",
      "Révocation du consentement à tout moment, sans préjudice des traitements déjà effectués",
      "Réclamation auprès de l'autorité de contrôle compétente (Garante Privacy : www.garanteprivacy.it)",
    ],
    rightsContact: "Pour exercer vos droits, contactez le responsable du traitement : prenotazioni@myhope-step.com ou par courrier : Via Alfredo Calzoni 1/3, 40128 Bologne (BO). Délai de réponse : 30 jours.",
    minorsTitle: "Mineurs",
    minorsText: "Les services de MY HOPE STEP BY NAJLA ne sont pas destinés aux mineurs de 18 ans agissant de manière autonome. Les données des mineurs voyageant dans le cadre d'un forfait familial sont traitées sur la base du contrat conclu par les parents ou tuteurs légaux.",
    updatesTitle: "Mises à jour de la politique",
    updatesText: "La présente politique peut être mise à jour pour refléter des modifications législatives ou dans les traitements effectués. La version en vigueur est toujours disponible à l'adresse /privacy-policy du site www.myhope-step.com.",
  },
  it: {
    title: "Informativa sulla privacy",
    updated: "Ultimo aggiornamento: settembre 2026",
    intro: "MY HOPE STEP BY NAJLA (titolare: CHEBBI NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologna) tratta i dati personali degli interessati nel rispetto del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018. La presente informativa descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti e dei clienti.",
    tableTitle: "Trattamenti, finalità e basi giuridiche",
    tableHeaders: ["Trattamento", "Finalità", "Base giuridica", "Conservazione"],
    specialTitle: "Dati particolari (categorie speciali)",
    specialText: "Per l'erogazione di alcuni servizi (es. gestione di esigenze alimentari legate a credenze religiose, assistenza a persone con disabilità, somministrazione di farmaci durante il viaggio) potrebbe essere necessario trattare dati sanitari o religiosi. Questi dati sono trattati esclusivamente previo consenso esplicito dell'interessato, strettamente nei limiti necessari alla prestazione del servizio richiesto.",
    recipientsTitle: "Destinatari dei dati",
    recipientsIntro: "I dati personali possono essere comunicati alle seguenti categorie di destinatari, nella misura strettamente necessaria:",
    recipientsItems: [
      "Vettori (compagnie aeree, ferroviarie, marittime) per l'emissione dei titoli di viaggio",
      "Strutture ricettive (hotel, resort) per la conferma delle prenotazioni",
      "Tour operator e fornitori di servizi locali",
      "Compagnie assicurative per la stipula delle polizze previste dal contratto",
      "Fondo di garanzia VACANZE GARANTITE® in caso di insolvenza",
      "Autorità pubbliche (dogane, forze di pubblica sicurezza) quando richiesto dalla legge",
      "Fornitori di servizi IT e cloud che agiscono come responsabili del trattamento",
    ],
    recipientsNote: "I dati non sono ceduti a terzi per finalità di marketing senza il consenso dell'interessato.",
    confermentTitle: "Natura del conferimento e conseguenze del rifiuto",
    confermentText: "Il conferimento dei dati necessari alla conclusione e all'esecuzione del contratto (nome, contatti, estremi del documento di identità) è obbligatorio: il rifiuto rende impossibile prestare il servizio richiesto. Il conferimento dei dati per finalità di marketing (newsletter) è facoltativo.",
    rightsTitle: "Diritti degli interessati",
    rightsIntro: "Ai sensi degli articoli 15-22 GDPR, l'interessato ha il diritto di:",
    rightsItems: [
      "Accesso ai propri dati personali (art. 15)",
      "Rettifica dei dati inesatti o incompleti (art. 16)",
      "Cancellazione (\"diritto all'oblio\") nei casi previsti dalla legge (art. 17)",
      "Limitazione del trattamento in determinati casi (art. 18)",
      "Portabilità dei dati forniti con consenso o contratto (art. 20)",
      "Opposizione al trattamento basato su legittimo interesse o per finalità di marketing (art. 21)",
      "Revoca del consenso in qualsiasi momento, senza pregiudizio per i trattamenti già effettuati",
      "Reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it)",
    ],
    rightsContact: "Per esercitare i diritti, contattare il titolare all'indirizzo: prenotazioni@myhope-step.com oppure per posta a Via Alfredo Calzoni 1/3, 40128 Bologna (BO). Il titolare risponde entro 30 giorni.",
    minorsTitle: "Minori",
    minorsText: "I servizi di MY HOPE STEP BY NAJLA non sono indirizzati a minori di 18 anni che agiscono autonomamente. I dati dei minori che viaggiano nell'ambito di un pacchetto familiare sono trattati sulla base del contratto concluso dai genitori o tutori legali.",
    updatesTitle: "Aggiornamenti dell'informativa",
    updatesText: "La presente informativa può essere aggiornata per riflettere modifiche normative o nei trattamenti effettuati. La versione vigente è sempre disponibile alla pagina /privacy-policy del sito www.myhope-step.com.",
  },
}

export default function PrivacyPolicyPage() {
  const { lang } = useI18n()
  const c = content[lang === "it" ? "it" : "fr"]
  const rows = tableRows[lang === "it" ? "it" : "fr"]

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{c.title}</h1>
          <p className="text-xs text-neutral-500 mb-8">{c.updated}</p>

          <p className="text-sm text-neutral-600 leading-relaxed">{c.intro}</p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.tableTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-600 border-collapse mt-4">
              <thead>
                <tr className="bg-neutral-50">
                  {c.tableHeaders.map((h) => (
                    <th key={h} className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-neutral-50" : ""}>
                    <td className="p-3 border border-neutral-200 align-top font-medium">{row.treatment}</td>
                    <td className="p-3 border border-neutral-200 align-top">{row.purpose}</td>
                    <td className="p-3 border border-neutral-200 align-top">{row.basis}</td>
                    <td className="p-3 border border-neutral-200 align-top">{row.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.specialTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.specialText}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.recipientsTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.recipientsIntro}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.recipientsItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.recipientsNote}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.confermentTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.confermentText}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.rightsTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.rightsIntro}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.rightsItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.rightsContact}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.minorsTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.minorsText}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.updatesTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.updatesText}</p>

        </div>
      </main>
      <Footer />
    </>
  )
}
