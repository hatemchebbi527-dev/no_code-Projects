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
      home: "Accueil",
      destinations: "Destinations",
      offers: "Nos offres",
      hajj: "Hajj & Omra",
      ticketing: "Billetterie",
      about: "À propos",
      contact: "Contact",
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
    destinations: {
      eyebrow: "Nos destinations",
      title: "Où souhaitez-vous partir ?",
      subtitle: "Du patrimoine européen aux paysages du Moyen-Orient, des couleurs de l'Afrique du Nord aux îles paradisiaques, découvrez les destinations proposées par My Hope Step.",
      chooseCountry: "Choisissez une destination",
      travelTypes: "Types de voyages",
      noOffers: "Nos programmes évoluent selon les saisons et les disponibilités. Transmettez-nous vos dates et vos préférences pour recevoir une proposition personnalisée.",
      requestQuote: "Demander un devis",
      seeTrips: "Voir nos voyages",
      types: {
        circuit: "Circuits",
        sejour: "Séjours",
        groupe: "Groupes",
        mesure: "Sur mesure",
        hajj: "Hajj",
        omra: "Omra",
        prive: "Programmes privés",
        citytrip: "City trips",
        escapade: "Escapades",
        croisiere: "Croisières",
        excursion: "Excursions",
        courtSejour: "Courts séjours",
        combine: "Combinés",
      },
      countries: {
        turquie: "Turquie",
        turquieTagline: "Entre Orient et Occident",
        turquieDesc: "Istanbul, Cappadoce, Antalya, Pamukkale et bien d'autres régions : découvrez une destination riche en histoire, paysages, culture et gastronomie.",
        arabieSaoudite: "Arabie saoudite",
        arabieSaouditeTagline: "Spiritualité, patrimoine et découverte",
        arabieSaouditeDesc: "Découvrez l'Arabie saoudite à travers ses lieux spirituels, son patrimoine, ses paysages et ses nouvelles destinations touristiques.",
        jordanie: "Jordanie",
        jordanieTagline: "Une terre d'histoire et de paysages exceptionnels",
        jordanieDesc: "Pétra, Wadi Rum, Amman, Jerash et mer Morte : partez sur les traces de civilisations millénaires.",
        italie: "Italie",
        italieTagline: "Culture, patrimoine et art de vivre",
        italieDesc: "Rome, Florence, Venise, Bologne, Milan, Naples, Sicile et Sardaigne : découvrez l'Italie selon vos envies.",
        tunisie: "Tunisie",
        tunisieTagline: "Entre Méditerranée, culture et désert",
        tunisieDesc: "De Tunis au Grand Sud, découvrez patrimoine, plages, traditions, gastronomie, désert et sites historiques.",
        maroc: "Maroc",
        marocTagline: "Couleurs, traditions et évasion",
        marocDesc: "Marrakech, Fès, Casablanca, désert, montagnes et littoral : découvrez les multiples visages du Maroc.",
        egypte: "Égypte",
        egypteTagline: "Au cœur d'une civilisation millénaire",
        egypteDesc: "Le Caire, les pyramides, Louxor, Assouan, la mer Rouge et le Nil vous invitent à un voyage entre histoire et dépaysement.",
        espagne: "Espagne",
        espagneTagline: "Soleil, culture et escapades",
        espagneDesc: "Barcelone, Madrid, Andalousie, îles et littoral : une destination idéale pour un séjour, un circuit ou une escapade.",
        grece: "Grèce",
        greceTagline: "Îles, histoire et Méditerranée",
        greceDesc: "Athènes, Santorin et les îles grecques offrent un mélange unique de patrimoine, paysages et douceur méditerranéenne.",
        france: "France",
        franceTagline: "Escapades, culture et découvertes",
        franceDesc: "Villes, patrimoine, nature et régions de caractère : découvrez la France pour un week-end ou un séjour plus long.",
        benelux: "Benelux",
        beneluxTagline: "Des escapades à proximité",
        beneluxDesc: "Belgique, Pays-Bas et Luxembourg : idées de courts séjours, excursions et voyages en groupe sans partir loin.",
        oman: "Oman",
        omanTagline: "Nature, traditions et authenticité",
        omanDesc: "Entre montagnes, désert, wadis et littoral, Oman offre une expérience dépaysante au cœur de la péninsule arabique.",
        emirats: "Émirats arabes unis",
        emiratsTagline: "Entre modernité et traditions",
        emiratsDesc: "Dubaï, Abu Dhabi et les autres émirats offrent des séjours, découvertes, shopping et expériences variées.",
        malaisie: "Malaisie",
        malaisieTagline: "Cultures, nature et évasion",
        malaisieDesc: "Découvrez une destination où villes modernes, traditions, nature tropicale et îles se rencontrent.",
        japon: "Japon",
        japonTagline: "Tradition et modernité",
        japonDesc: "Tokyo, Kyoto et d'autres régions invitent à découvrir une culture unique entre traditions ancestrales et modernité.",
        bali: "Bali",
        baliTagline: "Nature et dépaysement",
        baliDesc: "Rizières, plages, temples et paysages tropicaux : Bali se prête aux séjours détente comme aux voyages de découverte.",
        maldives: "Maldives",
        maldivesTagline: "Une parenthèse au paradis",
        maldivesDesc: "Lagons turquoise, plages et îles : imaginez un séjour conçu selon vos envies, en couple, en famille ou pour une occasion spéciale.",
      },
    },
    homeWindows: {
      eyebrow: "Nos services",
      title: "Tout ce que vous pouvez réserver avec nous",
      items: [
        { title: "Destinations", desc: "Inspirez-vous de nos destinations et trouvez votre prochaine expérience en Europe, en Afrique du Nord, au Moyen-Orient, en Asie et dans l'océan Indien.", cta: "Découvrir les destinations", href: "/destinations" },
        { title: "Nos offres", desc: "Découvrez nos séjours, circuits, croisières et voyages du moment, sélectionnés pour différents styles de voyageurs.", cta: "Voir nos offres", href: "/nos-offres" },
        { title: "Hajj & Omra", desc: "Préparez votre voyage spirituel avec un accompagnement attentif et des prestations adaptées à votre projet.", cta: "Découvrir Hajj & Omra", href: "/hajj-omra" },
        { title: "Billetterie", desc: "Billets d'avion ou traversées en ferry : transmettez-nous votre demande selon votre destination, vos dates et vos besoins.", cta: "Découvrir la billetterie", href: "/billetterie" },
        { title: "Voyage sur mesure", desc: "Vous avez une idée précise ? Confiez-nous votre projet et construisons ensemble un voyage adapté à vos envies.", cta: "Créer mon voyage", href: "/contact" },
      ],
    },
    featuredOffers: {
      eyebrow: "Offres du moment",
      title: "Nos voyages sélectionnés",
      subtitle: "Des expériences soigneusement choisies pour différents styles de voyageurs.",
      fromPrice: "À partir de",
      perPerson: "/ pers.",
      priceOnRequest: "Tarif sur demande",
      seeProgram: "Voir le programme",
      allOffers: "Voir toutes nos offres",
    },
    nosOffres: {
      eyebrow: "Tous nos voyages",
      title: "Nos offres",
      subtitle: "Séjours, circuits, croisières et voyages spirituels. Trouvez le voyage qui vous correspond.",
      allDestinations: "Toutes les destinations",
      allTypes: "Tous les types",
      allPeriods: "Toutes les périodes",
      filterDestination: "Destination",
      filterType: "Type",
      filterPeriod: "Période",
      noResults: "Aucune offre ne correspond à votre sélection. Essayez d'autres filtres ou contactez-nous pour un voyage sur mesure.",
      contactUs: "Nous contacter",
      fromPrice: "À partir de",
      perPerson: "/ pers.",
      priceOnRequest: "Tarif sur demande",
      seeProgram: "Voir le programme",
      duration: "Durée",
      period: "Période",
      whatsappCta: "Demander les disponibilités",
      whatsappMsg: "Bonjour, je souhaite obtenir les disponibilités pour l'offre : ",
      included: "Inclus",
      notIncluded: "Non inclus",
      program: "Programme",
      accommodation: "Hébergement",
      transport: "Transport",
      meals: "Repas",
      conditions: "Conditions",
      highlights: "Points forts",
      backToOffers: "Toutes nos offres",
      types: {
        circuit: "Circuit",
        sejour: "Séjour",
        croisiere: "Croisière",
        groupe: "Groupe",
        spirituel: "Spirituel",
        escapade: "Escapade",
      },
    },
    footer: {
      ctaTitle: "Prêt à vivre l'aventure de votre vie ?",
      ctaSubtitle: "Parlez à un conseiller dès aujourd'hui. Consultation gratuite, sans engagement.",
      ctaButton: "Voir nos offres",
      brandDesc:
        "Agence de voyage en ligne spécialisée dans les séjours sur-mesure. Nous faisons du rêve une réalité depuis plus de 25 ans.",
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
      home: "Home",
      destinations: "Destinazioni",
      offers: "Le nostre offerte",
      hajj: "Hajj e Umra",
      ticketing: "Biglietteria",
      about: "Chi siamo",
      contact: "Contatti",
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
    destinations: {
      eyebrow: "Le nostre destinazioni",
      title: "Dove vuoi andare?",
      subtitle: "Dal patrimonio europeo ai paesaggi del Medio Oriente, dai colori del Nord Africa alle isole paradisiache, scopri le destinazioni proposte da My Hope Step.",
      chooseCountry: "Scegli una destinazione",
      travelTypes: "Tipi di viaggio",
      noOffers: "I nostri programmi evolvono secondo le stagioni e le disponibilità. Inviateci le vostre date e preferenze per ricevere una proposta personalizzata.",
      requestQuote: "Richiedi un preventivo",
      seeTrips: "Vedi i nostri viaggi",
      types: {
        circuit: "Circuiti",
        sejour: "Soggiorni",
        groupe: "Gruppi",
        mesure: "Su misura",
        hajj: "Hajj",
        omra: "Umra",
        prive: "Programmi privati",
        citytrip: "City trip",
        escapade: "Fughe",
        croisiere: "Crociere",
        excursion: "Escursioni",
        courtSejour: "Brevi soggiorni",
        combine: "Combinati",
      },
      countries: {
        turquie: "Turchia",
        turquieTagline: "Tra Oriente e Occidente",
        turquieDesc: "Istanbul, Cappadocia, Antalya, Pamukkale e molte altre regioni: scopri una destinazione ricca di storia, paesaggi, cultura e gastronomia.",
        arabieSaoudite: "Arabia Saudita",
        arabieSaouditeTagline: "Spiritualità, patrimonio e scoperta",
        arabieSaouditeDesc: "Scopri l'Arabia Saudita attraverso i suoi luoghi spirituali, il patrimonio, i paesaggi e le nuove destinazioni turistiche.",
        jordanie: "Giordania",
        jordanieTagline: "Una terra di storia e paesaggi eccezionali",
        jordanieDesc: "Petra, Wadi Rum, Amman, Jerash e il Mar Morto: sulle tracce di civiltà millenarie.",
        italie: "Italia",
        italieTagline: "Cultura, patrimonio e arte di vivere",
        italieDesc: "Roma, Firenze, Venezia, Bologna, Milano, Napoli, Sicilia e Sardegna: scopri l'Italia come vuoi.",
        tunisie: "Tunisia",
        tunisieTagline: "Tra Mediterraneo, cultura e deserto",
        tunisieDesc: "Da Tunisi al Grand Sud, scopri patrimonio, spiagge, tradizioni, gastronomia, deserto e siti storici.",
        maroc: "Marocco",
        marocTagline: "Colori, tradizioni ed evasione",
        marocDesc: "Marrakech, Fès, Casablanca, deserto, montagne e litorale: scopri i molteplici volti del Marocco.",
        egypte: "Egitto",
        egypteTagline: "Nel cuore di una civiltà millenaria",
        egypteDesc: "Il Cairo, le piramidi, Luxor, Assuan, il Mar Rosso e il Nilo ti invitano a un viaggio tra storia e paesaggi unici.",
        espagne: "Spagna",
        espagneTagline: "Sole, cultura ed escapades",
        espagneDesc: "Barcellona, Madrid, Andalusia, isole e litorale: una destinazione ideale per un soggiorno, un circuito o una fuga.",
        grece: "Grecia",
        greceTagline: "Isole, storia e Mediterraneo",
        greceDesc: "Atene, Santorini e le isole greche offrono un mix unico di patrimonio, paesaggi e dolcezza mediterranea.",
        france: "Francia",
        franceTagline: "Fughe, cultura e scoperte",
        franceDesc: "Città, patrimonio, natura e regioni di carattere: scopri la Francia per un weekend o un soggiorno più lungo.",
        benelux: "Benelux",
        beneluxTagline: "Fughe a portata di mano",
        beneluxDesc: "Belgio, Paesi Bassi e Lussemburgo: idee di brevi soggiorni, escursioni e viaggi di gruppo.",
        oman: "Oman",
        omanTagline: "Natura, tradizioni e autenticità",
        omanDesc: "Tra montagne, deserto, wadi e litorale, l'Oman offre un'esperienza unica nel cuore della penisola arabica.",
        emirats: "Emirati Arabi Uniti",
        emiratsTagline: "Tra modernità e tradizioni",
        emiratsDesc: "Dubai, Abu Dhabi e gli altri emirati offrono soggiorni, scoperte, shopping ed esperienze varie.",
        malaisie: "Malesia",
        malaisieTagline: "Culture, natura ed evasione",
        malaisieDesc: "Una destinazione dove città moderne, tradizioni, natura tropicale e isole si incontrano.",
        japon: "Giappone",
        japonTagline: "Tradizione e modernità",
        japonDesc: "Tokyo, Kyoto e altre regioni invitano a scoprire una cultura unica tra tradizioni ancestrali e modernità.",
        bali: "Bali",
        baliTagline: "Natura e evasione",
        baliDesc: "Risaie, spiagge, templi e paesaggi tropicali: Bali è perfetta per soggiorni rilassanti o di scoperta.",
        maldives: "Maldive",
        maldivesTagline: "Una parentesi in paradiso",
        maldivesDesc: "Lagune turchesi, spiagge e isole: immagina un soggiorno pensato per te, in coppia, in famiglia o per un'occasione speciale.",
      },
    },
    homeWindows: {
      eyebrow: "I nostri servizi",
      title: "Tutto ciò che puoi prenotare con noi",
      items: [
        { title: "Destinazioni", desc: "Lasciati ispirare dalle nostre destinazioni e trova la tua prossima esperienza in Europa, Africa del Nord, Medio Oriente, Asia e Oceano Indiano.", cta: "Scopri le destinazioni", href: "/destinations" },
        { title: "Le nostre offerte", desc: "Scopri i soggiorni, i circuiti, le crociere e i viaggi del momento, selezionati per diversi stili di viaggiatori.", cta: "Vedi le offerte", href: "/nos-offres" },
        { title: "Hajj & Umra", desc: "Prepara il tuo viaggio spirituale con un accompagnamento attento e servizi adatti al tuo progetto.", cta: "Scopri Hajj & Umra", href: "/hajj-omra" },
        { title: "Biglietteria", desc: "Biglietti aerei o traversate in traghetto: inviaci la tua richiesta in base alla destinazione, alle date e alle tue esigenze.", cta: "Scopri la biglietteria", href: "/billetterie" },
        { title: "Viaggio su misura", desc: "Hai un'idea precisa? Affidaci il tuo progetto e costruiamo insieme un viaggio adatto ai tuoi desideri.", cta: "Crea il mio viaggio", href: "/contact" },
      ],
    },
    featuredOffers: {
      eyebrow: "Offerte del momento",
      title: "I nostri viaggi selezionati",
      subtitle: "Esperienze accuratamente scelte per diversi stili di viaggiatori.",
      fromPrice: "A partire da",
      perPerson: "/ pers.",
      priceOnRequest: "Prezzo su richiesta",
      seeProgram: "Vedi il programma",
      allOffers: "Vedi tutte le offerte",
    },
    nosOffres: {
      eyebrow: "Tutti i nostri viaggi",
      title: "Le nostre offerte",
      subtitle: "Soggiorni, circuiti, crociere e viaggi spirituali. Trova il viaggio che fa per te.",
      allDestinations: "Tutte le destinazioni",
      allTypes: "Tutti i tipi",
      allPeriods: "Tutti i periodi",
      filterDestination: "Destinazione",
      filterType: "Tipo",
      filterPeriod: "Periodo",
      noResults: "Nessuna offerta corrisponde alla tua selezione. Prova altri filtri o contattaci per un viaggio su misura.",
      contactUs: "Contattaci",
      fromPrice: "A partire da",
      perPerson: "/ pers.",
      priceOnRequest: "Prezzo su richiesta",
      seeProgram: "Vedi il programma",
      duration: "Durata",
      period: "Periodo",
      whatsappCta: "Chiedi disponibilità",
      whatsappMsg: "Ciao, vorrei sapere la disponibilità per l'offerta: ",
      included: "Incluso",
      notIncluded: "Non incluso",
      program: "Programma",
      accommodation: "Alloggio",
      transport: "Trasporto",
      meals: "Pasti",
      conditions: "Condizioni",
      highlights: "Punti forti",
      backToOffers: "Tutte le offerte",
      types: {
        circuit: "Circuito",
        sejour: "Soggiorno",
        croisiere: "Crociera",
        groupe: "Gruppo",
        spirituel: "Spirituale",
        escapade: "Fuga",
      },
    },
    footer: {
      ctaTitle: "Pronto a vivere l'avventura della tua vita?",
      ctaSubtitle: "Parla con un consulente oggi stesso. Consulenza gratuita, senza impegno.",
      ctaButton: "Scopri le offerte",
      brandDesc:
        "Agenzia di viaggi online specializzata in soggiorni su misura. Trasformiamo i sogni in realtà da oltre 25 anni.",
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
      home: "الرئيسية",
      destinations: "الوجهات",
      offers: "عروضنا",
      hajj: "الحج والعمرة",
      ticketing: "تذاكر السفر",
      about: "من نحن",
      contact: "اتصل بنا",
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
    destinations: {
      eyebrow: "وجهاتنا",
      title: "إلى أين تريد الذهاب؟",
      subtitle: "من التراث الأوروبي إلى مناظر الشرق الأوسط، ومن ألوان شمال أفريقيا إلى الجزر المتناثرة، اكتشف الوجهات التي تقترحها My Hope Step.",
      chooseCountry: "اختر وجهة",
      travelTypes: "أنواع الرحلات",
      noOffers: "تتطور برامجنا وفق المواسم والتوفر. أرسل لنا تواريخك وتفضيلاتك لتلقي عرضاً مخصصاً.",
      requestQuote: "طلب عرض سعر",
      seeTrips: "عرض رحلاتنا",
      types: {
        circuit: "جولات",
        sejour: "إقامات",
        groupe: "مجموعات",
        mesure: "حسب الطلب",
        hajj: "الحج",
        omra: "العمرة",
        prive: "برامج خاصة",
        citytrip: "جولات المدن",
        escapade: "نزهات",
        croisiere: "رحلات بحرية",
        excursion: "رحلات يومية",
        courtSejour: "إقامات قصيرة",
        combine: "رحلات مدمجة",
      },
      countries: {
        turquie: "تركيا",
        turquieTagline: "بين الشرق والغرب",
        turquieDesc: "إسطنبول وكابادوكيا وأنطاليا وباموكالي وغيرها: وجهة غنية بالتاريخ والمناظر الطبيعية والثقافة والمطبخ.",
        arabieSaoudite: "المملكة العربية السعودية",
        arabieSaouditeTagline: "الروحانية والتراث والاكتشاف",
        arabieSaouditeDesc: "اكتشف المملكة من خلال أماكنها الروحية وتراثها ومناظرها وجهاتها السياحية الجديدة.",
        jordanie: "الأردن",
        jordanieTagline: "أرض التاريخ والمناظر الاستثنائية",
        jordanieDesc: "البتراء ووادي رم وعمان وجرش والبحر الميت: على خطى حضارات عريقة.",
        italie: "إيطاليا",
        italieTagline: "الثقافة والتراث وفن العيش",
        italieDesc: "روما وفلورنسا والبندقية وبولونيا وميلانو ونابولي وصقلية وسردينيا: اكتشف إيطاليا على هواك.",
        tunisie: "تونس",
        tunisieTagline: "بين البحر الأبيض المتوسط والثقافة والصحراء",
        tunisieDesc: "من تونس العاصمة إلى الجنوب الكبير: تراث وشواطئ وتقاليد ومطبخ وصحراء ومواقع تاريخية.",
        maroc: "المغرب",
        marocTagline: "الألوان والتقاليد والعطلات",
        marocDesc: "مراكش وفاس والدار البيضاء والصحراء والجبال والشاطئ: اكتشف أوجه المغرب المتعددة.",
        egypte: "مصر",
        egypteTagline: "في قلب حضارة عريقة",
        egypteDesc: "القاهرة والأهرامات والأقصر وأسوان والبحر الأحمر والنيل: رحلة بين التاريخ والطبيعة.",
        espagne: "إسبانيا",
        espagneTagline: "الشمس والثقافة والنزهات",
        espagneDesc: "برشلونة ومدريد والأندلس والجزر والساحل: وجهة مثالية للإقامة أو الجولة أو النزهة.",
        grece: "اليونان",
        greceTagline: "الجزر والتاريخ والبحر الأبيض المتوسط",
        greceDesc: "أثينا وسانتوريني والجزر اليونانية: مزيج فريد من التراث والمناظر ودفء البحر الأبيض المتوسط.",
        france: "فرنسا",
        franceTagline: "نزهات وثقافة واكتشافات",
        franceDesc: "مدن وتراث وطبيعة ومناطق متميزة: اكتشف فرنسا لعطلة نهاية أسبوع أو إقامة أطول.",
        benelux: "البنيلوكس",
        beneluxTagline: "نزهات قريبة",
        beneluxDesc: "بلجيكا وهولندا ولوكسمبورغ: أفكار لإقامات قصيرة ورحلات يومية وجولات جماعية.",
        oman: "عُمان",
        omanTagline: "الطبيعة والتقاليد والأصالة",
        omanDesc: "بين الجبال والصحراء والأودية والشاطئ، تقدم عُمان تجربة فريدة في قلب شبه الجزيرة العربية.",
        emirats: "الإمارات العربية المتحدة",
        emiratsTagline: "بين الحداثة والتقاليد",
        emiratsDesc: "دبي وأبوظبي وسائر الإمارات تقدم إقامات واكتشافات وتجارب متنوعة.",
        malaisie: "ماليزيا",
        malaisieTagline: "الثقافات والطبيعة والعطلات",
        malaisieDesc: "وجهة تلتقي فيها المدن الحديثة والتقاليد والطبيعة الاستوائية والجزر.",
        japon: "اليابان",
        japonTagline: "التقاليد والحداثة",
        japonDesc: "طوكيو وكيوتو وغيرها تدعوك لاكتشاف ثقافة فريدة بين الموروث والعصرية.",
        bali: "بالي",
        baliTagline: "الطبيعة والانفصال عن الروتين",
        baliDesc: "حقول الأرز والشواطئ والمعابد والمناظر الاستوائية: بالي للاسترخاء كما للاستكشاف.",
        maldives: "المالديف",
        maldivesTagline: "استراحة في الجنة",
        maldivesDesc: "بحيرات فيروزية وشواطئ وجزر: تخيل إقامة مصممة خصيصاً لك، في ثنائي أو عائلة أو لمناسبة خاصة.",
      },
    },
    homeWindows: {
      eyebrow: "خدماتنا",
      title: "كل ما يمكنك حجزه معنا",
      items: [
        { title: "الوجهات", desc: "اكتشف وجهاتنا وابحث عن تجربتك القادمة في أوروبا وشمال أفريقيا والشرق الأوسط وآسيا والمحيط الهندي.", cta: "اكتشف الوجهات", href: "/destinations" },
        { title: "عروضنا", desc: "اكتشف إقاماتنا ورحلاتنا ورحلات البحر وأسفار اللحظة، المختارة لأساليب مختلفة من المسافرين.", cta: "عرض العروض", href: "/nos-offres" },
        { title: "الحج والعمرة", desc: "استعد لرحلتك الروحية مع مرافقة متأنية وخدمات مناسبة لمشروعك.", cta: "اكتشف الحج والعمرة", href: "/hajj-omra" },
        { title: "تذاكر السفر", desc: "تذاكر طيران أو عبور بالسفينة: أرسل لنا طلبك حسب وجهتك وتواريخك واحتياجاتك.", cta: "اكتشف التذاكر", href: "/billetterie" },
        { title: "رحلة مخصصة", desc: "لديك فكرة محددة؟ أوكل إلينا مشروعك وسنبني معاً رحلة تناسب رغباتك.", cta: "أنشئ رحلتي", href: "/contact" },
      ],
    },
    featuredOffers: {
      eyebrow: "عروض اللحظة",
      title: "رحلاتنا المختارة",
      subtitle: "تجارب مختارة بعناية لأساليب مختلفة من المسافرين.",
      fromPrice: "ابتداءً من",
      perPerson: "/ شخص",
      priceOnRequest: "السعر عند الطلب",
      seeProgram: "عرض البرنامج",
      allOffers: "عرض جميع العروض",
    },
    nosOffres: {
      eyebrow: "جميع رحلاتنا",
      title: "عروضنا",
      subtitle: "إقامات وجولات ورحلات بحرية وأسفار روحية. اعثر على الرحلة المناسبة لك.",
      allDestinations: "جميع الوجهات",
      allTypes: "جميع الأنواع",
      allPeriods: "جميع الفترات",
      filterDestination: "الوجهة",
      filterType: "النوع",
      filterPeriod: "الفترة",
      noResults: "لا يوجد عرض يطابق اختيارك. جرّب فلاتر أخرى أو تواصل معنا لرحلة مخصصة.",
      contactUs: "تواصل معنا",
      fromPrice: "ابتداءً من",
      perPerson: "/ شخص",
      priceOnRequest: "السعر عند الطلب",
      seeProgram: "عرض البرنامج",
      duration: "المدة",
      period: "الفترة",
      whatsappCta: "استفسار عن التوافر",
      whatsappMsg: "مرحباً، أرغب في الاستفسار عن توافر هذا العرض: ",
      included: "المشمول",
      notIncluded: "غير المشمول",
      program: "البرنامج",
      accommodation: "الإقامة",
      transport: "التنقل",
      meals: "الوجبات",
      conditions: "الشروط",
      highlights: "أبرز المميزات",
      backToOffers: "جميع العروض",
      types: {
        circuit: "جولة",
        sejour: "إقامة",
        croisiere: "رحلة بحرية",
        groupe: "مجموعة",
        spirituel: "روحي",
        escapade: "نزهة",
      },
    },
    footer: {
      ctaTitle: "هل أنت مستعد لعيش مغامرة حياتك؟",
      ctaSubtitle: "تحدث مع مستشار اليوم. استشارة مجانية دون التزام.",
      ctaButton: "شاهد عروضنا",
      brandDesc:
        "وكالة سفر إلكترونية متخصصة في الرحلات المخصصة. نحوّل الحلم إلى حقيقة منذ أكثر من 25 عامًا.",
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
