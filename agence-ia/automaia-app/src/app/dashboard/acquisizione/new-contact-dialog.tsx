"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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

import { createContact } from "./actions";

export function NewContactDialog() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createContact(formData);
    formRef.current?.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nuovo contatto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuovo contatto</DialogTitle>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome e cognome</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefono</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <Button type="submit" className="w-full">
            Crea contatto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
