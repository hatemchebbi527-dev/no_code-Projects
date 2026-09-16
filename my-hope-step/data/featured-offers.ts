export type OfferType = "circuit" | "sejour" | "croisiere" | "groupe" | "spirituel" | "escapade"

export type Offer = {
  id: string
  slug: string
  title: string
  destination: string
  destinationSlug: string
  type: OfferType
  period: string
  duration: string
  price: number | null
  image: string
  highlights: string[]
  description: string
  program: { day: string; title: string; desc: string }[]
  accommodation: string
  transport: string
  meals: string
  included: string[]
  notIncluded: string[]
  conditions: string
  featured: boolean
}

export const offers: Offer[] = [
  {
    id: "1",
    slug: "circuit-istanbul-cappadoce",
    title: "Circuit Istanbul & Cappadoce",
    destination: "Turquie",
    destinationSlug: "turquie",
    type: "circuit",
    period: "Toute l'année",
    duration: "8 jours / 7 nuits",
    price: 1290,
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
    highlights: ["Istanbul historique", "Cappadoce en montgolfière", "Excursions incluses"],
    description:
      "Découvrez deux des plus belles régions de Turquie : l'effervescente Istanbul avec sa Mosquée Bleue et le Grand Bazar, puis la Cappadoce féerique avec ses formations rocheuses uniques et son légendaire vol en montgolfière.",
    program: [
      { day: "Jour 1", title: "Arrivée à Istanbul", desc: "Accueil à l'aéroport et transfert à l'hôtel. Soirée libre pour découvrir le quartier de Sultanahmet." },
      { day: "Jour 2", title: "Istanbul historique", desc: "Visite de la Mosquée Bleue, de Sainte-Sophie, du Palais de Topkapi et du Grand Bazar." },
      { day: "Jour 3", title: "Istanbul moderne", desc: "Croisière sur le Bosphore, quartier de Beyoğlu, Marché aux Épices." },
      { day: "Jour 4", title: "Vol vers la Cappadoce", desc: "Vol domestique vers Kayseri. Transfert vers la Cappadoce. Vallée de Göreme." },
      { day: "Jour 5", title: "Montgolfière & Göreme", desc: "Lever aux aurores pour le vol en montgolfière (en option). Musée en plein air de Göreme, villages troglodytes." },
      { day: "Jour 6", title: "Vallées & Kaymakli", desc: "Vallée de l'Ihlara, ville souterraine de Kaymakli, Uçhisar." },
      { day: "Jour 7", title: "Journée libre", desc: "Temps libre pour découvrir les boutiques locales et les poteries de la région." },
      { day: "Jour 8", title: "Retour", desc: "Transfert à l'aéroport de Kayseri. Vol retour." },
    ],
    accommodation: "Hôtels 4★ en chambre double standard",
    transport: "Vols internationaux + vol domestique Istanbul–Cappadoce inclus",
    meals: "Petits-déjeuners inclus chaque matin",
    included: [
      "Vols aller-retour depuis Bruxelles",
      "Vol domestique Istanbul–Kayseri",
      "7 nuits en hôtels 4★",
      "Petits-déjeuners",
      "Transferts aéroport",
      "Visites guidées à Istanbul et Cappadoce",
      "Guide francophone",
    ],
    notIncluded: [
      "Vol en montgolfière (option : ~180€)",
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Assurance voyage",
      "Visa (non requis pour ressortissants UE)",
    ],
    conditions:
      "Disponibilités à confirmer. Tarif par personne en chambre double. Supplément chambre individuelle sur demande. Paiement : 30% à la réservation, solde 30 jours avant départ.",
    featured: true,
  },
  {
    id: "2",
    slug: "omra-individuelle",
    title: "Omra individuelle & sur mesure",
    destination: "Arabie saoudite",
    destinationSlug: "arabie-saoudite",
    type: "spirituel",
    period: "Toute l'année",
    duration: "10 jours / 9 nuits",
    price: null,
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop",
    highlights: ["Hôtels proches des lieux saints", "Transferts inclus", "Accompagnement dédié"],
    description:
      "Effectuez votre Omra dans les meilleures conditions avec un accompagnement attentif. Hébergement à proximité de la Mosquée Al-Haram à La Mecque et de la Mosquée du Prophète à Médine, transferts et guide disponible.",
    program: [
      { day: "Jour 1", title: "Départ & arrivée", desc: "Vol vers Djeddah ou Médine. Accueil et transfert à l'hôtel." },
      { day: "Jours 2-5", title: "Médine", desc: "Visite de la Mosquée du Prophète (Al-Masjid Al-Nabawi), Masjid Quba, Al-Baqi." },
      { day: "Jour 6", title: "Transfert La Mecque", desc: "Transfert en autocar climatisé vers La Mecque. Installation à l'hôtel." },
      { day: "Jours 7-9", title: "La Mecque", desc: "Accomplissement des rites de l'Omra : Tawaf, Sa'i, Tahallul. Temps de prière et de recueillement." },
      { day: "Jour 10", title: "Retour", desc: "Transfert vers l'aéroport. Vol retour." },
    ],
    accommodation: "Hôtels 3★ à 5★ selon formule choisie, à 200m–500m des mosquées",
    transport: "Vols internationaux + transferts terrestres inclus",
    meals: "Petits-déjeuners et dîners inclus",
    included: [
      "Vols aller-retour",
      "Hébergement selon formule",
      "Petits-déjeuners et dîners",
      "Transferts aéroport et Médine–La Mecque",
      "Accompagnement francophone",
      "Visa Omra",
    ],
    notIncluded: [
      "Déjeuners",
      "Dépenses personnelles",
      "Assurance voyage",
    ],
    conditions:
      "Tarif sur demande selon la période, la catégorie d'hôtel et le nombre de voyageurs. Disponibilités à confirmer. Visa Omra obligatoire, inclus dans le forfait.",
    featured: true,
  },
  {
    id: "3",
    slug: "sejour-marrakech",
    title: "Séjour à Marrakech",
    destination: "Maroc",
    destinationSlug: "maroc",
    type: "sejour",
    period: "Toute l'année",
    duration: "5 jours / 4 nuits",
    price: 590,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
    highlights: ["Riad en médina", "Visite des souks", "Excursion Atlas"],
    description:
      "Plongez dans l'atmosphère unique de Marrakech. Perdez-vous dans les souks colorés de la médina, admirez la place Jemaa el-Fna et partez à la découverte des montagnes de l'Atlas en excursion d'une journée.",
    program: [
      { day: "Jour 1", title: "Arrivée à Marrakech", desc: "Accueil à l'aéroport, transfert au riad. Soirée sur la place Jemaa el-Fna." },
      { day: "Jour 2", title: "Médina & Souks", desc: "Visite guidée de la médina : Palais Bahia, Medersa Ben Youssef, souks des teinturiers et des artisans." },
      { day: "Jour 3", title: "Excursion Atlas", desc: "Journée dans les villages berbères des montagnes de l'Atlas. Déjeuner chez l'habitant." },
      { day: "Jour 4", title: "Jardins & Art", desc: "Jardin Majorelle, Musée Yves Saint Laurent, quartier de Guéliz." },
      { day: "Jour 5", title: "Retour", desc: "Matin libre. Transfert à l'aéroport." },
    ],
    accommodation: "Riad 4★ en médina",
    transport: "Vols aller-retour depuis Bruxelles",
    meals: "Petits-déjeuners inclus",
    included: [
      "Vols aller-retour depuis Bruxelles",
      "4 nuits en riad 4★",
      "Petits-déjeuners",
      "Transferts aéroport",
      "Visite guidée de la médina",
      "Excursion Atlas",
    ],
    notIncluded: [
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Assurance voyage",
      "Visa (non requis pour ressortissants UE)",
    ],
    conditions:
      "Tarif par personne en chambre double. Supplément chambre individuelle : 80€. Paiement : 30% à la réservation, solde 30 jours avant départ.",
    featured: true,
  },
  {
    id: "4",
    slug: "circuit-egypte-nil",
    title: "Circuit Égypte & Croisière sur le Nil",
    destination: "Égypte",
    destinationSlug: "egypte",
    type: "croisiere",
    period: "Oct – Avr",
    duration: "10 jours / 9 nuits",
    price: 1590,
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=800&auto=format&fit=crop",
    highlights: ["Pyramides de Gizeh", "Croisière Nil 4 nuits", "Vallée des Rois"],
    description:
      "Une immersion totale dans l'Égypte antique : les pyramides de Gizeh, le Sphinx, les temples de Karnak et Louxor, et une croisière de 4 nuits sur le Nil entre Louxor et Assouan.",
    program: [
      { day: "Jour 1", title: "Le Caire", desc: "Arrivée, transfert hôtel, soirée libre." },
      { day: "Jour 2", title: "Pyramides & Sphinx", desc: "Pyramides de Gizeh, Sphinx, Memphis, Saqqara." },
      { day: "Jour 3", title: "Musée égyptien", desc: "Musée égyptien du Caire, puis vol vers Louxor." },
      { day: "Jour 4", title: "Louxor", desc: "Temple de Karnak, Temple de Louxor, embarquement sur le bateau de croisière." },
      { day: "Jours 5-6", title: "Croisière sur le Nil", desc: "Navigation vers Assouan. Temples d'Edfou et de Kom Ombo." },
      { day: "Jour 7", title: "Assouan", desc: "Temple de Philae, Haut Barrage d'Assouan. Option : Abou Simbel." },
      { day: "Jour 8", title: "Vallée des Rois", desc: "Retour à Louxor. Vallée des Rois, Temple de la Reine Hatchepsout." },
      { day: "Jour 9", title: "Vol retour", desc: "Vol Louxor–Le Caire, puis vol international." },
      { day: "Jour 10", title: "Arrivée", desc: "Arrivée à destination." },
    ],
    accommodation: "Hôtels 4★ au Caire + bateau de croisière 4★ sur le Nil",
    transport: "Vols internationaux + vol domestique Le Caire–Louxor inclus",
    meals: "Pension complète sur le bateau de croisière, petits-déjeuners en hôtel",
    included: [
      "Vols aller-retour",
      "Vol domestique Le Caire–Louxor",
      "9 nuits (hôtels + bateau de croisière)",
      "Repas selon programme",
      "Entrées des sites incluses",
      "Guide égyptologue francophone",
      "Transferts",
    ],
    notIncluded: [
      "Visa Égypte (~25€)",
      "Option Abou Simbel",
      "Dépenses personnelles",
      "Pourboires",
      "Assurance voyage",
    ],
    conditions:
      "Tarif par personne en chambre double. Départs garantis d'octobre à avril. Paiement : 30% à la réservation.",
    featured: false,
  },
  {
    id: "5",
    slug: "sejour-dubai",
    title: "Séjour Dubaï & Émirats",
    destination: "Émirats arabes unis",
    destinationSlug: "emirats",
    type: "sejour",
    period: "Nov – Avr",
    duration: "6 jours / 5 nuits",
    price: 1090,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    highlights: ["Burj Khalifa", "Safari désert", "Abu Dhabi inclus"],
    description:
      "Découvrez l'architecture futuriste de Dubaï, les souks dorés et parfumés, le désert en soirée avec dîner bédouin, et une excursion à Abu Dhabi pour visiter la Grande Mosquée du Cheikh Zayed.",
    program: [
      { day: "Jour 1", title: "Arrivée à Dubaï", desc: "Accueil et transfert hôtel. Soirée libre." },
      { day: "Jour 2", title: "Dubaï moderne", desc: "Burj Khalifa (observation deck), Dubai Mall, fontaines." },
      { day: "Jour 3", title: "Vieux Dubaï", desc: "Souks de l'or et des épices, Dubai Creek, quartier d'Al Fahidi." },
      { day: "Jour 4", title: "Safari désert", desc: "Après-midi safari en 4x4, sandboard, dîner bédouin sous les étoiles." },
      { day: "Jour 5", title: "Abu Dhabi", desc: "Excursion : Grande Mosquée du Cheikh Zayed, Corniche, Yas Island." },
      { day: "Jour 6", title: "Retour", desc: "Matin libre, shopping. Transfert aéroport." },
    ],
    accommodation: "Hôtel 4★ à Dubaï",
    transport: "Vols aller-retour inclus",
    meals: "Petits-déjeuners + dîner bédouin",
    included: [
      "Vols aller-retour",
      "5 nuits en hôtel 4★",
      "Petits-déjeuners",
      "Safari désert avec dîner",
      "Excursion Abu Dhabi",
      "Transferts aéroport",
      "Visa (inclus pour ressortissants UE)",
    ],
    notIncluded: [
      "Déjeuners et dîners (sauf dîner bédouin)",
      "Dépenses personnelles",
      "Assurance voyage",
    ],
    conditions:
      "Tarif par personne en chambre double. Idéal novembre à avril (éviter l'été). Paiement : 30% à la réservation.",
    featured: false,
  },
]

export const featuredOffers = offers.filter((o) => o.featured)
