// Manuvo - contenus des pages legales (multilingue).
// NOTE: modele a completer (identite du titulaire) et a faire relire par un juriste.
// Les [PLACEHOLDER] doivent etre remplaces par les vraies informations.
import type { Locale } from "./constants";

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; updated: string; sections: LegalSection[] };
export type LegalSlug = "privacy" | "termini" | "cookie" | "note";

export const LEGAL_UPDATED = "2026-09-09";

// Identite du titulaire. P.IVA a ajouter plus tard (rappel a faire).
const HOLDER = "Hatem Chebbi";
const EMAIL = "info@automa-ia.net";

export const LEGAL: Record<LegalSlug, Record<Locale, LegalDoc>> = {
  privacy: {
    it: {
      title: "Informativa sulla privacy",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Titolare del trattamento", p: [`Il titolare del trattamento dei dati e ${HOLDER}, contattabile all'indirizzo ${EMAIL}.`] },
        { h: "Dati raccolti", p: [
          "Artigiani registrati: nome, email, telefono, citta, paese, mestieri offerti e password (conservata in forma cifrata).",
          "Privati che pubblicano una richiesta: nome, telefono, email (facoltativa), citta, paese e descrizione del lavoro richiesto.",
        ] },
        { h: "Finalita e base giuridica", p: [
          "I dati sono trattati per fornire il servizio (mettere in contatto privati e artigiani), gestire gli account e i crediti, garantire la sicurezza della piattaforma e adempiere agli obblighi di legge.",
          "La base giuridica e l'esecuzione del contratto e, ove applicabile, il legittimo interesse e gli obblighi legali.",
        ] },
        { h: "Comunicazione dei dati", p: [
          "I dati di contatto del privato che pubblica una richiesta restano nascosti finche un artigiano non sblocca la richiesta usando i propri crediti. Al momento dello sblocco, tali dati vengono comunicati a quell'artigiano affinche possa ricontattare il privato.",
        ] },
        { h: "Fornitori e terze parti", p: [
          "Per erogare il servizio utilizziamo fornitori che trattano i dati per nostro conto: hosting dell'applicazione (Vercel), database (Neon) e invio email (Resend). Alcuni fornitori possono trattare dati al di fuori dell'Unione Europea, con adeguate garanzie.",
        ] },
        { h: "Conservazione", p: ["I dati sono conservati per il tempo necessario a fornire il servizio e ad adempiere agli obblighi di legge, dopodiche vengono cancellati o resi anonimi."] },
        { h: "Diritti dell'interessato", p: [
          "Hai diritto di accesso, rettifica, cancellazione, limitazione, opposizione e portabilita dei tuoi dati. Puoi esercitarli scrivendo a " + EMAIL + ".",
          "Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.",
        ] },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Data controller", p: [`The data controller is ${HOLDER}, reachable at ${EMAIL}.`] },
        { h: "Data collected", p: [
          "Registered artisans: name, email, phone, city, country, trades offered and password (stored encrypted).",
          "Individuals posting a request: name, phone, email (optional), city, country and a description of the job.",
        ] },
        { h: "Purposes and legal basis", p: [
          "Data is processed to provide the service (connecting individuals and artisans), manage accounts and credits, ensure platform security and comply with legal obligations.",
          "The legal basis is performance of the contract and, where applicable, legitimate interest and legal obligations.",
        ] },
        { h: "Disclosure of data", p: [
          "The contact details of an individual posting a request stay hidden until an artisan unlocks the request using their credits. Upon unlocking, those details are shared with that artisan so they can get back to the individual.",
        ] },
        { h: "Providers and third parties", p: [
          "We use providers that process data on our behalf: application hosting (Vercel), database (Neon) and email delivery (Resend). Some providers may process data outside the European Union, under appropriate safeguards.",
        ] },
        { h: "Retention", p: ["Data is kept for as long as needed to provide the service and meet legal obligations, then deleted or anonymised."] },
        { h: "Your rights", p: [
          "You have the right to access, rectify, erase, restrict, object to and port your data. Exercise them by writing to " + EMAIL + ".",
          "You also have the right to lodge a complaint with the competent data protection authority.",
        ] },
      ],
    },
    fr: {
      title: "Politique de confidentialité",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Responsable du traitement", p: [`Le responsable du traitement des données est ${HOLDER}, joignable à ${EMAIL}.`] },
        { h: "Données collectées", p: [
          "Artisans inscrits : nom, email, téléphone, ville, pays, métiers proposés et mot de passe (conservé chiffré).",
          "Particuliers publiant une demande : nom, téléphone, email (facultatif), ville, pays et description du travail demandé.",
        ] },
        { h: "Finalités et base légale", p: [
          "Les données sont traitées pour fournir le service (mettre en relation particuliers et artisans), gérer les comptes et les crédits, assurer la sécurité de la plateforme et respecter les obligations légales.",
          "La base légale est l'exécution du contrat et, le cas échéant, l'intérêt légitime et les obligations légales.",
        ] },
        { h: "Communication des données", p: [
          "Les coordonnées d'un particulier qui publie une demande restent masquées jusqu'à ce qu'un artisan débloque la demande avec ses crédits. Au moment du déblocage, ces coordonnées sont communiquées à cet artisan afin qu'il puisse recontacter le particulier.",
        ] },
        { h: "Prestataires et tiers", p: [
          "Nous utilisons des prestataires qui traitent les données pour notre compte : hébergement de l'application (Vercel), base de données (Neon) et envoi d'emails (Resend). Certains prestataires peuvent traiter des données hors Union européenne, avec des garanties appropriées.",
        ] },
        { h: "Conservation", p: ["Les données sont conservées le temps nécessaire pour fournir le service et respecter les obligations légales, puis supprimées ou anonymisées."] },
        { h: "Vos droits", p: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Exercez-les en écrivant à " + EMAIL + ".",
          "Vous avez également le droit d'introduire une réclamation auprès de l'autorité de protection des données compétente.",
        ] },
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Verantwortlicher", p: [`Verantwortlich für die Datenverarbeitung ist ${HOLDER}, erreichbar unter ${EMAIL}.`] },
        { h: "Erhobene Daten", p: [
          "Registrierte Handwerker: Name, E-Mail, Telefon, Stadt, Land, angebotene Gewerke und Passwort (verschlüsselt gespeichert).",
          "Privatpersonen, die eine Anfrage stellen: Name, Telefon, E-Mail (optional), Stadt, Land und eine Beschreibung der Arbeit.",
        ] },
        { h: "Zwecke und Rechtsgrundlage", p: [
          "Die Daten werden verarbeitet, um den Dienst bereitzustellen (Privatpersonen und Handwerker verbinden), Konten und Credits zu verwalten, die Sicherheit der Plattform zu gewährleisten und gesetzliche Pflichten zu erfüllen.",
          "Rechtsgrundlage ist die Vertragserfüllung und, soweit anwendbar, das berechtigte Interesse und gesetzliche Pflichten.",
        ] },
        { h: "Weitergabe der Daten", p: [
          "Die Kontaktdaten einer Privatperson, die eine Anfrage stellt, bleiben verborgen, bis ein Handwerker die Anfrage mit seinen Credits freischaltet. Beim Freischalten werden diese Daten an diesen Handwerker weitergegeben, damit er die Privatperson kontaktieren kann.",
        ] },
        { h: "Dienstleister und Dritte", p: [
          "Wir nutzen Dienstleister, die Daten in unserem Auftrag verarbeiten: Anwendungs-Hosting (Vercel), Datenbank (Neon) und E-Mail-Versand (Resend). Einige Dienstleister können Daten außerhalb der Europäischen Union verarbeiten, mit angemessenen Garantien.",
        ] },
        { h: "Speicherdauer", p: ["Die Daten werden so lange gespeichert, wie es zur Bereitstellung des Dienstes und zur Erfüllung gesetzlicher Pflichten erforderlich ist, danach gelöscht oder anonymisiert."] },
        { h: "Ihre Rechte", p: [
          "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit. Wenden Sie sich dazu an " + EMAIL + ".",
          "Sie haben zudem das Recht, sich bei der zuständigen Datenschutzbehörde zu beschweren.",
        ] },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "المسؤول عن المعالجة", p: [`المسؤول عن معالجة البيانات هو ${HOLDER}، ويمكن التواصل معه عبر ${EMAIL}.`] },
        { h: "البيانات المجمّعة", p: [
          "الحرفيون المسجلون: الاسم، البريد الإلكتروني، الهاتف، المدينة، البلد، الحرف المقدّمة وكلمة المرور (محفوظة مشفّرة).",
          "الأفراد الذين ينشرون طلباً: الاسم، الهاتف، البريد الإلكتروني (اختياري)، المدينة، البلد ووصف العمل المطلوب.",
        ] },
        { h: "الأغراض والأساس القانوني", p: [
          "تُعالَج البيانات لتقديم الخدمة (ربط الأفراد بالحرفيين)، وإدارة الحسابات والأرصدة، وضمان أمن المنصة، والامتثال للالتزامات القانونية.",
          "الأساس القانوني هو تنفيذ العقد، وعند الاقتضاء المصلحة المشروعة والالتزامات القانونية.",
        ] },
        { h: "الإفصاح عن البيانات", p: [
          "تبقى بيانات الاتصال الخاصة بالفرد الذي ينشر طلباً مخفية حتى يفتح أحد الحرفيين الطلب باستخدام أرصدته. عند الفتح، تُشارَك هذه البيانات مع ذلك الحرفي ليتمكن من التواصل مع الفرد.",
        ] },
        { h: "المزوّدون والأطراف الثالثة", p: [
          "نستعين بمزوّدين يعالجون البيانات نيابة عنّا: استضافة التطبيق (Vercel)، قاعدة البيانات (Neon)، وإرسال البريد (Resend). قد يعالج بعض المزوّدين البيانات خارج الاتحاد الأوروبي مع ضمانات مناسبة.",
        ] },
        { h: "مدة الحفظ", p: ["تُحفَظ البيانات للمدة اللازمة لتقديم الخدمة والامتثال للالتزامات القانونية، ثم تُحذَف أو يُزال ما يعرّف عنها."] },
        { h: "حقوقك", p: [
          "لك الحق في الوصول إلى بياناتك وتصحيحها وحذفها وتقييدها والاعتراض عليها ونقلها. مارِس هذه الحقوق بالكتابة إلى " + EMAIL + ".",
          "كما يحق لك تقديم شكوى إلى الهيئة المختصة بحماية البيانات.",
        ] },
      ],
    },
  },

  termini: {
    it: {
      title: "Termini e condizioni d'uso",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Oggetto del servizio", p: ["Manuvo e una piattaforma che mette in contatto privati che cercano un lavoro in casa e artigiani che offrono i loro servizi. Manuvo non e parte del contratto tra privato e artigiano."] },
        { h: "Account artigiano", p: ["Per usare i servizi riservati agli artigiani e necessario registrarsi fornendo informazioni veritiere e aggiornate. L'artigiano e responsabile della riservatezza delle proprie credenziali."] },
        { h: "Crediti e sblocco dei contatti", p: [
          "Gli artigiani acquistano crediti (1 credito = 2 €) e li utilizzano per sbloccare i contatti dei privati. Ogni richiesta ha un costo in crediti stabilito dalla piattaforma (da 3 a 5 crediti) e puo essere sbloccata da un numero massimo di artigiani.",
          "I crediti utilizzati per uno sblocco gia effettuato non sono rimborsabili, salvo malfunzionamento imputabile alla piattaforma.",
        ] },
        { h: "Nessuna garanzia sui professionisti", p: ["Manuvo non seleziona ne garantisce la qualita, le qualifiche o l'affidabilita degli artigiani, ne l'esito dei lavori. La scelta e la relazione contrattuale avvengono direttamente tra privato e artigiano."] },
        { h: "Obblighi degli utenti", p: ["Gli utenti si impegnano a usare la piattaforma in modo lecito, a non pubblicare contenuti falsi o ingannevoli e a non usare i contatti per finalita diverse da quelle del servizio (es. spam)."] },
        { h: "Limitazione di responsabilita", p: ["Nei limiti consentiti dalla legge, Manuvo non e responsabile per danni derivanti dai rapporti tra privati e artigiani o dall'uso della piattaforma."] },
        { h: "Modifiche e legge applicabile", p: ["Manuvo puo modificare i presenti termini; le modifiche saranno pubblicate su questa pagina. Il rapporto e regolato dalla legge italiana; per le controversie e competente il foro del luogo di residenza del titolare, ove applicabile."] },
      ],
    },
    en: {
      title: "Terms and Conditions",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Purpose of the service", p: ["Manuvo is a platform that connects individuals looking for home work with artisans offering their services. Manuvo is not a party to the contract between the individual and the artisan."] },
        { h: "Artisan account", p: ["Using the artisan-only features requires registration with truthful, up-to-date information. The artisan is responsible for keeping their credentials confidential."] },
        { h: "Credits and unlocking contacts", p: [
          "Artisans buy credits (1 credit = €2) and use them to unlock individuals' contacts. Each request has a credit cost set by the platform (3 to 5 credits) and can be unlocked by a limited number of artisans.",
          "Credits used for an unlock already performed are non-refundable, except in case of a malfunction attributable to the platform.",
        ] },
        { h: "No warranty on professionals", p: ["Manuvo does not select or guarantee the quality, qualifications or reliability of artisans, nor the outcome of the work. The choice and the contractual relationship take place directly between the individual and the artisan."] },
        { h: "User obligations", p: ["Users agree to use the platform lawfully, not to post false or misleading content and not to use contacts for purposes other than the service (e.g. spam)."] },
        { h: "Limitation of liability", p: ["To the extent permitted by law, Manuvo is not liable for damages arising from dealings between individuals and artisans or from the use of the platform."] },
        { h: "Changes and governing law", p: ["Manuvo may amend these terms; changes will be published on this page. The relationship is governed by Italian law; where applicable, disputes fall under the court of the holder's place of residence."] },
      ],
    },
    fr: {
      title: "Conditions générales d'utilisation",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Objet du service", p: ["Manuvo est une plateforme qui met en relation des particuliers cherchant un travail à domicile et des artisans proposant leurs services. Manuvo n'est pas partie au contrat entre le particulier et l'artisan."] },
        { h: "Compte artisan", p: ["L'utilisation des fonctionnalités réservées aux artisans nécessite une inscription avec des informations exactes et à jour. L'artisan est responsable de la confidentialité de ses identifiants."] },
        { h: "Crédits et déblocage des contacts", p: [
          "Les artisans achètent des crédits (1 crédit = 2 €) et les utilisent pour débloquer les contacts des particuliers. Chaque demande a un coût en crédits fixé par la plateforme (de 3 à 5 crédits) et peut être débloquée par un nombre limité d'artisans.",
          "Les crédits utilisés pour un déblocage déjà effectué ne sont pas remboursables, sauf dysfonctionnement imputable à la plateforme.",
        ] },
        { h: "Aucune garantie sur les professionnels", p: ["Manuvo ne sélectionne ni ne garantit la qualité, les qualifications ou la fiabilité des artisans, ni le résultat des travaux. Le choix et la relation contractuelle se font directement entre le particulier et l'artisan."] },
        { h: "Obligations des utilisateurs", p: ["Les utilisateurs s'engagent à utiliser la plateforme de manière licite, à ne pas publier de contenus faux ou trompeurs et à ne pas utiliser les contacts à des fins autres que le service (ex. spam)."] },
        { h: "Limitation de responsabilité", p: ["Dans les limites permises par la loi, Manuvo n'est pas responsable des dommages découlant des relations entre particuliers et artisans ou de l'utilisation de la plateforme."] },
        { h: "Modifications et loi applicable", p: ["Manuvo peut modifier les présentes conditions ; les modifications seront publiées sur cette page. La relation est régie par le droit italien ; le cas échéant, les litiges relèvent du tribunal du lieu de résidence du titulaire."] },
      ],
    },
    de: {
      title: "Allgemeine Geschäftsbedingungen",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Gegenstand des Dienstes", p: ["Manuvo ist eine Plattform, die Privatpersonen auf der Suche nach Arbeiten im Haushalt mit Handwerkern verbindet, die ihre Dienste anbieten. Manuvo ist nicht Vertragspartei zwischen Privatperson und Handwerker."] },
        { h: "Handwerkerkonto", p: ["Die Nutzung der Handwerker-Funktionen erfordert eine Registrierung mit wahrheitsgemäßen, aktuellen Angaben. Der Handwerker ist für die Vertraulichkeit seiner Zugangsdaten verantwortlich."] },
        { h: "Credits und Freischaltung von Kontakten", p: [
          "Handwerker kaufen Credits (1 Credit = 2 €) und nutzen sie, um Kontakte von Privatpersonen freizuschalten. Jede Anfrage hat einen von der Plattform festgelegten Credit-Preis (3 bis 5 Credits) und kann von einer begrenzten Zahl von Handwerkern freigeschaltet werden.",
          "Bereits für eine Freischaltung verwendete Credits sind nicht erstattungsfähig, außer bei einer der Plattform zuzurechnenden Störung.",
        ] },
        { h: "Keine Gewähr für Fachleute", p: ["Manuvo wählt Handwerker nicht aus und übernimmt keine Gewähr für deren Qualität, Qualifikation oder Zuverlässigkeit noch für das Arbeitsergebnis. Auswahl und Vertragsverhältnis erfolgen direkt zwischen Privatperson und Handwerker."] },
        { h: "Pflichten der Nutzer", p: ["Die Nutzer verpflichten sich, die Plattform rechtmäßig zu nutzen, keine falschen oder irreführenden Inhalte zu veröffentlichen und Kontakte nicht für andere Zwecke als den Dienst zu verwenden (z. B. Spam)."] },
        { h: "Haftungsbeschränkung", p: ["Soweit gesetzlich zulässig, haftet Manuvo nicht für Schäden aus den Beziehungen zwischen Privatpersonen und Handwerkern oder aus der Nutzung der Plattform."] },
        { h: "Änderungen und anwendbares Recht", p: ["Manuvo kann diese Bedingungen ändern; Änderungen werden auf dieser Seite veröffentlicht. Es gilt italienisches Recht; soweit anwendbar, ist das Gericht am Wohnsitz des Inhabers zuständig."] },
      ],
    },
    ar: {
      title: "الشروط والأحكام",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "موضوع الخدمة", p: ["Manuvo منصّة تربط الأفراد الباحثين عن أعمال منزلية بالحرفيين الذين يقدّمون خدماتهم. Manuvo ليست طرفاً في العقد بين الفرد والحرفي."] },
        { h: "حساب الحرفي", p: ["يتطلّب استخدام الميزات المخصّصة للحرفيين التسجيل ببيانات صحيحة ومحدّثة. الحرفي مسؤول عن سرية بيانات دخوله."] },
        { h: "الأرصدة وفتح جهات الاتصال", p: [
          "يشتري الحرفيون أرصدة (رصيد واحد = 2 يورو) ويستخدمونها لفتح جهات اتصال الأفراد. لكل طلب تكلفة بالأرصدة تحدّدها المنصة (من 3 إلى 5)، ويمكن فتحه من قِبل عدد محدود من الحرفيين.",
          "الأرصدة المستخدمة لفتح تمّ بالفعل غير قابلة للاسترداد، إلا في حال خلل يُعزى إلى المنصة.",
        ] },
        { h: "لا ضمان على المحترفين", p: ["لا تختار Manuvo الحرفيين ولا تضمن جودتهم أو مؤهلاتهم أو موثوقيتهم، ولا نتيجة الأعمال. الاختيار والعلاقة التعاقدية يتمّان مباشرة بين الفرد والحرفي."] },
        { h: "التزامات المستخدمين", p: ["يلتزم المستخدمون باستخدام المنصة بشكل قانوني، وعدم نشر محتوى كاذب أو مضلّل، وعدم استخدام جهات الاتصال لأغراض غير الخدمة (مثل الرسائل المزعجة)."] },
        { h: "تحديد المسؤولية", p: ["في الحدود التي يسمح بها القانون، لا تتحمّل Manuvo المسؤولية عن الأضرار الناشئة عن العلاقات بين الأفراد والحرفيين أو عن استخدام المنصة."] },
        { h: "التعديلات والقانون المطبّق", p: ["يجوز لـ Manuvo تعديل هذه الشروط؛ وتُنشَر التعديلات على هذه الصفحة. تخضع العلاقة للقانون الإيطالي؛ وعند الاقتضاء تختص محكمة محل إقامة صاحب المنصة."] },
      ],
    },
  },

  cookie: {
    it: {
      title: "Cookie policy",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Cosa sono i cookie", p: ["I cookie sono piccoli file salvati sul tuo dispositivo dal browser per far funzionare correttamente il sito."] },
        { h: "Cookie utilizzati", p: [
          "Manuvo utilizza esclusivamente cookie tecnici necessari: un cookie di sessione per l'autenticazione degli artigiani e un cookie per ricordare la lingua scelta.",
          "Non utilizziamo cookie di profilazione, pubblicitari o di analisi di terze parti.",
        ] },
        { h: "Consenso", p: ["Poiche vengono usati solo cookie tecnici necessari, non e richiesto il tuo consenso preventivo."] },
        { h: "Gestione dei cookie", p: ["Puoi eliminare o bloccare i cookie dalle impostazioni del tuo browser; alcune funzioni del sito potrebbero pero non funzionare correttamente."] },
      ],
    },
    en: {
      title: "Cookie Policy",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "What cookies are", p: ["Cookies are small files saved on your device by the browser to make the site work correctly."] },
        { h: "Cookies we use", p: [
          "Manuvo uses only strictly necessary technical cookies: a session cookie for artisan authentication and a cookie to remember the chosen language.",
          "We do not use profiling, advertising or third-party analytics cookies.",
        ] },
        { h: "Consent", p: ["Because only strictly necessary technical cookies are used, your prior consent is not required."] },
        { h: "Managing cookies", p: ["You can delete or block cookies in your browser settings; however, some site features may not work correctly."] },
      ],
    },
    fr: {
      title: "Politique de cookies",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Ce que sont les cookies", p: ["Les cookies sont de petits fichiers enregistrés sur votre appareil par le navigateur pour faire fonctionner correctement le site."] },
        { h: "Cookies utilisés", p: [
          "Manuvo n'utilise que des cookies techniques strictement nécessaires : un cookie de session pour l'authentification des artisans et un cookie pour mémoriser la langue choisie.",
          "Nous n'utilisons pas de cookies de profilage, publicitaires ou d'analyse tiers.",
        ] },
        { h: "Consentement", p: ["Comme seuls des cookies techniques strictement nécessaires sont utilisés, votre consentement préalable n'est pas requis."] },
        { h: "Gestion des cookies", p: ["Vous pouvez supprimer ou bloquer les cookies dans les réglages de votre navigateur ; certaines fonctions du site pourraient toutefois ne plus fonctionner correctement."] },
      ],
    },
    de: {
      title: "Cookie-Richtlinie",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Was Cookies sind", p: ["Cookies sind kleine Dateien, die der Browser auf Ihrem Gerät speichert, damit die Website korrekt funktioniert."] },
        { h: "Verwendete Cookies", p: [
          "Manuvo verwendet ausschließlich unbedingt erforderliche technische Cookies: ein Sitzungs-Cookie für die Handwerker-Anmeldung und ein Cookie, um die gewählte Sprache zu speichern.",
          "Wir verwenden keine Profiling-, Werbe- oder Drittanbieter-Analyse-Cookies.",
        ] },
        { h: "Einwilligung", p: ["Da nur unbedingt erforderliche technische Cookies verwendet werden, ist Ihre vorherige Einwilligung nicht erforderlich."] },
        { h: "Cookies verwalten", p: ["Sie können Cookies in den Einstellungen Ihres Browsers löschen oder blockieren; einige Funktionen der Website könnten dann jedoch nicht korrekt funktionieren."] },
      ],
    },
    ar: {
      title: "سياسة ملفات تعريف الارتباط",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "ما هي ملفات تعريف الارتباط", p: ["ملفات تعريف الارتباط ملفات صغيرة يحفظها المتصفح على جهازك لتشغيل الموقع بشكل صحيح."] },
        { h: "الملفات المستخدمة", p: [
          "تستخدم Manuvo فقط ملفات تقنية ضرورية: ملف جلسة لتسجيل دخول الحرفيين، وملف لتذكّر اللغة المختارة.",
          "لا نستخدم ملفات تتبّع أو إعلانات أو تحليلات من أطراف ثالثة.",
        ] },
        { h: "الموافقة", p: ["بما أنه لا تُستخدم سوى ملفات تقنية ضرورية، فإن موافقتك المسبقة ليست مطلوبة."] },
        { h: "إدارة الملفات", p: ["يمكنك حذف أو حظر ملفات تعريف الارتباط من إعدادات متصفحك؛ لكن بعض وظائف الموقع قد لا تعمل بشكل صحيح."] },
      ],
    },
  },

  note: {
    it: {
      title: "Note legali",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Titolare del sito", p: [`Il sito Manuvo e gestito da ${HOLDER}, contattabile all'indirizzo ${EMAIL}.`] },
        { h: "Hosting", p: ["Il sito e ospitato su infrastruttura Vercel; il database e fornito da Neon."] },
        { h: "Proprieta intellettuale", p: ["Il nome Manuvo, il logo e i contenuti del sito sono protetti. Ne e vietata la riproduzione senza autorizzazione."] },
        { h: "Contatti", p: [`Per qualsiasi richiesta relativa al sito: ${EMAIL}.`] },
      ],
    },
    en: {
      title: "Legal Notice",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Site owner", p: [`The Manuvo site is operated by ${HOLDER}, reachable at ${EMAIL}.`] },
        { h: "Hosting", p: ["The site is hosted on Vercel infrastructure; the database is provided by Neon."] },
        { h: "Intellectual property", p: ["The Manuvo name, logo and site content are protected. Reproduction without authorisation is prohibited."] },
        { h: "Contact", p: [`For any request regarding the site: ${EMAIL}.`] },
      ],
    },
    fr: {
      title: "Mentions légales",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Éditeur du site", p: [`Le site Manuvo est géré par ${HOLDER}, joignable à ${EMAIL}.`] },
        { h: "Hébergement", p: ["Le site est hébergé sur l'infrastructure Vercel ; la base de données est fournie par Neon."] },
        { h: "Propriété intellectuelle", p: ["Le nom Manuvo, le logo et les contenus du site sont protégés. Leur reproduction sans autorisation est interdite."] },
        { h: "Contact", p: [`Pour toute demande concernant le site : ${EMAIL}.`] },
      ],
    },
    de: {
      title: "Impressum",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "Betreiber der Website", p: [`Die Website Manuvo wird betrieben von ${HOLDER}, erreichbar unter ${EMAIL}.`] },
        { h: "Hosting", p: ["Die Website wird auf der Vercel-Infrastruktur gehostet; die Datenbank stellt Neon bereit."] },
        { h: "Geistiges Eigentum", p: ["Der Name Manuvo, das Logo und die Inhalte der Website sind geschützt. Eine Vervielfältigung ohne Genehmigung ist untersagt."] },
        { h: "Kontakt", p: [`Für Anfragen zur Website: ${EMAIL}.`] },
      ],
    },
    ar: {
      title: "إشعار قانوني",
      updated: LEGAL_UPDATED,
      sections: [
        { h: "مالك الموقع", p: [`يُدار موقع Manuvo من قِبل ${HOLDER}، ويمكن التواصل عبر ${EMAIL}.`] },
        { h: "الاستضافة", p: ["يُستضاف الموقع على بنية Vercel؛ وقاعدة البيانات مقدّمة من Neon."] },
        { h: "الملكية الفكرية", p: ["اسم Manuvo والشعار ومحتويات الموقع محمية. يُمنع نسخها دون إذن."] },
        { h: "التواصل", p: [`لأي طلب يخص الموقع: ${EMAIL}.`] },
      ],
    },
  },
};
