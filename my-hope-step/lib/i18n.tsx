"use client"

import * as React from "react"

export type Lang = "fr" | "it" | "ar"

export const LANGS: { code: Lang; label: string; short: string; dir: "ltr" | "rtl" }[] = [
  { code: "fr", label: "Français", short: "FR", dir: "ltr" },
  { code: "it", label: "Italiano", short: "IT", dir: "ltr" },
  { code: "ar", label: "العربية", short: "ع", dir: "rtl" },
]

export const dictionaries = {
  fr: {
    nav: {
      destinations: "Destinations",
      offers: "Nos offres",
      testimonials: "Témoignages",
      faq: "FAQ",
      book: "Réserver maintenant",
    },
    hero: {
      badge: "+2 000 voyageurs satisfaits",
      title1: "Votre prochaine aventure",
      title2: "commence ici",
      subtitle:
        "My Hope Step conçoit des voyages sur-mesure pour vous offrir des expériences inoubliables. Destinations exclusives, prix transparents, accompagnement 24h/24.",
      cta1: "Voir nos offres",
      cta2: "Découvrir",
    },
    features: {
      eyebrow: "Pourquoi nous choisir",
      title1: "Le voyage de vos rêves,",
      title2: "sans les complications",
      subtitle: "My Hope Step s'occupe de tout. Vous n'avez plus qu'à profiter.",
      cards: [
        {
          title: "50+ destinations exclusives",
          description:
            "Des plages des Maldives aux temples du Japon, nous sélectionnons pour vous les destinations les plus prisées du monde. Chaque voyage est pensé pour être unique.",
          statLabel: "destinations",
        },
        {
          title: "Accompagnement 24h/24",
          description:
            "Un conseiller dédié vous accompagne avant, pendant et après votre voyage. Disponible à toute heure, nous gérons chaque imprévu pour vous.",
          statLabel: "disponible",
        },
        {
          title: "Prix transparents, zéro surprise",
          description:
            "Pas de frais cachés. Vous voyez le prix total dès le départ. Paiement sécurisé, remboursement garanti en cas d'annulation selon nos conditions.",
          statLabel: "transparent",
        },
      ],
    },
    social: {
      eyebrow: "Témoignages",
      title1: "Ils ont voyagé avec nous.",
      title2: "Ils en parlent.",
      statLabels: ["voyageurs satisfaits", "note moyenne", "recommandent", "d'expérience"],
      expYears: "25 ans",
      testimonials: [
        {
          location: "Liège, Belgique",
          destination: "Maldives",
          text: "Un voyage absolument parfait. My Hope Step a géré chaque détail — de l'hôtel au transfert. Je n'avais qu'à profiter. Je recommande les yeux fermés.",
        },
        {
          location: "Bruxelles, Belgique",
          destination: "Dubai",
          text: "Mon voyage au Japon était un rêve de longue date. L'équipe a créé un itinéraire sur-mesure incroyable. Prix clair, aucune mauvaise surprise. 10/10.",
        },
        {
          location: "Marseille, France",
          destination: "Bali",
          text: "Deuxième voyage avec My Hope Step et toujours la même qualité. Le conseiller était joignable à toute heure. On repart l'année prochaine !",
        },
      ],
    },
    pricing: {
      eyebrow: "Nos offres",
      title1: "Des forfaits clairs,",
      title2: "pour chaque budget",
      subtitle: "Prix par personne, tout inclus. Aucun frais caché. Choisissez votre niveau d'expérience.",
      period: "/ personne",
      popularBadge: "Le plus populaire",
      luxeBadge: "Luxe",
      footerNote: "Prix indicatifs pour des départs en basse saison. Contactez-nous pour un devis personnalisé.",
      plans: [
        {
          name: "Essentiel",
          description: "Idéal pour un premier voyage organisé, sans prise de tête.",
          cta: "Choisir Essentiel",
          features: [
            "Vol aller-retour inclus",
            "Hôtel 3 étoiles sélectionné",
            "Transferts aéroport",
            "Assistance email 9h-18h",
            "Guide de destination PDF",
          ],
          missing: ["Conseiller dédié", "Activités incluses"],
        },
        {
          name: "Découverte",
          description: "Notre offre la plus populaire. Expérience complète, zéro stress.",
          cta: "Choisir Découverte",
          features: [
            "Vol aller-retour inclus",
            "Hôtel 4 étoiles sélectionné",
            "Transferts aéroport",
            "Conseiller dédié 7j/7",
            "2 activités incluses",
            "Assurance voyage complète",
            "Itinéraire personnalisé",
          ],
          missing: [],
        },
        {
          name: "Prestige",
          description: "Le voyage d'exception. Sur-mesure de A à Z, service 5 étoiles.",
          cta: "Choisir Prestige",
          features: [
            "Vol business class inclus",
            "Hôtel 5 étoiles ou villa privée",
            "Transferts limousine",
            "Conseiller dédié 24h/24",
            "Activités illimitées",
            "Assurance tous risques",
            "Itinéraire 100% sur-mesure",
            "Conciergerie privée sur place",
          ],
          missing: [],
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions fréquentes",
      subtitle: "Tout ce que vous devez savoir avant de partir.",
      stillQuestions: "Vous n'avez pas trouvé votre réponse ?",
      contactUs: "Contactez-nous",
      items: [
        {
          question: "Comment fonctionne la réservation ?",
          answer:
            "Choisissez votre forfait, remplissez le formulaire de réservation en ligne, et un conseiller vous contacte sous 24h pour finaliser les détails. Le paiement s'effectue en ligne de façon sécurisée, avec possibilité de payer en 3 fois sans frais.",
        },
        {
          question: "Puis-je personnaliser mon voyage ?",
          answer:
            "Absolument. Tous nos forfaits sont adaptables : dates, hôtel, activités, extensions de séjour. Contactez notre équipe et nous concevons un itinéraire sur-mesure selon vos envies et votre budget.",
        },
        {
          question: "Quelle est votre politique d'annulation ?",
          answer:
            "Annulation gratuite jusqu'à 30 jours avant le départ. Entre 30 et 15 jours : 50% remboursé. Moins de 15 jours : non remboursable, mais nous proposons un report de voyage. L'assurance annulation incluse dans nos forfaits Découverte et Prestige couvre les imprévus.",
        },
        {
          question: "Les vols sont-ils inclus dans tous les forfaits ?",
          answer:
            "Oui, tous nos forfaits incluent les vols aller-retour depuis Paris. Départ depuis d'autres villes françaises possible avec un supplément. Le forfait Prestige inclut des vols en classe Business.",
        },
        {
          question: "Est-ce que vous proposez des voyages en groupe ?",
          answer:
            "Oui, nous organisons des voyages de groupe à partir de 8 personnes (famille, amis, team building). Des tarifs préférentiels s'appliquent et nous pouvons gérer l'ensemble de la logistique, y compris les repas de groupe et les animations.",
        },
        {
          question: "Comment me joindre à votre équipe en cas d'urgence pendant le voyage ?",
          answer:
            "Tous nos clients reçoivent un numéro d'urgence dédié, joignable 24h/24 pendant la durée du séjour. Un conseiller local est également disponible dans la plupart de nos destinations.",
        },
      ],
    },
    footer: {
      ctaTitle: "Prêt à vivre l'aventure de votre vie ?",
      ctaSubtitle: "Parlez à un conseiller dès aujourd'hui. Consultation gratuite, sans engagement.",
      ctaButton: "Voir nos offres",
      brandDesc:
        "Agence de voyage en ligne spécialisée dans les séjours sur-mesure. Nous faisons du rêve une réalité depuis 2019.",
      location: "Italie, Bologne",
      columns: [
        { title: "Destinations", items: ["Maldives", "Japon", "Bali", "Santorin", "Maroc", "Islande"] },
        { title: "Offres", items: ["Forfait Essentiel", "Forfait Découverte", "Forfait Prestige", "Voyages en groupe", "Sur-mesure"] },
        { title: "Agence", items: ["À propos", "Notre équipe", "Témoignages", "Blog voyage", "FAQ"] },
        { title: "Légal", items: ["Mentions légales", "CGV", "Politique de confidentialité", "Cookies"] },
      ],
      rights: "Tous droits réservés.",
      madeWith: "Fait avec ❤️ pour les voyageurs du monde entier",
    },
  },

  it: {
    nav: {
      destinations: "Destinazioni",
      offers: "Le nostre offerte",
      testimonials: "Testimonianze",
      faq: "FAQ",
      book: "Prenota ora",
    },
    hero: {
      badge: "+2.000 viaggiatori soddisfatti",
      title1: "La tua prossima avventura",
      title2: "inizia qui",
      subtitle:
        "My Hope Step crea viaggi su misura per offrirti esperienze indimenticabili. Destinazioni esclusive, prezzi trasparenti, assistenza 24 ore su 24.",
      cta1: "Scopri le offerte",
      cta2: "Scopri",
    },
    features: {
      eyebrow: "Perché sceglierci",
      title1: "Il viaggio dei tuoi sogni,",
      title2: "senza complicazioni",
      subtitle: "My Hope Step pensa a tutto. A te non resta che goderti il viaggio.",
      cards: [
        {
          title: "50+ destinazioni esclusive",
          description:
            "Dalle spiagge delle Maldive ai templi del Giappone, selezioniamo per te le destinazioni più ambite al mondo. Ogni viaggio è pensato per essere unico.",
          statLabel: "destinazioni",
        },
        {
          title: "Assistenza 24 ore su 24",
          description:
            "Un consulente dedicato ti accompagna prima, durante e dopo il viaggio. Disponibili a ogni ora, gestiamo ogni imprevisto per te.",
          statLabel: "disponibile",
        },
        {
          title: "Prezzi trasparenti, zero sorprese",
          description:
            "Nessun costo nascosto. Vedi il prezzo totale fin dall'inizio. Pagamento sicuro e rimborso garantito in caso di annullamento secondo le nostre condizioni.",
          statLabel: "trasparente",
        },
      ],
    },
    social: {
      eyebrow: "Testimonianze",
      title1: "Hanno viaggiato con noi.",
      title2: "Ne parlano.",
      statLabels: ["viaggiatori soddisfatti", "voto medio", "consigliano", "di esperienza"],
      expYears: "25 anni",
      testimonials: [
        {
          location: "Liegi, Belgio",
          destination: "Maldive",
          text: "Un viaggio assolutamente perfetto. My Hope Step ha curato ogni dettaglio, dall'hotel al transfer. Io dovevo solo godermelo. Lo consiglio a occhi chiusi.",
        },
        {
          location: "Bruxelles, Belgio",
          destination: "Dubai",
          text: "Il mio viaggio in Giappone era un sogno che avevo da tempo. Il team ha creato un itinerario su misura incredibile. Prezzo chiaro, nessuna brutta sorpresa. 10/10.",
        },
        {
          location: "Marsiglia, Francia",
          destination: "Bali",
          text: "Secondo viaggio con My Hope Step e sempre la stessa qualità. Il consulente era raggiungibile a ogni ora. Torneremo l'anno prossimo!",
        },
      ],
    },
    pricing: {
      eyebrow: "Le nostre offerte",
      title1: "Pacchetti chiari,",
      title2: "per ogni budget",
      subtitle: "Prezzo a persona, tutto incluso. Nessun costo nascosto. Scegli il tuo livello di esperienza.",
      period: "/ persona",
      popularBadge: "Il più popolare",
      luxeBadge: "Lusso",
      footerNote: "Prezzi indicativi per partenze in bassa stagione. Contattaci per un preventivo personalizzato.",
      plans: [
        {
          name: "Essential",
          description: "Ideale per un primo viaggio organizzato, senza pensieri.",
          cta: "Scegli Essential",
          features: [
            "Volo andata e ritorno incluso",
            "Hotel 3 stelle selezionato",
            "Transfer aeroporto",
            "Assistenza email 9-18",
            "Guida della destinazione PDF",
          ],
          missing: ["Consulente dedicato", "Attività incluse"],
        },
        {
          name: "Scoperta",
          description: "La nostra offerta più popolare. Esperienza completa, zero stress.",
          cta: "Scegli Scoperta",
          features: [
            "Volo andata e ritorno incluso",
            "Hotel 4 stelle selezionato",
            "Transfer aeroporto",
            "Consulente dedicato 7 giorni su 7",
            "2 attività incluse",
            "Assicurazione di viaggio completa",
            "Itinerario personalizzato",
          ],
          missing: [],
        },
        {
          name: "Prestige",
          description: "Il viaggio d'eccezione. Su misura dalla A alla Z, servizio 5 stelle.",
          cta: "Scegli Prestige",
          features: [
            "Volo business class incluso",
            "Hotel 5 stelle o villa privata",
            "Transfer in limousine",
            "Consulente dedicato 24 ore su 24",
            "Attività illimitate",
            "Assicurazione all risk",
            "Itinerario 100% su misura",
            "Concierge privato sul posto",
          ],
          missing: [],
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Domande frequenti",
      subtitle: "Tutto ciò che devi sapere prima di partire.",
      stillQuestions: "Non hai trovato la risposta?",
      contactUs: "Contattaci",
      items: [
        {
          question: "Come funziona la prenotazione?",
          answer:
            "Scegli il tuo pacchetto, compila il modulo di prenotazione online e un consulente ti contatta entro 24 ore per finalizzare i dettagli. Il pagamento avviene online in modo sicuro, con possibilità di pagare in 3 rate senza interessi.",
        },
        {
          question: "Posso personalizzare il mio viaggio?",
          answer:
            "Assolutamente. Tutti i nostri pacchetti sono adattabili: date, hotel, attività, estensioni del soggiorno. Contatta il nostro team e creeremo un itinerario su misura in base ai tuoi desideri e al tuo budget.",
        },
        {
          question: "Qual è la vostra politica di annullamento?",
          answer:
            "Annullamento gratuito fino a 30 giorni prima della partenza. Tra 30 e 15 giorni: rimborso del 50%. Meno di 15 giorni: non rimborsabile, ma offriamo il rinvio del viaggio. L'assicurazione annullamento inclusa nei pacchetti Scoperta e Prestige copre gli imprevisti.",
        },
        {
          question: "I voli sono inclusi in tutti i pacchetti?",
          answer:
            "Sì, tutti i nostri pacchetti includono i voli andata e ritorno da Parigi. Partenza da altre città possibile con un supplemento. Il pacchetto Prestige include voli in classe Business.",
        },
        {
          question: "Organizzate viaggi di gruppo?",
          answer:
            "Sì, organizziamo viaggi di gruppo a partire da 8 persone (famiglia, amici, team building). Si applicano tariffe agevolate e possiamo gestire tutta la logistica, inclusi i pasti di gruppo e le animazioni.",
        },
        {
          question: "Come posso contattare il vostro team in caso di emergenza durante il viaggio?",
          answer:
            "Tutti i nostri clienti ricevono un numero di emergenza dedicato, raggiungibile 24 ore su 24 per tutta la durata del soggiorno. Un consulente locale è inoltre disponibile nella maggior parte delle destinazioni.",
        },
      ],
    },
    footer: {
      ctaTitle: "Pronto a vivere l'avventura della tua vita?",
      ctaSubtitle: "Parla con un consulente oggi stesso. Consulenza gratuita, senza impegno.",
      ctaButton: "Scopri le offerte",
      brandDesc:
        "Agenzia di viaggi online specializzata in soggiorni su misura. Trasformiamo i sogni in realtà dal 2019.",
      location: "Italia, Bologna",
      columns: [
        { title: "Destinazioni", items: ["Maldive", "Giappone", "Bali", "Santorini", "Marocco", "Islanda"] },
        { title: "Offerte", items: ["Pacchetto Essential", "Pacchetto Scoperta", "Pacchetto Prestige", "Viaggi di gruppo", "Su misura"] },
        { title: "Agenzia", items: ["Chi siamo", "Il nostro team", "Testimonianze", "Blog di viaggio", "FAQ"] },
        { title: "Note legali", items: ["Note legali", "Termini e condizioni", "Informativa sulla privacy", "Cookie"] },
      ],
      rights: "Tutti i diritti riservati.",
      madeWith: "Fatto con ❤️ per i viaggiatori di tutto il mondo",
    },
  },

  ar: {
    nav: {
      destinations: "الوجهات",
      offers: "عروضنا",
      testimonials: "آراء العملاء",
      faq: "الأسئلة الشائعة",
      book: "احجز الآن",
    },
    hero: {
      badge: "+2000 مسافر سعيد",
      title1: "مغامرتك القادمة",
      title2: "تبدأ من هنا",
      subtitle:
        "تصمم My Hope Step رحلات مخصصة لتمنحك تجارب لا تُنسى. وجهات حصرية، وأسعار شفافة، ومرافقة على مدار الساعة.",
      cta1: "شاهد عروضنا",
      cta2: "اكتشف",
    },
    features: {
      eyebrow: "لماذا تختارنا",
      title1: "رحلة أحلامك،",
      title2: "بلا تعقيدات",
      subtitle: "تهتم My Hope Step بكل شيء. كل ما عليك هو الاستمتاع.",
      cards: [
        {
          title: "أكثر من 50 وجهة حصرية",
          description:
            "من شواطئ المالديف إلى معابد اليابان، نختار لك أكثر الوجهات المرغوبة في العالم. كل رحلة مصممة لتكون فريدة.",
          statLabel: "وجهة",
        },
        {
          title: "مرافقة على مدار الساعة",
          description:
            "مستشار مخصص يرافقك قبل رحلتك وأثناءها وبعدها. متاحون في أي وقت، ونتولى كل طارئ نيابة عنك.",
          statLabel: "متاح",
        },
        {
          title: "أسعار شفافة، بلا مفاجآت",
          description:
            "لا رسوم خفية. ترى السعر الكامل من البداية. دفع آمن واسترداد مضمون عند الإلغاء وفق شروطنا.",
          statLabel: "شفافية",
        },
      ],
    },
    social: {
      eyebrow: "آراء العملاء",
      title1: "سافروا معنا.",
      title2: "وهذا رأيهم.",
      statLabels: ["مسافر سعيد", "متوسط التقييم", "يوصون بنا", "خبرة"],
      expYears: "25 سنة",
      testimonials: [
        {
          location: "لييج، بلجيكا",
          destination: "المالديف",
          text: "رحلة مثالية تمامًا. اهتمت My Hope Step بكل التفاصيل، من الفندق إلى التنقل. لم يكن عليّ سوى الاستمتاع. أنصح بها دون تردد.",
        },
        {
          location: "بروكسل، بلجيكا",
          destination: "دبي",
          text: "كانت رحلتي إلى اليابان حلمًا قديمًا. صمم الفريق برنامجًا مخصصًا رائعًا. سعر واضح وبلا أي مفاجآت سيئة. 10/10.",
        },
        {
          location: "مرسيليا، فرنسا",
          destination: "بالي",
          text: "الرحلة الثانية مع My Hope Step وبنفس الجودة دائمًا. كان المستشار متاحًا في أي وقت. سنسافر مجددًا العام المقبل!",
        },
      ],
    },
    pricing: {
      eyebrow: "عروضنا",
      title1: "باقات واضحة،",
      title2: "لكل ميزانية",
      subtitle: "السعر للشخص، شامل كل شيء. لا رسوم خفية. اختر مستوى تجربتك.",
      period: "/ للشخص",
      popularBadge: "الأكثر شعبية",
      luxeBadge: "فخامة",
      footerNote: "أسعار تقديرية للمغادرة في الموسم المنخفض. تواصل معنا للحصول على عرض سعر مخصص.",
      plans: [
        {
          name: "الأساسية",
          description: "مثالية لأول رحلة منظمة، دون عناء.",
          cta: "اختر الأساسية",
          features: [
            "رحلة طيران ذهابًا وإيابًا",
            "فندق 3 نجوم مختار",
            "نقل من وإلى المطار",
            "دعم بالبريد من 9 إلى 18",
            "دليل الوجهة بصيغة PDF",
          ],
          missing: ["مستشار مخصص", "أنشطة مشمولة"],
        },
        {
          name: "الاكتشاف",
          description: "عرضنا الأكثر شعبية. تجربة كاملة، بلا توتر.",
          cta: "اختر الاكتشاف",
          features: [
            "رحلة طيران ذهابًا وإيابًا",
            "فندق 4 نجوم مختار",
            "نقل من وإلى المطار",
            "مستشار مخصص 7/7",
            "نشاطان مشمولان",
            "تأمين سفر شامل",
            "برنامج مخصص",
          ],
          missing: [],
        },
        {
          name: "البريستيج",
          description: "رحلة استثنائية. مخصصة من الألف إلى الياء، خدمة 5 نجوم.",
          cta: "اختر البريستيج",
          features: [
            "طيران درجة رجال الأعمال",
            "فندق 5 نجوم أو فيلا خاصة",
            "نقل بسيارة ليموزين",
            "مستشار مخصص على مدار الساعة",
            "أنشطة غير محدودة",
            "تأمين شامل لكل المخاطر",
            "برنامج مخصص 100%",
            "خدمة كونسيرج خاصة في الموقع",
          ],
          missing: [],
        },
      ],
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج معرفته قبل السفر.",
      stillQuestions: "لم تجد إجابتك؟",
      contactUs: "تواصل معنا",
      items: [
        {
          question: "كيف يتم الحجز؟",
          answer:
            "اختر باقتك، واملأ نموذج الحجز عبر الإنترنت، وسيتواصل معك مستشار خلال 24 ساعة لإتمام التفاصيل. يتم الدفع إلكترونيًا بشكل آمن، مع إمكانية التقسيط على 3 دفعات دون رسوم.",
        },
        {
          question: "هل يمكنني تخصيص رحلتي؟",
          answer:
            "بالتأكيد. جميع باقاتنا قابلة للتعديل: التواريخ، الفندق، الأنشطة، تمديد الإقامة. تواصل مع فريقنا وسنصمم برنامجًا مخصصًا حسب رغباتك وميزانيتك.",
        },
        {
          question: "ما هي سياسة الإلغاء لديكم؟",
          answer:
            "الإلغاء مجاني حتى 30 يومًا قبل المغادرة. بين 30 و15 يومًا: استرداد 50%. أقل من 15 يومًا: غير قابل للاسترداد، لكن نوفر تأجيل الرحلة. يغطي تأمين الإلغاء المشمول في باقتي الاكتشاف والبريستيج الحالات الطارئة.",
        },
        {
          question: "هل الرحلات الجوية مشمولة في كل الباقات؟",
          answer:
            "نعم، تشمل جميع باقاتنا رحلات الطيران ذهابًا وإيابًا من باريس. المغادرة من مدن أخرى ممكنة مقابل رسوم إضافية. تشمل باقة البريستيج رحلات على درجة رجال الأعمال.",
        },
        {
          question: "هل تنظمون رحلات جماعية؟",
          answer:
            "نعم، ننظم رحلات جماعية بدءًا من 8 أشخاص (العائلة، الأصدقاء، بناء الفريق). تُطبق أسعار تفضيلية ويمكننا إدارة كامل الخدمات اللوجستية، بما في ذلك وجبات المجموعة والفعاليات.",
        },
        {
          question: "كيف أتواصل مع فريقكم في حالة الطوارئ أثناء الرحلة؟",
          answer:
            "يحصل جميع عملائنا على رقم طوارئ مخصص، متاح على مدار الساعة طوال فترة الإقامة. كما يتوفر مستشار محلي في معظم وجهاتنا.",
        },
      ],
    },
    footer: {
      ctaTitle: "هل أنت مستعد لعيش مغامرة حياتك؟",
      ctaSubtitle: "تحدث مع مستشار اليوم. استشارة مجانية دون التزام.",
      ctaButton: "شاهد عروضنا",
      brandDesc:
        "وكالة سفر إلكترونية متخصصة في الرحلات المخصصة. نحوّل الحلم إلى حقيقة منذ 2019.",
      location: "إيطاليا، بولونيا",
      columns: [
        { title: "الوجهات", items: ["المالديف", "اليابان", "بالي", "سانتوريني", "المغرب", "آيسلندا"] },
        { title: "العروض", items: ["باقة الأساسية", "باقة الاكتشاف", "باقة البريستيج", "رحلات جماعية", "حسب الطلب"] },
        { title: "الوكالة", items: ["من نحن", "فريقنا", "آراء العملاء", "مدونة السفر", "الأسئلة الشائعة"] },
        { title: "قانوني", items: ["إشعارات قانونية", "الشروط والأحكام", "سياسة الخصوصية", "ملفات الارتباط"] },
      ],
      rights: "جميع الحقوق محفوظة.",
      madeWith: "صُنع بـ ❤️ لمسافري العالم",
    },
  },
} as const

export type Dictionary = (typeof dictionaries)["fr"]

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
  dir: "ltr" | "rtl"
}

const I18nContext = React.createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("fr")

  React.useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("mhs-lang") as Lang | null) : null
    if (stored && ["fr", "it", "ar"].includes(stored)) {
      setLangState(stored)
    }
  }, [])

  const dir = LANGS.find((l) => l.code === lang)?.dir ?? "ltr"

  React.useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next)
    if (typeof window !== "undefined") localStorage.setItem("mhs-lang", next)
  }, [])

  const value = React.useMemo<I18nContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] as Dictionary, dir }),
    [lang, setLang, dir]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}
