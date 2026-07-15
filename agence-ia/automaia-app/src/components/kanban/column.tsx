"use client";

import { useDroppable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

export function KanbanColumn({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[240px] flex-col gap-2 rounded-lg border border-border bg-card/50 p-3",
        isOver && "border-primary"
      )}
    >
      <h3 className="mb-1 text-sm font-semibold text-muted-foreground">{label}</h3>
      {children}
    </div>
  );
}
