import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

import { CheckoutButton } from "./checkout-button";
import { PortalButton } from "./portal-button";

const PLAN_LABELS: Record<string, string> = {
  trial: "Prova gratuita",
  studio_automatizzato: "Studio Automatizzato",
  studio_360: "Studio 360",
};

const STATUS_LABELS: Record<string, string> = {
  trial: "In prova",
  active: "Attivo",
  past_due: "Pagamento in ritardo",
  canceled: "Annullato",
};

export default async function AbbonamentoPage({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("users").select("studio_id").eq("id", user.id).single()
    : { data: null };

  const { data: studio } = profile
    ? await supabase.from("studios").select("*").eq("id", profile.studio_id).single()
    : { data: null };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Abbonamento</h1>

      {searchParams.success && (
        <p className="rounded-md border border-primary bg-primary/10 p-3 text-sm">
          Pagamento completato. L&apos;aggiornamento del piano può richiedere qualche istante.
        </p>
      )}
      {searchParams.canceled && (
        <p className="rounded-md border border-border bg-secondary p-3 text-sm text-muted-foreground">
          Operazione annullata. Nessun addebito effettuato.
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Piano attuale</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Badge>{PLAN_LABELS[studio?.plan ?? "trial"]}</Badge>
          <Badge variant="outline">{STATUS_LABELS[studio?.plan_status ?? "trial"]}</Badge>
          {studio?.addon_presenza_online && <Badge variant="secondary">Presenza Online attiva</Badge>}
          {studio?.stripe_customer_id && (
            <div className="ml-auto">
              <PortalButton />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Studio Automatizzato</CardTitle>
            <CardDescription>
              1 490 € una tantum + 149 €/mese — appuntamenti, solleciti, assistente email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutButton
              kind="studio_automatizzato"
              label="Passa a questo piano"
              disabled={studio?.plan === "studio_automatizzato" && studio?.plan_status === "active"}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Studio 360</CardTitle>
            <CardDescription>
              2 490 € una tantum + 249 €/mese — tutto Studio Automatizzato + CRM leggero +
              ottimizzazione continua
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutButton
              kind="studio_360"
              label="Passa a questo piano"
              disabled={studio?.plan === "studio_360" && studio?.plan_status === "active"}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add-on: Presenza Online</CardTitle>
          <CardDescription>
            900 € una tantum + 49 €/mese — sito vetrina e pubblicazione sui social. Incluso in
            Studio 360.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CheckoutButton
            kind="addon_presenza_online"
            label={studio?.addon_presenza_online ? "Add-on attivo" : "Attiva add-on"}
            disabled={studio?.addon_presenza_online ?? false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
