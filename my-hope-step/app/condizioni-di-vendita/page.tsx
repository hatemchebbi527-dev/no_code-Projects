"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useI18n } from "@/lib/i18n"

const penaltyTable = {
  fr: {
    headers: ["Préavis avant le départ", "Pénalité"],
    rows: [
      ["Plus de 60 jours", "Perte de l'acompte (30 % du prix)"],
      ["De 59 à 30 jours", "50 % du prix total"],
      ["De 29 à 15 jours", "75 % du prix total"],
      ["De 14 jours à 48 heures", "90 % du prix total"],
      ["Moins de 48 heures ou non-présentation", "100 % du prix total"],
    ],
  },
  it: {
    headers: ["Preavviso rispetto alla partenza", "Penale"],
    rows: [
      ["Più di 60 giorni", "Perdita dell'acconto (30% del prezzo)"],
      ["Da 59 a 30 giorni", "50% del prezzo totale"],
      ["Da 29 a 15 giorni", "75% del prezzo totale"],
      ["Da 14 giorni a 48 ore prima", "90% del prezzo totale"],
      ["Meno di 48 ore o non presentazione", "100% del prezzo totale"],
    ],
  },
}

const content = {
  fr: {
    title: "Conditions de vente",
    updated: "Dernière mise à jour : septembre 2026",
    intro: "Les présentes conditions régissent la vente de forfaits touristiques et de services individuels par MY HOPE STEP BY NAJLA (titulaire : CHEBBI NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologne, N° TVA IT 04405401201), conformément au Code du tourisme (D.Lgs. 79/2011), à la Directive UE 2015/2302 transposée par le D.Lgs. 62/2018 et au Code de la consommation (D.Lgs. 206/2005).",

    part1Title: "Partie I – Conditions générales pour les forfaits touristiques",
    articles: [
      { title: "Art. 1 – Définitions", text: "Aux fins des présentes conditions, on entend par : Organisateur : MY HOPE STEP BY NAJLA, qui combine et vend les forfaits touristiques ; Voyageur : toute personne qui souhaite conclure ou conclut un contrat de forfait touristique ; Forfait touristique : combinaison d'au moins deux services (transport + hébergement, ou avec d'autres services touristiques significatifs) pour le même voyage, d'une durée supérieure à 24 heures ou avec nuitée ; Services de voyage : transport de passagers, hébergement, location de véhicules, services touristiques (visites guidées, excursions, événements)." },
      { title: "Art. 2 – Formation du contrat", text: "Le contrat de forfait touristique est perfectionné par la confirmation écrite de l'organisateur et le versement de l'acompte requis. Avant la conclusion du contrat, le voyageur reçoit le formulaire d'information standard prévu par la Directive 2015/2302. L'offre du site web constitue une invitation à proposer ; la réservation du voyageur est une proposition contractuelle que l'organisateur peut accepter ou refuser." },
      { title: "Art. 3 – Documentation et informations pré-départ", text: "L'organisateur fournit au voyageur, suffisamment à l'avance et en tout cas au plus tard 7 jours avant le départ, la documentation de voyage complète (vouchers, billets, programme détaillé, coordonnées d'urgence, informations d'assurance). Le voyageur est responsable d'être en possession des documents d'identité valides, visas, certificats de vaccination et de tous les documents d'entrée requis par les pays de destination et de transit." },
      { title: "Art. 4 – Prix et révision du prix", text: "Le prix du forfait est indiqué dans le contrat et ne peut être révisé à la hausse ou à la baisse qu'en cas de variations du coût du carburant, des tarifs aériens ou des taux de change, dans les limites prévues par la loi. L'augmentation du prix ne peut dépasser 8 % du prix total du forfait. Si l'augmentation dépasse 8 %, le voyageur peut se rétracter sans pénalités. Aucune augmentation ne peut être appliquée dans les 20 jours précédant le départ." },
      { title: "Art. 5 – Modifications du contrat par l'organisateur", text: "Si l'organisateur ne peut pas fournir la majeure partie des services convenus, ou propose des modifications significatives à des éléments essentiels du forfait (prix, destination, dates, qualité de l'hébergement), il en informe le voyageur sans délai et par écrit. Le voyageur peut accepter la modification, choisir un forfait de remplacement ou se rétracter avec remboursement intégral sous 14 jours." },
      { title: "Art. 6 – Cession du contrat", text: "Le voyageur peut céder le contrat à une tierce personne qui satisfait à toutes les conditions applicables au forfait, moyennant notification écrite à l'organisateur avec un préavis raisonnable et d'au moins 7 jours avant le départ. Le cédant et le cessionnaire répondent solidairement du paiement du solde et des frais supplémentaires éventuels découlant de la cession." },
      { title: "Art. 7 – Rétractation du voyageur", text: "Le voyageur peut se rétracter du contrat à tout moment avant le départ, moyennant les pénalités de résiliation indiquées à l'art. 16. La rétractation sans pénalités est autorisée en cas de : (a) circonstances inévitables et extraordinaires sur le lieu de destination ayant une incidence substantielle sur le forfait ; (b) augmentation du prix supérieure à 8 % ; (c) modification significative d'un élément essentiel du forfait par l'organisateur. Dans ces derniers cas, le remboursement est intégral." },
      { title: "Art. 8 – Résiliation pour non-atteinte du nombre minimum", text: "L'organisateur peut résilier le contrat et rembourser intégralement le voyageur si le nombre de participants est inférieur au minimum indiqué dans le contrat, à condition que la communication soit effectuée au plus tard : 20 jours avant le départ pour les voyages de plus de 6 jours ; 7 jours pour les voyages de 2 à 6 jours ; 48 heures pour les voyages de moins de 2 jours." },
      { title: "Art. 9 – Responsabilité de l'organisateur", text: "L'organisateur est responsable de l'exécution des services de voyage inclus dans le contrat, qu'ils soient prestés par lui-même ou par d'autres fournisseurs. En cas d'inexécution ou de mauvaise exécution, l'organisateur doit prêter une assistance adéquate et proposer des solutions de remplacement pour la poursuite du voyage." },
      { title: "Art. 10 – Indemnisation", text: "Le voyageur a droit à une indemnisation pour les dommages subis, y compris les dommages moraux, dans les limites prévues par la loi applicable et les conventions internationales (ex. Règlement CE 261/2004 pour les vols). La responsabilité de l'organisateur est limitée au triple du prix du forfait pour les dommages non corporels." },
      { title: "Art. 11 – Obligations du voyageur", text: "Le voyageur est tenu de : communiquer à l'organisateur ses exigences particulières (alimentaires, médicales, d'accessibilité) lors de la réservation ; respecter les règles de conduite dans les pays visités ; suivre les instructions de l'organisateur et des guides ; signaler tout problème dans les meilleurs délais." },
      { title: "Art. 12 – Assurances", text: "MY HOPE STEP BY NAJLA est couverte par une assurance de responsabilité civile professionnelle (Bene Assicurazioni S.p.A., police n° 10099091000157, plafond 2.100.000 €) et par une garantie d'insolvabilité (Fonds VACANZE GARANTITE®, cert. n° 2026092813AT). Il est vivement recommandé au voyageur de souscrire une assurance voyage couvrant l'annulation, les frais médicaux, le bagage et le rapatriement." },
      { title: "Art. 13 – Visas, conditions d'entrée et documents", text: "L'organisateur fournit des indications générales sur les conditions d'entrée pour les citoyens italiens. Le voyageur est responsable de vérifier les exigences spécifiques auprès des autorités consulaires compétentes selon sa nationalité et de se procurer en temps utile tous les documents nécessaires. L'organisateur décline toute responsabilité pour l'impossibilité de voyager due à des documents manquants, expirés ou non conformes." },
      { title: "Art. 14 – Bagages", text: "Les limites de poids et de dimensions des bagages sont celles établies par les transporteurs. Le voyageur est responsable du respect de ces limites et des frais de bagage supplémentaire éventuels. La responsabilité pour perte ou détérioration des bagages est régie par les conventions internationales applicables et les conditions du transporteur." },
      { title: "Art. 15 – Circonstances exceptionnelles et force majeure", text: "L'organisateur n'est pas responsable des inexécutions dues à des événements de force majeure, c'est-à-dire des situations imprévisibles et inévitables étrangères à l'organisateur (catastrophes naturelles, actes terroristes, pandémies déclarées par l'OMS, guerre, émeutes, grèves de transporteurs imprévisibles). Dans ces cas, l'organisateur s'engage à assister le voyageur pour le rapatriement et à proposer des solutions alternatives." },
    ],

    paymentTitle: "Art. 16 – Paiements, annulations et pénalités",
    paymentSubTitle: "Modalités de paiement",
    payment1: "Lors de la réservation, un acompte de 30 % du prix total du forfait est requis, sauf indication contraire dans le contrat. Le solde doit être versé au plus tard 30 jours avant le départ, ou à l'échéance indiquée dans le contrat. Le non-paiement dans les délais entraîne la résiliation automatique du contrat avec application des pénalités d'annulation.",
    payment2: "Les paiements sont acceptés par virement bancaire, carte de crédit/débit ou PayPal selon les modalités indiquées lors de la réservation. Les frais bancaires et commissions sont à la charge du voyageur.",
    penaltyTitle: "Pénalités d'annulation pour les forfaits touristiques",
    penaltyNote: "Les pénalités indiquées sont les pénalités standard ; dans certains cas spécifiques (vols charter, croisières, haute saison, Hajj et Omra), des pénalités différentes peuvent s'appliquer selon le contrat. Les pénalités des fournisseurs individuels (transporteurs, hébergeurs) s'appliquent en sus si elles sont plus élevées.",
    refundTitle: "Remboursements",
    refundText: "Les remboursements sont versés dans les 14 jours suivant la réception de la demande écrite de rétractation, via le même moyen de paiement utilisé pour le versement, sauf accord écrit différent. Les frais de gestion non remboursables (frais de réservation, assurances, visas) sont exclus du remboursement.",

    part2Title: "Partie II – Conditions pour les services individuels",
    part2Intro: "Les services suivants peuvent être vendus individuellement, en dehors d'un forfait touristique. Dans ce cas, les conditions spécifiques du fournisseur du service et les présentes conditions générales pour la partie relative à l'intermédiation s'appliquent.",
    single1Title: "Billets d'avion et transports",
    single1Text: "Pour les billets d'avion vendus séparément d'un forfait, MY HOPE STEP BY NAJLA agit en tant qu'intermédiaire entre le voyageur et le transporteur. Les conditions tarifaires (remboursement, modification, surclassement) sont celles de la tarification achetée auprès du transporteur. En cas d'annulation ou de modification du vol par le transporteur, les protections prévues par le Règlement CE 261/2004 s'appliquent. Les frais de service de l'agence ne sont pas remboursables.",
    single2Title: "Hébergement",
    single2Text: "Pour les réservations hôtelières vendues séparément, les conditions d'annulation sont celles de l'établissement hôtelier et du tarif réservé (remboursable ou non remboursable). MY HOPE STEP BY NAJLA agit en tant qu'intermédiaire.",
    single3Title: "Excursions et services optionnels",
    single3Text: "Les excursions, visites guidées et services optionnels achetés avant le départ ou sur place sont soumis aux conditions des fournisseurs locaux respectifs. L'organisateur n'est pas responsable des services optionnels non inclus dans le forfait original.",

    part3Title: "Partie III – Formulaire d'information standard",
    part3Intro: "Conformément à la Directive UE 2015/2302, avant la conclusion du contrat de forfait touristique, le voyageur reçoit les informations principales suivantes :",
    standardItems: [
      { title: "Droits fondamentaux au titre de la Directive 2015/2302/UE", text: "Les voyageurs bénéficient de tous les droits fondamentaux de l'UE applicables aux forfaits touristiques. Les entreprises tenues de respecter ces droits sont pleinement responsables de la bonne exécution du forfait." },
      { title: "Adresse email et numéro de téléphone", text: "prenotazioni@myhope-step.com · Tél. +39 352 272 36 25" },
      { title: "Transfert du contrat", text: "Les voyageurs peuvent transférer le contrat à une autre personne, moyennant notification à l'organisateur dans un délai raisonnable et versement des frais supplémentaires éventuels." },
      { title: "Variation du prix", text: "Le prix ne peut être augmenté que si certains coûts spécifiques augmentent (ex. prix du carburant) et si cela est explicitement prévu dans le contrat ; en aucun cas il n'est possible d'augmenter le prix dans les 20 jours précédant le départ. Si l'augmentation du prix dépasse 8 % du prix du forfait, le voyageur peut résilier le contrat." },
      { title: "Résiliation en cas de circonstances exceptionnelles", text: "Les voyageurs peuvent résilier le contrat sans frais de résiliation et obtenir un remboursement complet en cas de circonstances exceptionnelles et inévitables sur le lieu de destination ayant une incidence substantielle sur le forfait." },
      { title: "Assistance en cas de difficultés", text: "L'organisateur est tenu de prêter assistance au voyageur en difficulté, notamment des informations sur les services de santé, les autorités locales et l'assistance consulaire, ainsi que de l'aide pour communiquer à distance et trouver des services de voyage alternatifs." },
      { title: "Protection en cas d'insolvabilité", text: "MY HOPE STEP BY NAJLA est protégée contre l'insolvabilité par le Fonds consortial de garantie VACANZE GARANTITE® (cert. n° 2026092813AT). Les voyageurs peuvent contacter cet organisme si les services leur sont refusés en raison de l'insolvabilité de l'organisateur." },
    ],

    part4Title: "Partie IV – Hajj et Omra",
    part4Intro: "Les forfaits pour le Hajj et l'Omra sont soumis aux présentes conditions générales avec les particularités suivantes :",
    part4Items: [
      "Les quotas attribués par l'Arabie saoudite pour le Hajj sont limités et soumis à disponibilité annuelle ; la réservation ne garantit pas l'attribution du permis",
      "Les documents requis (passeport, certificat de vaccination méningite ACWY, photos format spécifique) doivent être fournis dans les délais indiqués par l'organisateur",
      "Les programmes d'Omra peuvent être modifiés dans leurs services religieux selon la gestion saoudienne des lieux saints",
      "Les pénalités d'annulation pour les forfaits Hajj et Omra peuvent différer des pénalités standard, en raison des coûts non récupérables des permis et des fournisseurs locaux",
      "Les règles saoudiennes en matière de comportement et de tenue vestimentaire dans les lieux saints s'appliquent",
    ],

    finalTitle: "Dispositions finales",
    final1: "Les présentes conditions sont régies par le droit italien. Pour les litiges avec les consommateurs, le tribunal du lieu de résidence ou de domicile du consommateur en Italie est compétent. Pour la résolution alternative des litiges, le consommateur peut recourir à la plateforme ODR européenne (ec.europa.eu/consumers/odr) ou aux organismes de médiation accrédités.",
    final2: "Les présentes conditions peuvent être mises à jour ; la version en vigueur est toujours disponible sur le site www.myhope-step.com. La version applicable au contrat est celle en vigueur au moment de la réservation.",
  },

  it: {
    title: "Condizioni di vendita",
    updated: "Ultimo aggiornamento: settembre 2026",
    intro: "Le presenti condizioni disciplinano la vendita di pacchetti turistici e servizi singoli da parte di MY HOPE STEP BY NAJLA (titolare: CHEBBI NAJLA, Via Alfredo Calzoni 1/3, 40128 Bologna, P. IVA 04405401201), in conformità al D.Lgs. 79/2011 (Codice del Turismo), alla Direttiva UE 2015/2302 recepita con D.Lgs. 62/2018, e al Codice del Consumo (D.Lgs. 206/2005).",

    part1Title: "Parte I – Condizioni generali per pacchetti turistici",
    articles: [
      { title: "Art. 1 – Definizioni", text: "Ai fini delle presenti condizioni si intende per: Organizzatore: MY HOPE STEP BY NAJLA, che combina e vende i pacchetti turistici; Viaggiatore: chiunque intenda concludere o conclude un contratto di pacchetto turistico; Pacchetto turistico: combinazione di almeno due servizi (trasporto + alloggio, o con altri servizi turistici significativi) per lo stesso viaggio, con durata superiore alle 24 ore o con pernottamento; Servizi di viaggio: trasporto di passeggeri, alloggio, noleggio auto, servizi turistici (visite guidate, escursioni, eventi)." },
      { title: "Art. 2 – Formazione del contratto", text: "Il contratto di pacchetto turistico si perfeziona con la conferma scritta dell'organizzatore e il versamento dell'acconto richiesto. Prima della conclusione del contratto, il viaggiatore riceve il modulo informativo standard previsto dalla Direttiva 2015/2302. L'offerta del sito web costituisce un invito a proporre; la prenotazione del viaggiatore è una proposta contrattuale che l'organizzatore può accettare o rifiutare." },
      { title: "Art. 3 – Documentazione di viaggio e informazioni pre-partenza", text: "L'organizzatore fornisce al viaggiatore, con congruo anticipo e comunque non oltre 7 giorni prima della partenza, la documentazione di viaggio completa (voucher, biglietti, programma dettagliato, recapiti di emergenza, informazioni assicurative). Il viaggiatore è responsabile di essere in possesso dei documenti di identità validi, visti, certificati vaccinali e di tutti i requisiti di ingresso richiesti dai Paesi di destinazione." },
      { title: "Art. 4 – Prezzo e revisione del prezzo", text: "Il prezzo del pacchetto è indicato nel contratto e può essere rivisto solo in caso di variazioni del costo del carburante, delle tariffe aeree o dei tassi di cambio, nei limiti previsti dalla legge. L'aumento del prezzo non può superare l'8% del prezzo totale del pacchetto. Se l'aumento supera l'8%, il viaggiatore può recedere dal contratto senza penali. Nessun aumento può essere applicato nei 20 giorni precedenti la partenza." },
      { title: "Art. 5 – Modifiche al contratto da parte dell'organizzatore", text: "Se l'organizzatore non può fornire la maggior parte dei servizi concordati, o propone modifiche significative a elementi essenziali del pacchetto, ne informa il viaggiatore senza indugio e per iscritto. Il viaggiatore può accettare la modifica, scegliere un pacchetto sostitutivo o recedere dal contratto con rimborso integrale entro 14 giorni." },
      { title: "Art. 6 – Cessione del contratto", text: "Il viaggiatore può cedere il contratto a una terza persona che soddisfi tutti i requisiti applicabili al pacchetto, previa comunicazione scritta all'organizzatore con un preavviso ragionevole e non inferiore a 7 giorni prima della partenza. Il cedente e il cessionario rispondono in solido del pagamento del prezzo residuo." },
      { title: "Art. 7 – Recesso del viaggiatore", text: "Il viaggiatore può recedere dal contratto in qualsiasi momento prima della partenza, pagando le penali di cancellazione indicate al successivo art. 16. Il recesso senza penali è consentito in caso di: (a) circostanze inevitabili e straordinarie nel luogo di destinazione che incidano in modo sostanziale sul pacchetto; (b) aumento del prezzo superiore all'8%; (c) modifica significativa di un elemento essenziale del pacchetto. In questi ultimi casi il rimborso è integrale." },
      { title: "Art. 8 – Recesso dell'organizzatore per mancato numero minimo", text: "L'organizzatore può risolvere il contratto e rimborsare integralmente il viaggiatore se il numero dei partecipanti è inferiore al minimo indicato nel contratto, purché la comunicazione sia effettuata non oltre: 20 giorni prima per viaggi superiori a 6 giorni; 7 giorni per viaggi da 2 a 6 giorni; 48 ore per viaggi di meno di 2 giorni." },
      { title: "Art. 9 – Responsabilità dell'organizzatore", text: "L'organizzatore è responsabile dell'esecuzione dei servizi di viaggio inclusi nel contratto, indipendentemente dal fatto che siano prestati da lui direttamente o da altri fornitori. In caso di mancata o inesatta esecuzione, l'organizzatore deve prestare adeguata assistenza e proporre soluzioni adeguate al proseguimento del viaggio." },
      { title: "Art. 10 – Risarcimento del danno", text: "Il viaggiatore ha diritto al risarcimento per i danni subiti, inclusi i danni morali, nei limiti previsti dalla legge applicabile, dalle convenzioni internazionali e dai regolamenti UE applicabili (es. Regolamento CE 261/2004 per i voli). La responsabilità dell'organizzatore è limitata al triplo del prezzo del pacchetto per i danni non alla persona." },
      { title: "Art. 11 – Obblighi del viaggiatore", text: "Il viaggiatore è tenuto a: comunicare all'organizzatore esigenze particolari in fase di prenotazione; rispettare le norme di comportamento nei Paesi visitati; seguire le istruzioni dell'organizzatore e delle guide; comunicare tempestivamente qualsiasi disguido." },
      { title: "Art. 12 – Assicurazioni", text: "MY HOPE STEP BY NAJLA è coperta da assicurazione di responsabilità civile professionale (Bene Assicurazioni S.p.A., polizza n. 10099091000157, massimale € 2.100.000) e da garanzia per insolvenza (Fondo VACANZE GARANTITE®, cert. n. 2026092813AT). Si raccomanda vivamente al viaggiatore di stipulare una polizza di viaggio." },
      { title: "Art. 13 – Visti, requisiti di ingresso e documenti", text: "L'organizzatore fornisce indicazioni generali sui requisiti di ingresso per i cittadini italiani. Il viaggiatore è responsabile di verificare i requisiti specifici presso le autorità consolari competenti e di dotarsi in tempo utile di tutti i documenti necessari." },
      { title: "Art. 14 – Bagagli", text: "I limiti di peso e dimensione del bagaglio sono quelli stabiliti dai vettori. Il viaggiatore è responsabile del rispetto di tali limiti e dei costi di eventuale bagaglio extra." },
      { title: "Art. 15 – Circostanze eccezionali e forza maggiore", text: "L'organizzatore non è responsabile per inadempimenti dovuti a eventi di forza maggiore (catastrofi naturali, atti terroristici, pandemie OMS, guerra, sommosse, scioperi di vettori). In tali casi l'organizzatore si impegna ad assistere il viaggiatore nel rimpatrio e a proporre soluzioni alternative." },
    ],

    paymentTitle: "Art. 16 – Pagamenti, cancellazioni e penali",
    paymentSubTitle: "Modalità di pagamento",
    payment1: "Al momento della prenotazione è richiesto un acconto pari al 30% del prezzo totale del pacchetto, salvo diversa indicazione nel contratto. Il saldo deve essere versato entro 30 giorni prima della partenza, o entro la scadenza indicata nel contratto. Il mancato pagamento nei termini stabiliti comporta la risoluzione automatica del contratto con applicazione delle penali di cancellazione.",
    payment2: "I pagamenti sono accettati tramite bonifico bancario, carta di credito/debito o PayPal secondo le modalità indicate al momento della prenotazione. Le spese bancarie e di commissione sono a carico del viaggiatore.",
    penaltyTitle: "Penali di cancellazione per pacchetti turistici",
    penaltyNote: "Le penali indicate sono quelle standard; in alcuni casi specifici (voli charter, crociere, periodi di alta stagione, Hajj e Omra) possono essere applicate penali diverse indicate nel contratto specifico. Le penali dei singoli fornitori si applicano in aggiunta alle presenti qualora più gravose.",
    refundTitle: "Rimborsi",
    refundText: "I rimborsi sono erogati entro 14 giorni dalla ricezione della richiesta scritta di recesso, mediante lo stesso mezzo di pagamento utilizzato per il versamento, salvo diverso accordo scritto. Le spese di gestione pratiche non rimborsabili sono escluse dal rimborso.",

    part2Title: "Parte II – Condizioni per servizi singoli (non pacchetti)",
    part2Intro: "I seguenti servizi possono essere venduti singolarmente, al di fuori di un pacchetto turistico. In tal caso si applicano le condizioni specifiche del fornitore del servizio e le presenti condizioni generali per la parte relativa all'intermediazione.",
    single1Title: "Biglietteria aerea e trasporti",
    single1Text: "Per i biglietti aerei venduti separatamente da un pacchetto, MY HOPE STEP BY NAJLA agisce come intermediario tra il viaggiatore e il vettore. Le condizioni tariffarie (rimborso, modifica, upgrade) sono quelle della tariffa acquistata presso il vettore. In caso di cancellazione o modifica del volo da parte del vettore, si applicano le tutele previste dal Regolamento CE 261/2004. Le spese di servizio dell'agenzia non sono rimborsabili.",
    single2Title: "Alloggio",
    single2Text: "Per le prenotazioni alberghiere vendute separatamente, le condizioni di cancellazione sono quelle della struttura ricettiva e della tariffa prenotata. MY HOPE STEP BY NAJLA agisce come intermediario.",
    single3Title: "Escursioni e servizi opzionali in loco",
    single3Text: "Le escursioni, le visite guidate e i servizi opzionali acquistati prima della partenza o in loco sono soggetti alle condizioni dei rispettivi fornitori locali. L'organizzatore non è responsabile per i servizi opzionali non inclusi nel pacchetto originale.",

    part3Title: "Parte III – Modulo informativo standard",
    part3Intro: "Ai sensi della Direttiva UE 2015/2302, prima della conclusione del contratto di pacchetto turistico, il viaggiatore riceve le seguenti informazioni principali:",
    standardItems: [
      { title: "Diritti fondamentali ai sensi della Direttiva 2015/2302/UE", text: "I viaggiatori beneficeranno di tutti i diritti fondamentali dell'UE applicabili ai pacchetti turistici. Le imprese tenute a rispettare tali diritti sono pienamente responsabili della corretta esecuzione dell'intero pacchetto." },
      { title: "Indirizzo di posta elettronica e numero di telefono", text: "prenotazioni@myhope-step.com · Tel. +39 352 272 36 25" },
      { title: "Trasferimento del contratto", text: "I viaggiatori possono trasferire il contratto a un'altra persona, previa comunicazione all'organizzatore in tempo ragionevole e versamento delle eventuali spese aggiuntive." },
      { title: "Variazione del prezzo", text: "Il prezzo può essere aumentato solo se aumentano determinati costi specifici (ad es. prezzi del carburante) e se ciò è esplicitamente previsto nel contratto; in nessun caso è possibile aumentare il prezzo nei 20 giorni precedenti l'inizio del pacchetto. Se l'aumento del prezzo supera l'8% del prezzo del pacchetto, il viaggiatore può risolvere il contratto." },
      { title: "Risoluzione del contratto in caso di circostanze eccezionali", text: "I viaggiatori possono risolvere il contratto senza pagare spese di risoluzione e ottenere un rimborso completo qualora si verifichino circostanze eccezionali e inevitabili nel luogo di destinazione che incidano in modo sostanziale sul pacchetto." },
      { title: "Assistenza in caso di difficoltà", text: "L'organizzatore è tenuto a prestare assistenza qualora il viaggiatore si trovi in difficoltà, tra cui informazioni sui servizi sanitari, sulle autorità locali e sull'assistenza consolare, nonché assistenza per effettuare comunicazioni a distanza." },
      { title: "Protezione in caso di insolvenza", text: "MY HOPE STEP BY NAJLA è protetta contro l'insolvenza tramite il Fondo Consortile di Garanzia VACANZE GARANTITE® (cert. n. 2026092813AT). I viaggiatori possono contattare questo organismo qualora i servizi vengano negati a causa dell'insolvenza dell'organizzatore." },
    ],

    part4Title: "Parte IV – Hajj e Omra",
    part4Intro: "I pacchetti per Hajj e Omra sono soggetti alle presenti condizioni generali con le seguenti specificità:",
    part4Items: [
      "Le quote assegnate dall'Arabia Saudita per il Hajj sono limitate e soggette a disponibilità annuale; la prenotazione non garantisce l'assegnazione del permesso",
      "I documenti richiesti (passaporto, certificato di vaccinazione meningite ACWY, foto formato specifico) devono essere forniti entro le scadenze indicate dall'organizzatore",
      "I programmi di Omra possono subire variazioni nei servizi religiosi in base alla gestione saudita dei luoghi santi",
      "Le penali di cancellazione per i pacchetti Hajj e Omra possono differire da quelle standard, in relazione ai costi non recuperabili dei permessi e dei fornitori locali",
      "Si applicano le norme saudite in materia di comportamento e abbigliamento nei luoghi sacri",
    ],

    finalTitle: "Disposizioni finali",
    final1: "Le presenti condizioni sono regolate dalla legge italiana. Per le controversie con consumatori, è competente il tribunale del luogo di residenza o domicilio del consumatore in Italia. Per la risoluzione alternativa delle controversie, il consumatore può ricorrere alla piattaforma ODR europea (ec.europa.eu/consumers/odr) o agli organismi di mediazione accreditati.",
    final2: "Le presenti condizioni possono essere aggiornate; la versione vigente è sempre disponibile sul sito www.myhope-step.com. La versione applicabile al contratto è quella in vigore al momento della prenotazione.",
  },
}

