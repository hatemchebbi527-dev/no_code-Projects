import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { StudioPlan, StudioPlanStatus } from "@/lib/supabase/types";

function mapSubscriptionStatus(status: Stripe.Subscription.Status): StudioPlanStatus {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trial";
    case "past_due":
    case "unpaid":
    case "incomplete":
      return "past_due";
    default:
      return "canceled";
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Firma mancante" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET ?? "");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Firma non valida";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const studioId = session.metadata?.studio_id;
      const kind = session.metadata?.kind;
      const customerId =
        typeof session.customer === "string" ? session.customer : session.customer?.id;

      if (studioId && kind === "addon_presenza_online") {
        await supabase
          .from("studios")
          .update(
            customerId
              ? { addon_presenza_online: true, stripe_customer_id: customerId }
              : { addon_presenza_online: true }
          )
          .eq("id", studioId);
      } else if (studioId && kind) {
        await supabase
          .from("studios")
          .update(
            customerId
              ? { plan: kind as StudioPlan, plan_status: "active", stripe_customer_id: customerId }
              : { plan: kind as StudioPlan, plan_status: "active" }
          )
          .eq("id", studioId);
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const studioId = subscription.metadata?.studio_id;
      const kind = subscription.metadata?.kind;
      const status = mapSubscriptionStatus(subscription.status);

      if (studioId && kind === "addon_presenza_online") {
        await supabase
          .from("studios")
          .update({ addon_presenza_online: status === "active" || status === "trial" })
          .eq("id", studioId);
      } else if (studioId && kind) {
        await supabase.from("studios").update({ plan_status: status }).eq("id", studioId);
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
