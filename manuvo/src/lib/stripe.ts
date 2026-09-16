// Manuvo - client Stripe (server-only). Se la chiave manca, resta null.
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripeConfigured = Boolean(secretKey);

export const stripe: Stripe | null = secretKey ? new Stripe(secretKey) : null;

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";
