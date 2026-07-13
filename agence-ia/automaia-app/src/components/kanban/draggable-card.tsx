"use client";

import { useDraggable } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function DraggableCard({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab select-none p-3 text-sm active:cursor-grabbing",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      {children}
    </Card>
  );
}
