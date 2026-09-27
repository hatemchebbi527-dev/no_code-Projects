"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Cookie Policy</h1>
          <p className="text-xs text-neutral-500 mb-8">Ultimo aggiornamento: 19 settembre 2026</p>

          <p className="text-sm text-neutral-600 leading-relaxed">
            Il sito www.myhope-step.com utilizza cookie e tecnologie simili. La presente politica descrive come vengono utilizzati i cookie, per quale scopo e come è possibile gestire le proprie preferenze, in conformità con la direttiva ePrivacy (2002/58/CE, modificata dalla 2009/136/CE) e il Regolamento UE 2016/679 (GDPR).
          </p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Cosa sono i cookie</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell&apos;utente durante la navigazione. Permettono al sito di ricordare le azioni e le preferenze dell&apos;utente (come la lingua, la sessione di accesso o altre impostazioni) così che non debbano essere inserite nuovamente alla visita successiva o navigando da una pagina all&apos;altra.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            I cookie possono essere:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li><strong>Cookie di sessione</strong>: temporanei, vengono eliminati alla chiusura del browser</li>
            <li><strong>Cookie persistenti</strong>: rimangono sul dispositivo per un periodo definito o fino alla cancellazione manuale</li>
            <li><strong>Cookie di prima parte</strong>: impostati direttamente dal sito visitato</li>
            <li><strong>Cookie di terze parti</strong>: impostati da domini diversi dal sito visitato (es. servizi analitici, social media)</li>
          </ul>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Gestione del consenso</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Al primo accesso al sito, viene mostrato un banner che consente di accettare, rifiutare o personalizzare le proprie preferenze sui cookie non tecnici. Il consenso può essere revocato in qualsiasi momento attraverso il pannello delle preferenze accessibile dal banner o tramite le impostazioni del browser. La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            I cookie strettamente necessari al funzionamento del sito non richiedono consenso e non possono essere disabilitati attraverso il nostro sistema, in quanto la loro disabilitazione comprometterebbe il corretto funzionamento del sito.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Servizi di terze parti</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il sito può integrare servizi forniti da terze parti che impostano i propri cookie. I principali servizi di terze parti sono:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2 list-disc list-inside">
            <li>
              <strong>Google Analytics / Google Tag Manager</strong>: strumenti di analisi delle statistiche di navigazione. Dati raccolti: pagine visitate, durata della sessione, provenienza geografica approssimativa, tipo di dispositivo e browser. I dati sono aggregati e non permettono l&apos;identificazione diretta dell&apos;utente. Politica privacy Google: policies.google.com/privacy
            </li>
            <li>
              <strong>Social media (Instagram, Facebook, TikTok)</strong>: pulsanti e widget di condivisione social possono impostare cookie di terze parti. L&apos;utilizzo di questi servizi è soggetto alle rispettive informative sulla privacy.
            </li>
            <li>
              <strong>Servizi di pagamento</strong>: per le transazioni online possono essere utilizzati servizi come PayPal o sistemi bancari che impostano i propri cookie di sessione per la sicurezza delle transazioni.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Categorie di cookie utilizzati</h2>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Cookie tecnici e strettamente necessari</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Essenziali per il funzionamento del sito. Non richiedono consenso. Includono cookie di sessione per la navigazione, cookie per la memorizzazione delle preferenze di lingua e cookie per la sicurezza (protezione CSRF).
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Cookie analitici (con consenso)</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Raccolgono informazioni anonime sull&apos;utilizzo del sito per permetterci di migliorare le funzionalità e l&apos;esperienza utente. Durata: fino a 2 anni. Possono essere disabilitati senza impatto sulle funzionalità principali del sito.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Cookie di marketing e profilazione (con consenso)</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Utilizzati per mostrare pubblicità personalizzata basata sugli interessi dell&apos;utente, anche su altri siti. Questi cookie tracciano le visite su più siti web. Richiedono il consenso esplicito dell&apos;utente e possono essere disabilitati in qualsiasi momento.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Come gestire i cookie tramite il browser</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Oltre al nostro strumento di gestione del consenso, è possibile gestire, bloccare o eliminare i cookie direttamente dalle impostazioni del proprio browser:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li><strong>Google Chrome</strong>: Impostazioni &gt; Privacy e sicurezza &gt; Cookie e altri dati dei siti</li>
            <li><strong>Mozilla Firefox</strong>: Opzioni &gt; Privacy e sicurezza &gt; Cookie e dati dei siti</li>
            <li><strong>Safari</strong>: Preferenze &gt; Privacy &gt; Gestisci dati siti web</li>
            <li><strong>Microsoft Edge</strong>: Impostazioni &gt; Cookie e autorizzazioni sito</li>
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            La disabilitazione di alcuni cookie potrebbe influire sull&apos;esperienza di navigazione e sulle funzionalità disponibili nel sito.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Contatti</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Per qualsiasi domanda relativa alla presente Cookie Policy o per esercitare i propri diritti in materia di protezione dei dati, è possibile contattare il titolare del trattamento:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li>CHEBBI NAJLA – MY HOPE STEP BY NAJLA</li>
            <li>Via Alfredo Calzoni 1/3, 40128 Bologna (BO)</li>
            <li>Email: prenotazioni@myhope-step.com</li>
            <li>PEC: chebbinajla@pec.it</li>
          </ul>

        </div>
      </main>
      <Footer />
    </>
  )
}
