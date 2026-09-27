"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ReclamiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reclami, assistenza ed emergenze</h1>
          <p className="text-xs text-neutral-500 mb-8">Ultimo aggiornamento: settembre 2026</p>

          <p className="text-sm text-neutral-600 leading-relaxed">
            MY HOPE STEP BY NAJLA si impegna a garantire un&apos;assistenza efficace in ogni fase del viaggio. Di seguito trovi i canali di contatto e le procedure per segnalare problemi, richiedere assistenza o presentare un reclamo formale.
          </p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Prima della partenza</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Per qualsiasi problema, chiarimento o modifica prima della partenza, contattaci attraverso i seguenti canali:
          </p>
          <ul className="text-sm text-neutral-600 mt-4 space-y-2 list-none pl-0">
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold shrink-0">Email</span>
              <a href="mailto:prenotazioni@myhope-step.com" className="text-cyan-600 hover:underline">prenotazioni@myhope-step.com</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold shrink-0">Telefono / WhatsApp</span>
              <a href="https://wa.me/393522723625" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">+39 352 272 36 25</a>
            </li>
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-4">
            Ti chiediamo di contattarci il prima possibile per permetterci di trovare soluzioni adeguate. Le richieste di modifica sono soggette alle condizioni di cancellazione e penali previste nel contratto di viaggio.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Durante il viaggio</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            In caso di problemi durante il viaggio, è fondamentale segnalare immediatamente il disguido al fornitore del servizio (hotel, vettore, guida locale) e contestualmente informare MY HOPE STEP BY NAJLA.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            La segnalazione tempestiva è un obbligo previsto dall&apos;art. 47 del Codice del Turismo (D.Lgs. 79/2011) e consente al viaggiatore di richiedere soluzioni sostitutive in loco. MY HOPE STEP BY NAJLA, in qualità di organizzatore, è tenuto a prestare assistenza qualora il viaggiatore si trovi in difficoltà.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Per emergenze durante il viaggio, contattaci immediatamente ai recapiti indicati in fase di prenotazione e indicati nella documentazione di viaggio.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Reclami formali</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Ai sensi dell&apos;art. 49 del Codice del Turismo, il viaggiatore ha diritto di presentare reclamo per ogni mancata o inesatta esecuzione dei servizi inclusi nel pacchetto turistico.
          </p>
          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Come presentare un reclamo</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il reclamo deve essere presentato per iscritto (via e-mail o lettera raccomandata A/R) entro e non oltre <strong>10 giorni lavorativi</strong> dalla data del rientro dal viaggio. Il reclamo tardivo può influire sulla valutazione del diritto al risarcimento.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Il reclamo scritto deve essere inviato a:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li>Email: <a href="mailto:prenotazioni@myhope-step.com" className="text-cyan-600 hover:underline">prenotazioni@myhope-step.com</a></li>
            <li>PEC: <a href="mailto:chebbinajla@pec.it" className="text-cyan-600 hover:underline">chebbinajla@pec.it</a></li>
            <li>Posta raccomandata: CHEBBI NAJLA – MY HOPE STEP BY NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologna (BO)</li>
          </ul>
          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Contenuto del reclamo</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il reclamo deve contenere: nome e cognome del reclamante, numero di prenotazione o riferimento del contratto, data e destinazione del viaggio, descrizione dettagliata del problema riscontrato, eventuale documentazione a supporto (fotografie, ricevute, corrispondenza con i fornitori), e indicazione della soluzione o del risarcimento richiesto.
          </p>
          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Tempi di risposta</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            MY HOPE STEP BY NAJLA si impegna a fornire un riscontro scritto entro <strong>30 giorni lavorativi</strong> dalla ricezione del reclamo. In caso di indagini complesse che richiedano il coinvolgimento di fornitori terzi, i tempi potrebbero prolungarsi, previa comunicazione all&apos;interessato.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Risoluzione alternativa delle controversie (ADR/ODR)</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            In caso di controversie non risolte in via amichevole, il consumatore può avvalersi degli strumenti di risoluzione alternativa delle controversie (ADR) previsti dalla direttiva 2013/11/UE e dal D.Lgs. 130/2015:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2 list-disc list-inside">
            <li>
              <strong>Piattaforma ODR europea</strong>: ec.europa.eu/consumers/odr — per i consumatori residenti nell&apos;Unione Europea che desiderano risolvere online le controversie con operatori turistici
            </li>
            <li>
              <strong>Arbitrato e mediazione</strong>: presso le Camere di Commercio competenti o organismi di mediazione accreditati dal Ministero della Giustizia
            </li>
            <li>
              <strong>Conciliazione turistica</strong>: alcuni consorzi e associazioni di categoria offrono servizi di conciliazione specializzati per il settore turistico
            </li>
          </ul>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Resta salvo il diritto del consumatore di adire l&apos;autorità giudiziaria competente. Per le controversie con consumatori, è competente il tribunale del luogo di residenza o domicilio del consumatore, ai sensi del Codice del Consumo.
          </p>

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Protezione in caso di insolvenza</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            In caso di insolvenza o fallimento di MY HOPE STEP BY NAJLA, i viaggiatori sono protetti dal Fondo Consortile di Garanzia <strong>VACANZE GARANTITE®</strong>, certificato n. 2026092813AT.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Per richiedere il rimborso o il rimpatrio in caso di insolvenza, contattare direttamente:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li>Consorzio Vacanze Garantite, Via Enrico Cosenz 54/B, 20158 Milano</li>
            <li>Email: info@vacanzegarantite.it</li>
            <li>Sito: www.vacanzegarantite.it</li>
            <li>Telefono: +39 02 8717 7065</li>
          </ul>

        </div>
      </main>
      <Footer />
    </>
  )
}
