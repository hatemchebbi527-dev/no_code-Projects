"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { generateContent } from "./actions";

export function ContentForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await generateContent(formData);
      if (result.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genera un nuovo post LinkedIn</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Argomento</Label>
            <Input
              id="topic"
              name="topic"
              required
              placeholder="Es: le scadenze fiscali di questo mese"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Generazione in corso..." : "Genera contenuto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
