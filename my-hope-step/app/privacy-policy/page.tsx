"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Informativa sulla privacy</h1>
          <p className="text-xs text-neutral-500 mb-8">Ultimo aggiornamento: settembre 2026</p>

          <p className="text-sm text-neutral-600 leading-relaxed">
            MY HOPE STEP BY NAJLA (titolare: CHEBBI NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologna) tratta i dati personali degli interessati nel rispetto del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018. La presente informativa descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti e dei clienti.
          </p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Trattamenti, finalità e basi giuridiche</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-600 border-collapse mt-4">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">Trattamento</th>
                  <th className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">Finalità</th>
                  <th className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">Base giuridica</th>
                  <th className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">Conservazione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-neutral-200 align-top font-medium">Richieste di preventivi e informazioni</td>
                  <td className="p-3 border border-neutral-200 align-top">Rispondere alle richieste ricevute tramite il modulo di contatto o altri canali</td>
                  <td className="p-3 border border-neutral-200 align-top">Misure precontrattuali su richiesta dell&apos;interessato (art. 6.1.b GDPR)</td>
                  <td className="p-3 border border-neutral-200 align-top">12 mesi dalla risposta, salvo conversione in prenotazione</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 align-top font-medium">Prenotazione ed esecuzione del contratto di viaggio</td>
                  <td className="p-3 border border-neutral-200 align-top">Stipulare e gestire il contratto di pacchetto turistico o servizio singolo, compresi i rapporti con fornitori (vettori, strutture, assicurazioni)</td>
                  <td className="p-3 border border-neutral-200 align-top">Esecuzione del contratto (art. 6.1.b GDPR); per dati sanitari e religiosi, consenso esplicito (art. 9.2.a GDPR)</td>
                  <td className="p-3 border border-neutral-200 align-top">10 anni dalla conclusione del rapporto contrattuale (obblighi civilistici)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 align-top font-medium">Contabilità e obblighi fiscali</td>
                  <td className="p-3 border border-neutral-200 align-top">Emissione di fatture, registrazioni contabili e adempimenti tributari</td>
                  <td className="p-3 border border-neutral-200 align-top">Obbligo legale (art. 6.1.c GDPR)</td>
                  <td className="p-3 border border-neutral-200 align-top">10 anni ai sensi del DPR 600/1973</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 align-top font-medium">Assistenza clienti e gestione reclami</td>
                  <td className="p-3 border border-neutral-200 align-top">Rispondere alle richieste di assistenza prima, durante e dopo il viaggio; gestire reclami e controversie</td>
                  <td className="p-3 border border-neutral-200 align-top">Esecuzione del contratto / legittimo interesse (art. 6.1.b-f GDPR)</td>
                  <td className="p-3 border border-neutral-200 align-top">3 anni dalla chiusura del reclamo (prescrizione breve)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200 align-top font-medium">Newsletter e comunicazioni commerciali</td>
                  <td className="p-3 border border-neutral-200 align-top">Invio di offerte, promozioni e aggiornamenti sulle destinazioni</td>
                  <td className="p-3 border border-neutral-200 align-top">Consenso (art. 6.1.a GDPR), revocabile in qualsiasi momento</td>
                  <td className="p-3 border border-neutral-200 align-top">Fino alla revoca del consenso o dopo 2 anni di inattività</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200 align-top font-medium">Sicurezza del sito e log tecnici</td>
                  <td className="p-3 border border-neutral-200 align-top">Garantire la sicurezza informatica, prevenire abusi e malfunzionamenti</td>
                  <td className="p-3 border border-neutral-200 align-top">Legittimo interesse (art. 6.1.f GDPR)</td>
                  <td className="p-3 border border-neutral-200 align-top">30 giorni, salvo necessità di conservazione per indagini</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Dati particolari (categorie speciali)</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Per l&apos;erogazione di alcuni servizi (es. gestione di esigenze alimentari legate a credenze religiose, assistenza a persone con disabilità, somministrazione di farmaci durante il viaggio) potrebbe essere necessario trattare dati sanitari o religiosi. Questi dati sono trattati esclusivamente previo consenso esplicito dell&apos;interessato, strettamente nei limiti necessari alla prestazione del servizio richiesto e non vengono comunicati a terzi oltre i fornitori coinvolti nell&apos;esecuzione del contratto.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Destinatari dei dati</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I dati personali possono essere comunicati alle seguenti categorie di destinatari, nella misura strettamente necessaria:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li>Vettori (compagnie aeree, ferroviarie, marittime) per l&apos;emissione dei titoli di viaggio</li>
            <li>Strutture ricettive (hotel, resort) per la conferma delle prenotazioni</li>
            <li>Tour operator e fornitori di servizi locali</li>
            <li>Compagnie assicurative per la stipula delle polizze previste dal contratto</li>
            <li>Fondo di garanzia VACANZE GARANTITE® in caso di insolvenza</li>
            <li>Autorità pubbliche (es. dogane, forze di pubblica sicurezza) quando richiesto dalla legge</li>
            <li>Fornitori di servizi IT e cloud che agiscono come responsabili del trattamento</li>
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            I dati non sono ceduti a terzi per finalità di marketing senza il consenso dell&apos;interessato. Per i trasferimenti verso Paesi extra-UE, vengono adottate le garanzie appropriate previste dal GDPR (decisioni di adeguatezza, clausole contrattuali standard).
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Natura del conferimento e conseguenze del rifiuto</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il conferimento dei dati necessari alla conclusione e all&apos;esecuzione del contratto (nome, contatti, estremi del documento di identità) è obbligatorio: il rifiuto rende impossibile prestare il servizio richiesto. Il conferimento dei dati per finalità di marketing (newsletter) è facoltativo e il rifiuto non comporta conseguenze sulla prestazione del servizio principale.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Diritti degli interessati</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Ai sensi degli articoli 15-22 GDPR, l&apos;interessato ha il diritto di:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li><strong>Accesso</strong> ai propri dati personali (art. 15)</li>
            <li><strong>Rettifica</strong> dei dati inesatti o incompleti (art. 16)</li>
            <li><strong>Cancellazione</strong> ("diritto all&apos;oblio") nei casi previsti dalla legge (art. 17)</li>
            <li><strong>Limitazione</strong> del trattamento in determinati casi (art. 18)</li>
            <li><strong>Portabilità</strong> dei dati forniti con consenso o contratto (art. 20)</li>
            <li><strong>Opposizione</strong> al trattamento basato su legittimo interesse o per finalità di marketing (art. 21)</li>
            <li><strong>Revoca del consenso</strong> in qualsiasi momento, senza pregiudizio per i trattamenti già effettuati</li>
            <li><strong>Reclamo</strong> al Garante per la protezione dei dati personali (www.garanteprivacy.it)</li>
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Per esercitare i diritti, contattare il titolare all&apos;indirizzo: <strong>prenotazioni@myhope-step.com</strong> oppure per posta a Via Alfredo Calzoni 1/3, 40128 Bologna (BO). Il titolare risponde entro 30 giorni dalla ricezione della richiesta.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Minori</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I servizi di MY HOPE STEP BY NAJLA non sono indirizzati a minori di 18 anni che agiscono autonomamente. I dati dei minori che viaggiano nell&apos;ambito di un pacchetto familiare sono trattati sulla base del contratto concluso dai genitori o tutori legali, che sono responsabili del conferimento di tali dati.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Aggiornamenti dell&apos;informativa</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            La presente informativa può essere aggiornata per riflettere modifiche normative o nei trattamenti effettuati. In caso di modifiche sostanziali, gli interessati saranno informati attraverso il sito o, se in possesso di un indirizzo e-mail, tramite comunicazione diretta. La versione vigente è sempre disponibile alla pagina /privacy-policy del sito www.myhope-step.com.
          </p>

        </div>
      </main>
      <Footer />
    </>
  )
}
