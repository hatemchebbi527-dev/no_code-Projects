"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TaskRecurrence, TaskTemplate } from "@/lib/supabase/types";

import { createTaskFromTemplate, createTaskTemplate, deleteTaskTemplate } from "./actions";

const RECURRENCE_LABELS: Record<TaskRecurrence, string> = {
  none: "Nessuna",
  monthly: "Mensile",
  quarterly: "Trimestrale",
  yearly: "Annuale",
};

export function TemplatesPanel({ templates }: { templates: TaskTemplate[] }) {
  const [open, setOpen] = useState(false);
  const [recurrence, setRecurrence] = useState<TaskRecurrence>("none");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createTaskTemplate(formData);
    setOpen(false);
    setRecurrence("none");
  }

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ Nuovo modello</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuovo modello</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titolo</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea id="description" name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recurrence">Ricorrenza</Label>
              <select
                id="recurrence"
                name="recurrence"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                {Object.entries(RECURRENCE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {recurrence !== "none" && (
              <div className="space-y-2">
                <Label htmlFor="nextDueDate">Prima scadenza</Label>
                <Input id="nextDueDate" name="nextDueDate" type="date" required />
              </div>
            )}
            <Button type="submit" className="w-full">
              Crea modello
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle className="text-base">{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {template.description && (
                <p className="text-sm text-muted-foreground">{template.description}</p>
              )}
              {template.recurrence !== "none" && (
                <p className="text-xs text-muted-foreground">
                  Ricorrenza: {RECURRENCE_LABELS[template.recurrence]} — prossima:{" "}
                  {template.next_due_date
                    ? new Date(template.next_due_date).toLocaleDateString("it-IT")
                    : "—"}
                </p>
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => createTaskFromTemplate(template.id)}>
                  Usa questo modello
                </Button>
                <Button size="sm" variant="outline" onClick={() => deleteTaskTemplate(template.id)}>
                  Elimina
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {templates.length === 0 && (
          <p className="text-sm text-muted-foreground">Nessun modello creato.</p>
        )}
      </div>
    </div>
  );
}
