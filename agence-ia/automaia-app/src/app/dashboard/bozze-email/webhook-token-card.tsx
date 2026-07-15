"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { regenerateWebhookToken } from "./actions";

export function WebhookTokenCard({ webhookUrl }: { webhookUrl: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>URL webhook n8n</CardTitle>
        <CardDescription>
          Configuri questo indirizzo come destinazione del suo flusso n8n per creare
          automaticamente le bozze email in arrivo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <code className="block overflow-x-auto rounded-md bg-secondary p-3 text-xs">
          {webhookUrl}
        </code>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(webhookUrl)}
          >
            Copia
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => regenerateWebhookToken()}>
            Rigenera token
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
