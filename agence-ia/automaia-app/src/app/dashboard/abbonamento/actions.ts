"use server";

import { redirect } from "next/navigation";

import { CHECKOUT_PRICING, stripe, type CheckoutKind } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import type { Studio } from "@/lib/supabase/types";

async function currentStudio(): Promise<Studio | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("studio_id")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  const { data: studio } = await supabase
    .from("studios")
    .select("*")
    .eq("id", profile.studio_id)
    .single();

  return studio;
}

async function getOrCreateStripeCustomer(studio: Studio, email: string | undefined): Promise<string> {
  if (studio.stripe_customer_id) return studio.stripe_customer_id;

  const customer = await stripe.customers.create({
    email,
    metadata: { studio_id: studio.id },
  });

  const supabase = createClient();
  await supabase
    .from("studios")
    .update({ stripe_customer_id: customer.id })
    .eq("id", studio.id);

  return customer.id;
}

export async function createCheckoutSession(kind: CheckoutKind) {
  const studio = await currentStudio();
  if (!studio) return;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const customerId = await getOrCreateStripeCustomer(studio, user?.email);
  const pricing = CHECKOUT_PRICING[kind];

  const lineItems = [pricing.setupPriceId, pricing.recurringPriceId]
    .filter((priceId): priceId is string => Boolean(priceId))
    .map((priceId) => ({ price: priceId, quantity: 1 }));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: lineItems,
    success_url: `${appUrl}/dashboard/abbonamento?success=1`,
    cancel_url: `${appUrl}/dashboard/abbonamento?canceled=1`,
    metadata: { studio_id: studio.id, kind },
    subscription_data: {
      metadata: { studio_id: studio.id, kind },
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}

export async function createPortalSession() {
  const studio = await currentStudio();
  if (!studio?.stripe_customer_id) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const session = await stripe.billingPortal.sessions.create({
    customer: studio.stripe_customer_id,
    return_url: `${appUrl}/dashboard/abbonamento`,
  });

  redirect(session.url);
}
