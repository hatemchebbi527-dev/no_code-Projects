"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CondizioniDiVenditaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Condizioni di vendita</h1>
          <p className="text-xs text-neutral-500 mb-8">Ultimo aggiornamento: settembre 2026</p>

          <p className="text-sm text-neutral-600 leading-relaxed">
            Le presenti condizioni disciplinano la vendita di pacchetti turistici e servizi singoli da parte di MY HOPE STEP BY NAJLA (titolare: CHEBBI NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologna, P. IVA 04405401201), in conformità al D.Lgs. 79/2011 (Codice del Turismo), alla Direttiva UE 2015/2302 recepita con D.Lgs. 62/2018, e al Codice del Consumo (D.Lgs. 206/2005).
          </p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Parte I – Condizioni generali per pacchetti turistici</h2>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 1 – Definizioni</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Ai fini delle presenti condizioni si intende per:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-1 list-disc list-inside">
            <li><strong>Organizzatore</strong>: MY HOPE STEP BY NAJLA, che combina e vende i pacchetti turistici</li>
            <li><strong>Viaggiatore</strong>: chiunque intenda concludere o conclude un contratto di pacchetto turistico</li>
            <li><strong>Pacchetto turistico</strong>: combinazione di almeno due servizi (trasporto + alloggio, o con altri servizi turistici significativi) per lo stesso viaggio, con durata superiore alle 24 ore o con pernottamento</li>
            <li><strong>Servizi di viaggio</strong>: trasporto di passeggeri, alloggio, noleggio auto, moto o altri veicoli, servizi turistici (visite guidate, escursioni, eventi)</li>
          </ul>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 2 – Formazione del contratto</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il contratto di pacchetto turistico si perfeziona con la conferma scritta dell&apos;organizzatore e il versamento dell&apos;acconto richiesto. Prima della conclusione del contratto, il viaggiatore riceve il modulo informativo standard previsto dall&apos;Allegato I, Parte A o B della Direttiva 2015/2302, contenente le principali informazioni sul pacchetto. L&apos;offerta del sito web costituisce un invito a proporre; la prenotazione del viaggiatore è una proposta contrattuale che l&apos;organizzatore può accettare o rifiutare.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 3 – Documentazione di viaggio e informazioni pre-partenza</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            L&apos;organizzatore fornisce al viaggiatore, con congruo anticipo rispetto alla partenza e comunque non oltre 7 giorni prima, la documentazione di viaggio completa (voucher, biglietti, programma dettagliato, recapiti di emergenza, informazioni assicurative). Il viaggiatore è responsabile di essere in possesso dei documenti di identità validi, visti, certificati vaccinali e di tutti i requisiti di ingresso richiesti dai Paesi di destinazione e transito.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 4 – Prezzo e revisione del prezzo</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il prezzo del pacchetto è indicato nel contratto e può essere rivisto al rialzo o al ribasso solo in caso di variazioni del costo del carburante, delle tariffe aeree o dei tassi di cambio, nei limiti e con le modalità previste dall&apos;art. 40 del Codice del Turismo. L&apos;aumento del prezzo non può superare l&apos;8% del prezzo totale del pacchetto. Se l&apos;aumento supera il 8%, il viaggiatore può recedere dal contratto senza penali. Nessun aumento può essere applicato nei 20 giorni precedenti la partenza.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 5 – Modifiche al contratto da parte dell&apos;organizzatore</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Se l&apos;organizzatore non può fornire la maggior parte dei servizi concordati, o propone modifiche significative a elementi essenziali del pacchetto (prezzo, destinazione, date, qualità dell&apos;alloggio), ne informa il viaggiatore senza indugio e per iscritto. Il viaggiatore può accettare la modifica, scegliere un pacchetto sostitutivo o recedere dal contratto con rimborso integrale entro 14 giorni. Non costituiscono modifiche significative variazioni minori dell&apos;orario, del mezzo di trasporto o della struttura ricettiva di categoria equivalente o superiore.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 6 – Cessione del contratto</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il viaggiatore può cedere il contratto a una terza persona che soddisfi tutti i requisiti applicabili al pacchetto, previa comunicazione scritta all&apos;organizzatore con un preavviso ragionevole e non inferiore a 7 giorni prima della partenza. Il cedente e il cessionario rispondono in solido del pagamento del prezzo residuo e delle eventuali spese aggiuntive derivanti dalla cessione.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 7 – Recesso del viaggiatore</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il viaggiatore può recedere dal contratto in qualsiasi momento prima della partenza, pagando le penali di cancellazione indicate al successivo art. 16. Il recesso senza penali è consentito in caso di: (a) circostanze inevitabili e straordinarie nel luogo di destinazione che incidano in modo sostanziale sul pacchetto o sul trasporto verso la destinazione; (b) aumento del prezzo superiore all&apos;8%; (c) modifica significativa di un elemento essenziale del pacchetto da parte dell&apos;organizzatore. In questi ultimi casi il rimborso è integrale.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 8 – Recesso dell&apos;organizzatore e risoluzione per mancato raggiungimento del numero minimo</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            L&apos;organizzatore può risolvere il contratto e rimborsare integralmente il viaggiatore se il numero dei partecipanti è inferiore al minimo indicato nel contratto, purché la comunicazione sia effettuata non oltre: 20 giorni prima della partenza per viaggi superiori a 6 giorni; 7 giorni prima per viaggi da 2 a 6 giorni; 48 ore prima per viaggi di meno di 2 giorni.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 9 – Responsabilità dell&apos;organizzatore per l&apos;esecuzione del pacchetto</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            L&apos;organizzatore è responsabile dell&apos;esecuzione dei servizi di viaggio inclusi nel contratto, indipendentemente dal fatto che siano prestati da lui direttamente o da altri fornitori. In caso di mancata o inesatta esecuzione dei servizi, l&apos;organizzatore deve prestare adeguata assistenza e proporre soluzioni adeguate al proseguimento del viaggio, anche eventualmente di categoria superiore senza costi aggiuntivi per il viaggiatore. Se la soluzione proposta comporta una riduzione di qualità o di prezzo, l&apos;organizzatore riconosce un rimborso appropriato.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 10 – Risarcimento del danno</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il viaggiatore ha diritto al risarcimento per i danni subiti, inclusi i danni morali, nei limiti previsti dalla legge applicabile, dalle convenzioni internazionali e dai regolamenti UE applicabili (es. Regolamento CE 261/2004 per i voli). La responsabilità dell&apos;organizzatore è limitata al triplo del prezzo del pacchetto per i danni non alla persona; per i danni alla persona si applica la Convenzione di Montreal per il trasporto aereo.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 11 – Obblighi del viaggiatore</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Il viaggiatore è tenuto a: comunicare all&apos;organizzatore esigenze particolari (alimentari, mediche, di accessibilità) in fase di prenotazione; rispettare le norme di comportamento nei Paesi visitati; seguire le istruzioni dell&apos;organizzatore e delle guide; comunicare tempestivamente qualsiasi disguido. Il viaggiatore risponde dei danni causati ai fornitori e all&apos;organizzatore per comportamenti contrari alle presenti condizioni.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 12 – Assicurazioni</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            MY HOPE STEP BY NAJLA è coperta da assicurazione di responsabilità civile professionale (Bene Assicurazioni S.p.A., polizza n. 10099091000157, massimale € 2.100.000) e da garanzia per insolvenza (Fondo VACANZE GARANTITE®, cert. n. 2026092813AT). Si raccomanda vivamente al viaggiatore di stipulare una polizza di viaggio che copra cancellazione, spese mediche, bagaglio e rimpatrio.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 13 – Visti, requisiti di ingresso e documenti</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            L&apos;organizzatore fornisce indicazioni generali sui requisiti di ingresso e sui documenti necessari per i cittadini italiani. Il viaggiatore è responsabile di verificare i requisiti specifici presso le autorità consolari competenti in relazione alla propria cittadinanza e di dotarsi in tempo utile di tutti i documenti necessari (passaporto con validità residua adeguata, visti, certificati sanitari). L&apos;organizzatore declina ogni responsabilità per l&apos;impossibilità di viaggiare dovuta a documenti mancanti, scaduti o non conformi.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 14 – Bagagli</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I limiti di peso e dimensione del bagaglio sono quelli stabiliti dai vettori. Il viaggiatore è responsabile del rispetto di tali limiti e dei costi di eventuale bagaglio extra. La responsabilità per smarrimento o danneggiamento del bagaglio è disciplinata dalle convenzioni internazionali applicabili e dalle condizioni del vettore.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 15 – Circostanze eccezionali e forza maggiore</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            L&apos;organizzatore non è responsabile per inadempimenti dovuti a eventi di forza maggiore, ovvero situazioni imprevedibili e inevitabili estranee all&apos;organizzatore (catastrofi naturali, atti terroristici, pandemie dichiarate dall&apos;OMS, guerra, sommosse, scioperi di vettori non prevedibili). In tali casi l&apos;organizzatore si impegna ad assistere il viaggiatore nel rimpatrio e a proporre soluzioni alternative, nei limiti della ragionevole possibilità.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Art. 16 – Pagamenti, cancellazioni e penali</h3>

          <h4 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">Modalità di pagamento</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Al momento della prenotazione è richiesto un acconto pari al 30% del prezzo totale del pacchetto, salvo diversa indicazione nel contratto. Il saldo deve essere versato entro 30 giorni prima della partenza, o entro la scadenza indicata nel contratto. Il mancato pagamento nei termini stabiliti comporta la risoluzione automatica del contratto con applicazione delle penali di cancellazione.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            I pagamenti sono accettati tramite bonifico bancario, carta di credito/debito o PayPal secondo le modalità indicate al momento della prenotazione. Le spese bancarie e di commissione sono a carico del viaggiatore.
          </p>

          <h4 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">Penali di cancellazione per pacchetti turistici</h4>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm text-neutral-600 border-collapse">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">Preavviso rispetto alla partenza</th>
                  <th className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">Penale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-neutral-200">Più di 60 giorni</td>
                  <td className="p-3 border border-neutral-200">Perdita dell&apos;acconto (30% del prezzo)</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200">Da 59 a 30 giorni</td>
                  <td className="p-3 border border-neutral-200">50% del prezzo totale</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200">Da 29 a 15 giorni</td>
                  <td className="p-3 border border-neutral-200">75% del prezzo totale</td>
                </tr>
                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-200">Da 14 giorni a 48 ore prima</td>
                  <td className="p-3 border border-neutral-200">90% del prezzo totale</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-200">Meno di 48 ore o non presentazione</td>
                  <td className="p-3 border border-neutral-200">100% del prezzo totale</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Le penali indicate sono quelle standard; in alcuni casi specifici (voli charter, crociere, periodi di alta stagione, Hajj e Omra) possono essere applicate penali diverse indicate nel contratto specifico. Le penali dei singoli fornitori (vettori, strutture) si applicano in aggiunta alle presenti qualora più gravose.
          </p>

          <h4 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">Rimborsi</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I rimborsi sono erogati entro 14 giorni dalla ricezione della richiesta scritta di recesso, mediante lo stesso mezzo di pagamento utilizzato per il versamento, salvo diverso accordo scritto. Le spese di gestione pratiche non rimborsabili (spese di prenotazione, assicurazioni, visti) sono escluse dal rimborso.
          </p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Parte II – Condizioni per servizi singoli (non pacchetti)</h2>

          <p className="text-sm text-neutral-600 leading-relaxed">
            I seguenti servizi possono essere venduti singolarmente, al di fuori di un pacchetto turistico. In tal caso si applicano le condizioni specifiche del fornitore del servizio e le presenti condizioni generali per la parte relativa all&apos;intermediazione.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Biglietteria aerea e trasporti</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Per i biglietti aerei venduti separatamente da un pacchetto, MY HOPE STEP BY NAJLA agisce come intermediario tra il viaggiatore e il vettore. Le condizioni tariffarie (rimborso, modifica, upgrade) sono quelle della tariffa acquistata presso il vettore. In caso di cancellazione o modifica del volo da parte del vettore, si applicano le tutele previste dal Regolamento CE 261/2004. Le spese di servizio dell&apos;agenzia non sono rimborsabili.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Alloggio</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Per le prenotazioni alberghiere vendute separatamente, le condizioni di cancellazione sono quelle della struttura ricettiva e della tariffa prenotata (rimborsabile o non rimborsabile). Il check-in e il check-out sono soggetti agli orari della struttura. MY HOPE STEP BY NAJLA agisce come intermediario e non è responsabile per problemi relativi alla struttura.
          </p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">Escursioni e servizi opzionali in loco</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Le escursioni, le visite guidate e i servizi opzionali acquistati prima della partenza o in loco sono soggetti alle condizioni dei rispettivi fornitori locali. L&apos;organizzatore non è responsabile per i servizi opzionali non inclusi nel pacchetto originale.
          </p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Parte III – Modulo informativo standard</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Ai sensi della Direttiva UE 2015/2302 (recepita in Italia con D.Lgs. 62/2018), prima della conclusione del contratto di pacchetto turistico, il viaggiatore riceve le seguenti informazioni principali:
          </p>
          <ul className="text-sm text-neutral-600 mt-4 space-y-3 list-none pl-0">
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Diritti fondamentali ai sensi della Direttiva 2015/2302/UE</strong>
              I viaggiatori beneficeranno di tutti i diritti fondamentali dell&apos;UE applicabili ai pacchetti turistici. Le imprese tenute a rispettare tali diritti sono pienamente responsabili della corretta esecuzione dell&apos;intero pacchetto.
            </li>
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Indirizzo di posta elettronica e numero di telefono</strong>
              prenotazioni@myhope-step.com · Tel. +39 352 272 36 25
            </li>
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Trasferimento del contratto</strong>
              I viaggiatori possono trasferire il contratto a un&apos;altra persona, previa comunicazione all&apos;organizzatore in tempo ragionevole e versamento delle eventuali spese aggiuntive.
            </li>
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Variazione del prezzo</strong>
              Il prezzo può essere aumentato solo se aumentano determinati costi specifici (ad es. prezzi del carburante) e se ciò è esplicitamente previsto nel contratto; in nessun caso è possibile aumentare il prezzo nei 20 giorni precedenti l&apos;inizio del pacchetto. Se l&apos;aumento del prezzo supera l&apos;8% del prezzo del pacchetto, il viaggiatore può risolvere il contratto.
            </li>
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Risoluzione del contratto in caso di circostanze eccezionali</strong>
              I viaggiatori possono risolvere il contratto senza pagare spese di risoluzione e ottenere un rimborso completo qualora si verifichino circostanze eccezionali e inevitabili nel luogo di destinazione che incidano in modo sostanziale sul pacchetto.
            </li>
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Assistenza in caso di difficoltà</strong>
              L&apos;organizzatore è tenuto a prestare assistenza qualora il viaggiatore si trovi in difficoltà, tra cui informazioni sui servizi sanitari, sulle autorità locali e sull&apos;assistenza consolare, nonché assistenza effettuare comunicazioni a distanza e aiutare il viaggiatore a trovare servizi di viaggio alternativi.
            </li>
            <li className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <strong className="block text-neutral-700 mb-1">Protezione in caso di insolvenza</strong>
              MY HOPE STEP BY NAJLA è protetta contro l&apos;insolvenza tramite il Fondo Consortile di Garanzia VACANZE GARANTITE® (cert. n. 2026092813AT). I viaggiatori possono contattare questo organismo o, ove applicabile, l&apos;autorità competente (Ministero del Turismo) qualora i servizi vengano negati a causa dell&apos;insolvenza dell&apos;organizzatore.
            </li>
          </ul>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Parte IV – Hajj e Omra</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            I pacchetti per Hajj e Omra sono soggetti alle presenti condizioni generali con le seguenti specificità:
          </p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2 list-disc list-inside">
            <li>Le quote assegnate dall&apos;Arabia Saudita per il Hajj sono limitate e soggette a disponibilità annuale; la prenotazione non garantisce l&apos;assegnazione del permesso</li>
            <li>I documenti richiesti (passaporto, certificato di vaccinazione meningite ACWY, foto formato specifico) devono essere forniti entro le scadenze indicate dall&apos;organizzatore</li>
            <li>I programmi di Omra possono subire variazioni nei servizi religiosi in base alla gestione saudita dei luoghi santi</li>
            <li>Le penali di cancellazione per i pacchetti Hajj e Omra possono differire da quelle standard, in relazione ai costi non recuperabili dei permessi e dei fornitori locali</li>
            <li>Si applicano le norme saudite in materia di comportamento e abbigliamento nei luoghi sacri</li>
          </ul>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">Disposizioni finali</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Le presenti condizioni sono regolate dalla legge italiana. Per le controversie con consumatori, è competente il tribunale del luogo di residenza o domicilio del consumatore in Italia. Per la risoluzione alternativa delle controversie, il consumatore può ricorrere alla piattaforma ODR europea (ec.europa.eu/consumers/odr) o agli organismi di mediazione accreditati.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">
            Le presenti condizioni possono essere aggiornate; la versione vigente è sempre disponibile sul sito www.myhope-step.com. La versione applicabile al contratto è quella in vigore al momento della prenotazione.
          </p>

        </div>
      </main>
      <Footer />
    </>
  )
}
