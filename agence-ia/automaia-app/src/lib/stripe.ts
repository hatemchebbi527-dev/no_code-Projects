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

export const CHECKOUT_PRICING: Record<CheckoutKind, PlanPricing> = {
  studio_automatizzato: {
    recurringPriceId: process.env.STRIPE_PRICE_STUDIO_AUTOMATIZZATO,
    setupPriceId: process.env.STRIPE_PRICE_STUDIO_AUTOMATIZZATO_SETUP,
  },
  studio_360: {
    recurringPriceId: process.env.STRIPE_PRICE_STUDIO_360,
    setupPriceId: process.env.STRIPE_PRICE_STUDIO_360_SETUP,
  },
  addon_presenza_online: {
    recurringPriceId: process.env.STRIPE_PRICE_PRESENZA_ONLINE,
    setupPriceId: process.env.STRIPE_PRICE_PRESENZA_ONLINE_SETUP,
  },
};
