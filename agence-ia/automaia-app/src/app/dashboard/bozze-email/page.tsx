import { getOrCreateWebhookToken } from "./actions";
import { DraftsList } from "./drafts-list";
import { InboundEmailCard } from "./inbound-email-card";
import { QuickTestForm } from "./quick-test-form";
import { WebhookTokenCard } from "./webhook-token-card";
import { createClient } from "@/lib/supabase/server";

export default async function BozzeEmailPage() {
  const supabase = createClient();

  const [token, { data: drafts }] = await Promise.all([
    getOrCreateWebhookToken(),
    supabase.from("email_drafts").select("*").order("created_at", { ascending: false }),
  ]);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const webhookUrl = `${appUrl}/api/webhooks/n8n/email-draft?token=${token ?? ""}`;
  const inboundDomain = process.env.INBOUND_EMAIL_DOMAIN ?? "in.automa-ia.net";
  const inboundEmailAddress = `${token ?? ""}@${inboundDomain}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bozze email da validare</h1>
      <InboundEmailCard inboundEmailAddress={inboundEmailAddress} />
      <WebhookTokenCard webhookUrl={webhookUrl} />
      <QuickTestForm />
      <div>
        <h2 className="mb-4 text-lg font-semibold">Bozze</h2>
        <DraftsList drafts={drafts ?? []} />
      </div>
    </div>
  );
}
