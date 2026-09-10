// Manuvo - webhook Stripe: credita il conto dopo un pagamento confermato.
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { grantCreditsForCheckout } from "@/lib/credits";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  // Il corpo grezzo e necessario per verificare la firma.
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe] firma non valida:", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // Credita solo se il pagamento e effettivamente riuscito.
    if (session.payment_status === "paid") {
      const md = session.metadata ?? {};
      const userId = md.userId;
      const credits = Number(md.credits);
      const amountEur = Number(md.amountEur);
      if (userId && Number.isFinite(credits) && credits > 0) {
        try {
          await grantCreditsForCheckout({
            userId,
            credits,
            amountEur: Number.isFinite(amountEur) ? amountEur : 0,
            reference: session.id,
          });
        } catch (err) {
          console.error("[stripe] accredito fallito:", err);
          // 500 -> Stripe riproverà l'invio del webhook.
          return NextResponse.json({ error: "grant_failed" }, { status: 500 });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
