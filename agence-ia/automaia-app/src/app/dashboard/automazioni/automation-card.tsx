"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Automation } from "@/lib/supabase/types";

import { testAutomationConnection, toggleAutomationActive, updateAutomationUrl } from "./actions";

const LABELS: Record<string, string> = {
  appuntamenti: "Appuntamenti",
  solleciti: "Solleciti",
  faq: "FAQ",
  pubblicazione_social: "Pubblicazione social",
  modulo_contatto: "Modulo di contatto",
};

export function AutomationCard({ automation }: { automation: Automation }) {
  const [url, setUrl] = useState(automation.n8n_webhook_url ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    try {
      await updateAutomationUrl(automation.id, url);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggle() {
    setIsToggling(true);
    try {
      await toggleAutomationActive(automation.id, !automation.is_active);
    } finally {
      setIsToggling(false);
    }
  }

  async function handleTest() {
    setIsTesting(true);
    try {
      await testAutomationConnection(automation.id);
    } finally {
      setIsTesting(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{LABELS[automation.type] ?? automation.type}</CardTitle>
        <Badge variant={automation.is_active ? "default" : "outline"}>
          {automation.is_active ? "Attivo" : "Inattivo"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://n8n.example.com/webhook/..."
        />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvataggio..." : "Salva URL"}
          </Button>
          <Button size="sm" variant="outline" onClick={handleToggle} disabled={isToggling}>
            {automation.is_active ? "Disattiva" : "Attiva"}
          </Button>
          <Button size="sm" onClick={handleTest} disabled={isTesting}>
            {isTesting ? "Verifica in corso..." : "Prova connessione"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
