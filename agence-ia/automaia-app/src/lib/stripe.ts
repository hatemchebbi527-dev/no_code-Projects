import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

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
