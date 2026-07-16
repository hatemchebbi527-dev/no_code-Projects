"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem } from "@/lib/supabase/types";

import { updateContentStatus } from "./actions";

const STATUS_LABELS: Record<string, string> = {
  draft: "Bozza",
  approved: "Approvato",
  published: "Pubblicato",
};

export function ContentLibrary({ items }: { items: ContentItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nessun contenuto generato per ora.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">{item.topic}</CardTitle>
            <Badge>{STATUS_LABELS[item.status] ?? item.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">{item.body}</p>
            <div className="flex gap-2">
              {item.status === "draft" && (
                <Button size="sm" onClick={() => updateContentStatus(item.id, "approved")}>
                  Approva
                </Button>
              )}
              {item.status === "approved" && (
                <Button size="sm" onClick={() => updateContentStatus(item.id, "published")}>
                  Segna come pubblicato
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
