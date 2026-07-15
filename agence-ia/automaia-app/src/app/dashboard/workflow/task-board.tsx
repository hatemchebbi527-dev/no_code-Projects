"use client";

import { useEffect, useState } from "react";
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import { KanbanColumn } from "@/components/kanban/column";
import { DraggableCard } from "@/components/kanban/draggable-card";
import { Button } from "@/components/ui/button";
import type { Task, TaskStatus } from "@/lib/supabase/types";

import { deleteTask, updateTaskStatus } from "./actions";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "da_fare", label: "Da fare" },
  { id: "in_corso", label: "In corso" },
  { id: "completata", label: "Completata" },
];

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [items, setItems] = useState(tasks);

  useEffect(() => setItems(tasks), [tasks]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = over.id as TaskStatus;
    const task = items.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    setItems((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    updateTaskStatus(taskId, newStatus);
  }

  function handleDelete(taskId: string) {
    setItems((prev) => prev.filter((t) => t.id !== taskId));
    deleteTask(taskId);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((column) => (
          <KanbanColumn key={column.id} id={column.id} label={column.label}>
            {items
              .filter((task) => task.status === column.id)
              .map((task) => (
                <DraggableCard key={task.id} id={task.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="break-words font-medium">{task.title}</p>
                      {task.description && (
                        <p className="mt-1 break-words text-xs text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                      {task.due_date && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Scadenza: {new Date(task.due_date).toLocaleDateString("it-IT")}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => handleDelete(task.id)}
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
