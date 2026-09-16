export type Offer = {
  id: string
  slug: string
  title: string
  destination: string
  country: string
  duration: string
  price: number | null
  image: string
  highlights: string[]
}

export const featuredOffers: Offer[] = [
  {
    id: "1",
    slug: "circuit-istanbul-cappadoce",
    title: "Circuit Istanbul & Cappadoce",
    destination: "Turquie",
    country: "tr",
    duration: "8 jours / 7 nuits",
    price: 1290,
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
    highlights: ["Istanbul historique", "Cappadoce en montgolfière", "Excursions incluses"],
  },
  {
    id: "2",
    slug: "omra-individuelle",
    title: "Omra individuelle & sur mesure",
    destination: "Arabie saoudite",
    country: "sa",
    duration: "10 jours / 9 nuits",
    price: null,
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800&auto=format&fit=crop",
    highlights: ["Hôtels proches des lieux saints", "Transferts inclus", "Accompagnement dédié"],
  },
  {
    id: "3",
    slug: "sejour-marrakech",
    title: "Séjour à Marrakech",
    destination: "Maroc",
    country: "ma",
    duration: "5 jours / 4 nuits",
    price: 590,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
    highlights: ["Riad en médina", "Visite des souks", "Excursion Atlas"],
  },
]
