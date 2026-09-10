"use server";

// Manuvo - avvio del pagamento Stripe Checkout per un pacchetto di crediti.
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getBaseUrl } from "@/lib/base-url";

export type BuyState = { error?: string; url?: string } | undefined;

export async function startCheckout(_prev: BuyState, formData: FormData): Promise<BuyState> {
  const t = await getTranslations("credits");
  const session = await auth();
  if (!session?.user) return { error: t("session_expired") };

  const packId = String(formData.get("packId") ?? "");
  if (!packId) return { error: t("invalid_pack") };

  const pack = await prisma.creditPack.findUnique({ where: { id: packId } });
  if (!pack || !pack.active) return { error: t("invalid_pack") };

  if (!stripe) return { error: t("checkout_unavailable") };

  const base = await getBaseUrl();
  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(pack.priceEur * 100),
            product_data: { name: `Manuvo · ${pack.credits} crediti` },
          },
        },
      ],
      metadata: {
        userId: session.user.id,
        packId: pack.id,
        credits: String(pack.credits),
        amountEur: String(pack.priceEur),
      },
      success_url: `${base}/dashboard/crediti?paid=1`,
      cancel_url: `${base}/dashboard/crediti?canceled=1`,
    });
    if (!checkout.url) return { error: t("recharge_failed") };
    return { url: checkout.url };
  } catch (err) {
    console.error("[stripe] creazione checkout fallita:", err);
    return { error: t("recharge_failed") };
  }
}
