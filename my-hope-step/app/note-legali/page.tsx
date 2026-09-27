"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function NoteLegaliPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Note legali</h1>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Informazioni legali</h2>
          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Titolare del sito e operatore economico</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il sito www.myhope-step.com è gestito da CHEBBI NAJLA, impresa individuale operante con l'insegna commerciale MY HOPE STEP BY NAJLA, con sede legale in Via Alfredo Calzoni 1/3, 40128 Bologna (BO), Italia.
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li>Partita IVA: 04405401201</li>
            <li>Codice fiscale: CHBNJL70H66Z352Y</li>
            <li>Numero REA: BO-690782</li>
            <li>PEC: chebbinajla@pec.it</li>
            <li>Email: prenotazioni@myhope-step.com</li>
            <li>Telefono: +39 352 272 36 25</li>
            <li>Titolare e direttrice tecnica: Najla Chebbi</li>
          </ul>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Coperture obbligatorie</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Responsabilità civile professionale: Bene Assicurazioni S.p.A. Società Benefit, polizza n. 10099091000157, durata dal 11 settembre 2026 al 11 settembre 2027, massimale di euro 2.100.000 per le garanzie indicate in polizza.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Protezione in caso di insolvenza o fallimento: Fondo Consortile di Garanzia VACANZE GARANTITE®, certificato n. 2026092813AT, durata dal 15 settembre 2026 al 15 settembre 2027. Contatti: Consorzio Vacanze Garantite, Via Enrico Cosenz 54/B, 20158 Milano; info@vacanzegarantite.it; www.vacanzegarantite.it; tel. +39 02 8717 7065.
          </p>

          <hr className="my-10 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Condizioni d'uso del sito</h2>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Oggetto e accettazione</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Le presenti condizioni disciplinano l'accesso e l'utilizzo del sito www.myhope-step.com. La consultazione del sito comporta l'accettazione delle presenti condizioni d'uso; la conclusione di un contratto di viaggio è invece disciplinata dalle specifiche condizioni contrattuali rese disponibili prima della prenotazione.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Informazioni e disponibilità</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            MY HOPE STEP BY NAJLA cura l'aggiornamento delle informazioni pubblicate, ma prezzi, disponibilità, orari, itinerari, requisiti di ingresso e servizi di terzi possono cambiare. Un'offerta diventa vincolante solo dopo la conferma scritta della prenotazione e il pagamento previsto. Le immagini possono avere finalità illustrative, salvo che siano espressamente indicate come elemento contrattuale.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Uso lecito e proprietà intellettuale</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            L'utente si impegna a utilizzare il sito in modo lecito, a non interferire con il suo funzionamento e a non inserire dati falsi o di terzi senza autorizzazione. Testi, grafica, marchi, fotografie e materiali sono protetti dai diritti dei rispettivi titolari. Il loro utilizzo o riproduzione è consentito soltanto nei limiti autorizzati dalla legge o previa autorizzazione scritta.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Collegamenti e servizi di terzi</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il sito può contenere collegamenti a vettori, strutture ricettive, tour operator, compagnie assicurative, PayPal o altri terzi. I siti e i servizi di terzi sono soggetti alle rispettive condizioni e informative. MY HOPE STEP BY NAJLA resta responsabile nei limiti previsti dalla legge e dal ruolo assunto nel singolo contratto.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Continuità del servizio</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il sito può essere temporaneamente sospeso per manutenzione, sicurezza o cause tecniche. Nessuna clausola delle presenti condizioni esclude o limita responsabilità che non possono essere escluse o limitate dalla legge.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Legge applicabile</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Le presenti condizioni sono regolate dalla legge italiana. Per il consumatore resta competente il giudice del luogo di residenza o domicilio, quando previsto dalla normativa inderogabile. Restano salvi gli ulteriori diritti riconosciuti al consumatore dalla legge del Paese dell'Unione europea in cui risiede abitualmente, se applicabili.
          </p>

        </div>
      </main>
      <Footer />
    </>
  )
}
