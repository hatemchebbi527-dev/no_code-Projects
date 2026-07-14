"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { generateEmailDraftTest } from "./actions";

export function QuickTestForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsGenerating(true);
    const formData = new FormData(e.currentTarget);
    try {
      await generateEmailDraftTest(formData);
      formRef.current?.reset();
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prova rapida</CardTitle>
        <CardDescription>
          Incolli il testo di un&apos;email ricevuta per testare la generazione di una bozza,
          senza passare da n8n.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receivedEmail">Email ricevuta</Label>
            <Textarea
              id="receivedEmail"
              name="receivedEmail"
              required
              rows={6}
              placeholder="Incolli qui il testo dell'email del cliente..."
            />
          </div>
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Generazione in corso..." : "Genera bozza"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