export default function CondizioniDiVenditaPage() {
  const { lang } = useI18n()
  const c = content[lang === "it" ? "it" : "fr"]
  const pt = penaltyTable[lang === "it" ? "it" : "fr"]

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{c.title}</h1>
          <p className="text-xs text-neutral-500 mb-8">{c.updated}</p>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.intro}</p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.part1Title}</h2>
          {c.articles.map((a) => (
            <div key={a.title}>
              <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{a.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{a.text}</p>
            </div>
          ))}

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.paymentTitle}</h3>
          <h4 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">{c.paymentSubTitle}</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.payment1}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.payment2}</p>

          <h4 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">{c.penaltyTitle}</h4>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm text-neutral-600 border-collapse">
              <thead>
                <tr className="bg-neutral-50">
                  {pt.headers.map((h) => (
                    <th key={h} className="text-left p-3 border border-neutral-200 font-semibold text-neutral-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pt.rows.map(([when, penalty], i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-neutral-50" : ""}>
                    <td className="p-3 border border-neutral-200">{when}</td>
                    <td className="p-3 border border-neutral-200">{penalty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.penaltyNote}</p>

          <h4 className="text-sm font-semibold text-neutral-700 mt-4 mb-2">{c.refundTitle}</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.refundText}</p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.part2Title}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.part2Intro}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.single1Title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.single1Text}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.single2Title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.single2Text}</p>

          <h3 className="text-base font-semibold text-neutral-700 mt-6 mb-2">{c.single3Title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.single3Text}</p>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.part3Title}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.part3Intro}</p>
          <ul className="text-sm text-neutral-600 mt-4 space-y-3 list-none pl-0">
            {c.standardItems.map((item) => (
              <li key={item.title} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <strong className="block text-neutral-700 mb-1">{item.title}</strong>
                {item.text}
              </li>
            ))}
          </ul>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.part4Title}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.part4Intro}</p>
          <ul className="text-sm text-neutral-600 mt-3 space-y-2 list-disc list-inside">
            {c.part4Items.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <hr className="my-8 border-neutral-200" />

          <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-3">{c.finalTitle}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{c.final1}</p>
          <p className="text-sm text-neutral-600 leading-relaxed mt-3">{c.final2}</p>

        </div>
      </main>
      <Footer />
    </>
  )
}
