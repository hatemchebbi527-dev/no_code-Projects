import Stripe from "stripe";

// Construction paresseuse : le SDK Stripe lève une erreur dès le constructeur
// si la clé est vide, ce qui fait planter `next build` (le module est évalué
// pendant "Collecting page data") tant que STRIPE_SECRET_KEY n'est pas encore
// configurée. On ne construit le client qu'au moment où on en a réellement besoin.
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY non configurata.");
    }
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export type CheckoutKind = "studio_automatizzato" | "studio_360" | "addon_presenza_online";

interface PlanPricing {
  recurringPriceId: string | undefined;
  setupPriceId: string | undefined;
}

// Lu à l'appel (pas un objet figé au chargement du module) — même raison
// que getStripe() : éviter de capter des variables d'environnement pas
// encore disponibles au moment où le module a été évalué.
export function getCheckoutPricing(kind: CheckoutKind): PlanPricing {
  switch (kind) {
    case "studio_automatizzato":
      return {
        recurringPriceId: process.env.STRIPE_PRICE_STUDIO_AUTOMATIZZATO,
        setupPriceId: process.env.STRIPE_PRICE_STUDIO_AUTOMATIZZATO_SETUP,
      };
    case "studio_360":
      return {
        recurringPriceId: process.env.STRIPE_PRICE_STUDIO_360,
        setupPriceId: process.env.STRIPE_PRICE_STUDIO_360_SETUP,
      };
    case "addon_presenza_online":
      return {
        recurringPriceId: process.env.STRIPE_PRICE_PRESENZA_ONLINE,
        setupPriceId: process.env.STRIPE_PRICE_PRESENZA_ONLINE_SETUP,
      };
  }
}
