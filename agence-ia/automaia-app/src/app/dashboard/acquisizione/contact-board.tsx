"use client";

import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import { KanbanColumn } from "@/components/kanban/column";
import { DraggableCard } from "@/components/kanban/draggable-card";
import { Button } from "@/components/ui/button";
import type { Contact, ContactStage } from "@/lib/supabase/types";

import { deleteContact, updateContactStage } from "./actions";

const COLUMNS: { id: ContactStage; label: string }[] = [
  { id: "contatto", label: "Contatto" },
  { id: "contattato", label: "Contattato" },
  { id: "proposta", label: "Proposta" },
  { id: "cliente", label: "Cliente" },
];

export function ContactBoard({ contacts }: { contacts: Contact[] }) {
  const [items, setItems] = useState(contacts);

  useEffect(() => setItems(contacts), [contacts]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const contactId = String(active.id);
    const newStage = over.id as ContactStage;
    const contact = items.find((c) => c.id === contactId);
    if (!contact || contact.stage === newStage) return;

    setItems((prev) => prev.map((c) => (c.id === contactId ? { ...c, stage: newStage } : c)));
    updateContactStage(contactId, newStage);
  }

  function handleDelete(contactId: string) {
    setItems((prev) => prev.filter((c) => c.id !== contactId));
    deleteContact(contactId);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 md:grid-cols-4">
        {COLUMNS.map((column) => (
          <KanbanColumn key={column.id} id={column.id} label={column.label}>
            {items
              .filter((contact) => contact.stage === column.id)
              .map((contact) => (
                <DraggableCard key={contact.id} id={contact.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="break-words font-medium">{contact.full_name}</p>
                      {contact.email && (
                        <p className="mt-1 break-words text-xs text-muted-foreground">
                          {contact.email}
                        </p>
                      )}
                      {contact.phone && (
                        <p className="break-words text-xs text-muted-foreground">
                          {contact.phone}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => handleDelete(contact.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </DraggableCard>
              ))}
          </KanbanColumn>
        ))}
      </div>
    </DndContext>
  );
}
