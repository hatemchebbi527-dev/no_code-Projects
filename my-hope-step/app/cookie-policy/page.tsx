"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"

const content = {
  fr: {
    title: "Politique de cookies",
    updated: "Dernière mise à jour : 19 septembre 2026",
    intro: "Le site www.myhope-step.com utilise des cookies et des technologies similaires. La présente politique décrit comment les cookies sont utilisés, à quelles fins et comment vous pouvez gérer vos préférences, conformément à la directive ePrivacy (2002/58/CE modifiée par la 2009/136/CE) et au Règlement UE 2016/679 (RGPD).",
    whatTitle: "Qu'est-ce qu'un cookie ?",
    whatText: "Les cookies sont de petits fichiers texte que les sites web enregistrent sur l'appareil de l'utilisateur lors de la navigation. Ils permettent au site de mémoriser les actions et préférences de l'utilisateur (langue, session, paramètres) afin qu'il n'ait pas à les resaisir lors de sa prochaine visite.",
    whatTypes: "Les cookies peuvent être :",
    whatItems: [
      "Cookies de session : temporaires, supprimés à la fermeture du navigateur",
      "Cookies persistants : conservés sur l'appareil pour une durée définie ou jusqu'à la suppression manuelle",
      "Cookies de première partie : déposés directement par le site visité",
      "Cookies tiers : déposés par des domaines différents du site visité (ex. services analytiques, réseaux sociaux)",
    ],
    consentTitle: "Gestion du consentement",
    consent1: "À votre première visite sur le site, une bannière s'affiche pour vous permettre d'accepter, de refuser ou de personnaliser vos préférences concernant les cookies non techniques. Le consentement peut être révoqué à tout moment via le panneau de préférences accessible depuis la bannière ou via les paramètres de votre navigateur. La révocation du consentement ne remet pas en cause la licéité des traitements effectués avant cette révocation.",
    consent2: "Les cookies strictement nécessaires au fonctionnement du site ne requièrent pas de consentement et ne peuvent pas être désactivés via notre système, leur désactivation compromettrait le bon fonctionnement du site.",
    thirdTitle: "Services tiers",
    thirdIntro: "Le site peut intégrer des services fournis par des tiers qui déposent leurs propres cookies. Les principaux services tiers sont :",
    thirdItems: [
      "Google Analytics / Google Tag Manager : outils d'analyse des statistiques de navigation. Données collectées : pages visitées, durée de session, provenance géographique approximative, type d'appareil et de navigateur. Les données sont agrégées et ne permettent pas l'identification directe de l'utilisateur. Politique de confidentialité Google : policies.google.com/privacy",
      "Réseaux sociaux (Instagram, Facebook, TikTok) : boutons et widgets de partage social pouvant déposer des cookies tiers. L'utilisation de ces services est soumise à leurs propres politiques de confidentialité.",
      "Services de paiement : pour les transactions en ligne, des services comme PayPal peuvent déposer des cookies de session pour la sécurité des transactions.",
    ],
    categoriesTitle: "Catégories de cookies utilisés",
    techTitle: "Cookies techniques et strictement nécessaires",
    techText: "Essentiels au fonctionnement du site. Ne requièrent pas de consentement. Comprennent les cookies de session, les cookies de mémorisation des préférences de langue et les cookies de sécurité (protection CSRF).",
    analyticsTitle: "Cookies analytiques (avec consentement)",
    analyticsText: "Collectent des informations anonymes sur l'utilisation du site pour nous permettre d'améliorer les fonctionnalités et l'expérience utilisateur. Durée : jusqu'à 2 ans. Peuvent être désactivés sans impact sur les fonctionnalités principales du site.",
    marketingTitle: "Cookies de marketing et de profilage (avec consentement)",
    marketingText: "Utilisés pour afficher des publicités personnalisées en fonction des intérêts de l'utilisateur, y compris sur d'autres sites. Ces cookies suivent les visites sur plusieurs sites web. Requièrent le consentement explicite de l'utilisateur et peuvent être désactivés à tout moment.",
    browserTitle: "Comment gérer les cookies via votre navigateur",
    browserIntro: "En plus de notre outil de gestion du consentement, vous pouvez gérer, bloquer ou supprimer les cookies directement depuis les paramètres de votre navigateur :",
    browserItems: [
      "Google Chrome : Paramètres > Confidentialité et sécurité > Cookies et autres données des sites",
      "Mozilla Firefox : Options > Vie privée et sécurité > Cookies et données de sites",
      "Safari : Préférences > Confidentialité > Gérer les données de sites web",
      "Microsoft Edge : Paramètres > Cookies et autorisations de site",
    ],
    browserNote: "La désactivation de certains cookies peut affecter votre expérience de navigation et les fonctionnalités disponibles sur le site.",
    contactTitle: "Contact",
    contactText: "Pour toute question relative à la présente Politique de cookies ou pour exercer vos droits en matière de protection des données, contactez le responsable du traitement :",
    contactItems: [
      "CHEBBI NAJLA – MY HOPE STEP BY NAJLA",
      "Via Alfredo Calzoni 1/3, 40128 Bologne (BO)",
      "Email : prenotazioni@myhope-step.com",
      "PEC : chebbinajla@pec.it",
    ],
  },
  it: {
    title: "Cookie Policy",
    updated: "Ultimo aggiornamento: 19 settembre 2026",
    intro: "Il sito www.myhope-step.com utilizza cookie e tecnologie simili. La presente politica descrive come vengono utilizzati i cookie, per quale scopo e come è possibile gestire le proprie preferenze, in conformità con la direttiva ePrivacy (2002/58/CE, modificata dalla 2009/136/CE) e il Regolamento UE 2016/679 (GDPR).",
    whatTitle: "Cosa sono i cookie",
    whatText: "I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente durante la navigazione. Permettono al sito di ricordare le azioni e le preferenze dell'utente (come la lingua, la sessione di accesso o altre impostazioni) così che non debbano essere inserite nuovamente alla visita successiva.",
    whatTypes: "I cookie possono essere:",
    whatItems: [
      "Cookie di sessione: temporanei, vengono eliminati alla chiusura del browser",
      "Cookie persistenti: rimangono sul dispositivo per un periodo definito o fino alla cancellazione manuale",
      "Cookie di prima parte: impostati direttamente dal sito visitato",
      "Cookie di terze parti: impostati da domini diversi dal sito visitato (es. servizi analitici, social media)",
    ],
    consentTitle: "Gestione del consenso",
    consent1: "Al primo accesso al sito, viene mostrato un banner che consente di accettare, rifiutare o personalizzare le proprie preferenze sui cookie non tecnici. Il consenso può essere revocato in qualsiasi momento attraverso il pannello delle preferenze accessibile dal banner o tramite le impostazioni del browser. La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca.",
    consent2: "I cookie strettamente necessari al funzionamento del sito non richiedono consenso e non possono essere disabilitati attraverso il nostro sistema, in quanto la loro disabilitazione comprometterebbe il corretto funzionamento del sito.",
    thirdTitle: "Servizi di terze parti",
    thirdIntro: "Il sito può integrare servizi forniti da terze parti che impostano i propri cookie. I principali servizi di terze parti sono:",
    thirdItems: [
      "Google Analytics / Google Tag Manager: strumenti di analisi delle statistiche di navigazione. Dati raccolti: pagine visitate, durata della sessione, provenienza geografica approssimativa, tipo di dispositivo e browser. I dati sono aggregati e non permettono l'identificazione diretta dell'utente. Politica privacy Google: policies.google.com/privacy",
      "Social media (Instagram, Facebook, TikTok): pulsanti e widget di condivisione social possono impostare cookie di terze parti. L'utilizzo di questi servizi è soggetto alle rispettive informative sulla privacy.",
      "Servizi di pagamento: per le transazioni online possono essere utilizzati servizi come PayPal che impostano i propri cookie di sessione per la sicurezza delle transazioni.",
    ],
    categoriesTitle: "Categorie di cookie utilizzati",
    techTitle: "Cookie tecnici e strettamente necessari",
    techText: "Essenziali per il funzionamento del sito. Non richiedono consenso. Includono cookie di sessione per la navigazione, cookie per la memorizzazione delle preferenze di lingua e cookie per la sicurezza (protezione CSRF).",
    analyticsTitle: "Cookie analitici (con consenso)",
    analyticsText: "Raccolgono informazioni anonime sull'utilizzo del sito per permetterci di migliorare le funzionalità e l'esperienza utente. Durata: fino a 2 anni. Possono essere disabilitati senza impatto sulle funzionalità principali del sito.",
    marketingTitle: "Cookie di marketing e profilazione (con consenso)",
    marketingText: "Utilizzati per mostrare pubblicità personalizzata basata sugli interessi dell'utente, anche su altri siti. Questi cookie tracciano le visite su più siti web. Richiedono il consenso esplicito dell'utente e possono essere disabilitati in qualsiasi momento.",
    browserTitle: "Come gestire i cookie tramite il browser",
    browserIntro: "Oltre al nostro strumento di gestione del consenso, è possibile gestire, bloccare o eliminare i cookie direttamente dalle impostazioni del proprio browser:",
    browserItems: [
      "Google Chrome: Impostazioni > Privacy e sicurezza > Cookie e altri dati dei siti",
      "Mozilla Firefox: Opzioni > Privacy e sicurezza > Cookie e dati dei siti",
      "Safari: Preferenze > Privacy > Gestisci dati siti web",
      "Microsoft Edge: Impostazioni > Cookie e autorizzazioni sito",
    ],
    browserNote: "La disabilitazione di alcuni cookie potrebbe influire sull'esperienza di navigazione e sulle funzionalità disponibili nel sito.",
    contactTitle: "Contatti",
    contactText: "Per qualsiasi domanda relativa alla presente Cookie Policy o per esercitare i propri diritti in materia di protezione dei dati, è possibile contattare il titolare del trattamento:",
    contactItems: [
      "CHEBBI NAJLA – MY HOPE STEP BY NAJLA",
      "Via Alfredo Calzoni 1/3, 40128 Bologna (BO)",
      "Email: prenotazioni@myhope-step.com",
      "PEC: chebbinajla@pec.it",
    ],
  },
}

export default function CookiePolicyPage() {
  const { lang } = useI18n()
  const c = content[lang === "it" ? "it" : "fr"]
  const isAr = lang === "ar"

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2" dir={isAr ? "rtl" : "ltr"}>
            {isAr ? "سياسة ملفات تعريف الارتباط" : c.title}
          </h1>
          <p className="text-xs text-neutral-500 mb-8">{c.updated}</p>
          {isAr && (
            <p className="text-sm text-neutral-500 mb-4 text-right" dir="rtl">
              المحتوى القانوني متاح باللغة الفرنسية
            </p>
          )}
          <p className="text-sm text-neutral-600 leading-relaxed">{c.intro}</p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.whatTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.whatText}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.whatTypes}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.whatItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.consentTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.consent1}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.consent2}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.thirdTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.thirdIntro}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2 list-disc list-inside">
            {c.thirdItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.categoriesTitle}</h2>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.techTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.techText}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.analyticsTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.analyticsText}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.marketingTitle}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.marketingText}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.browserTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.browserIntro}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.browserItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.browserNote}</p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.contactTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.contactText}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            {c.contactItems.map((item) => <li key={item}>{item}</li>)}
          </ul>

        </div>
      </main>
      <Footer />
    </>
  )
}
