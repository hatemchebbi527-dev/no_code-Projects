"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmailDraft } from "@/lib/supabase/types";

import { updateDraftStatus } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  pending: "Da validare",
  validated: "Validata",
  sent: "Inviata",
};

export function DraftsList({ drafts }: { drafts: EmailDraft[] }) {
  if (drafts.length === 0) {
    return <p className="text-sm text-muted-foreground">Nessuna bozza per ora.</p>;
  }

  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <Card key={draft.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{draft.subject || "Senza oggetto"}</CardTitle>
            <Badge>{STATUS_LABELS[draft.status] ?? draft.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {draft.received_email && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Email ricevuta</p>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {draft.received_email}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-muted-foreground">Bozza generata</p>
              <p className="whitespace-pre-wrap text-sm">{draft.generated_draft}</p>
            </div>
            <div className="flex gap-2">
              {draft.status === "pending" && (
                <Button size="sm" onClick={() => updateDraftStatus(draft.id, "validated")}>
                  Convalida
                </Button>
              )}
              {draft.status === "validated" && (
                <Button size="sm" onClick={() => updateDraftStatus(draft.id, "sent")}>
                  Segna come inviata
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
