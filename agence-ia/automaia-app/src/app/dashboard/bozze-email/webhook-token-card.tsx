"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { regenerateWebhookToken } from "./actions";

export function WebhookTokenCard({ webhookUrl }: { webhookUrl: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>URL webhook n8n (avanzato)</CardTitle>
        <CardDescription>
          In alternativa all&apos;inoltro automatico, può collegare un flusso n8n che sorveglia la
          Sua casella e invia ogni email a questo indirizzo.
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
