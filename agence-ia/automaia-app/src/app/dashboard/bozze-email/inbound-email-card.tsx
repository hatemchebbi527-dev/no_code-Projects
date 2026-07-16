"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function InboundEmailCard({ inboundEmailAddress }: { inboundEmailAddress: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indirizzo di inoltro automatico</CardTitle>
        <CardDescription>
          Nelle impostazioni della Sua casella di posta (Gmail, Outlook...), configuri un inoltro
          automatico verso questo indirizzo. Ogni email inoltrata genererà automaticamente una
          bozza di risposta qui sotto — senza dover autorizzare l&apos;accesso al Suo account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <code className="block overflow-x-auto rounded-md bg-secondary p-3 text-xs">
          {inboundEmailAddress}
        </code>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(inboundEmailAddress)}
        >
          Copia
        </Button>
      </CardContent>
    </Card>
  );
}
