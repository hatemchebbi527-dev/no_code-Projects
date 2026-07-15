"use server";

import { redirect } from "next/navigation";

import { getCheckoutPricing, getStripe, type CheckoutKind } from "@/lib/stripe";
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

  const customer = await getStripe().customers.create({
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

export async function createCheckoutSession(kind: CheckoutKind): Promise<{ error?: string }> {
  const studio = await currentStudio();
  if (!studio) return { error: "Sessione non valida. Effettui di nuovo l'accesso." };

  let checkoutUrl: string | null = null;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customerId = await getOrCreateStripeCustomer(studio, user?.email);
    const pricing = getCheckoutPricing(kind);

    const lineItems = [pricing.setupPriceId, pricing.recurringPriceId]
      .filter((priceId): priceId is string => Boolean(priceId))
      .map((priceId) => ({ price: priceId, quantity: 1 }));

    if (lineItems.length === 0) {
      const lengths = Object.keys(process.env)
        .filter((key) => key.startsWith("STRIPE_PRICE"))
        .map((key) => `${key}=${process.env[key]?.length ?? 0} caratteri`)
        .join(", ");
      return {
        error:
          `Nessun prezzo Stripe configurato per "${kind}". ` +
          `[diagnostica temporanea] Lunghezza dei valori rilevati: ${lengths || "nessuna variabile"}.`,
      };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    const session = await getStripe().checkout.sessions.create({
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

    checkoutUrl = session.url;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Errore sconosciuto." };
  }

  if (!checkoutUrl) {
    return { error: "Impossibile creare la sessione di pagamento." };
  }

  redirect(checkoutUrl);
}

export async function createPortalSession(): Promise<{ error?: string }> {
  const studio = await currentStudio();
  if (!studio?.stripe_customer_id) {
    return { error: "Nessun cliente Stripe associato a questo studio." };
  }

  let portalUrl: string | null = null;

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const session = await getStripe().billingPortal.sessions.create({
      customer: studio.stripe_customer_id,
      return_url: `${appUrl}/dashboard/abbonamento`,
    });
    portalUrl = session.url;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Errore sconosciuto." };
  }

  redirect(portalUrl);
}
