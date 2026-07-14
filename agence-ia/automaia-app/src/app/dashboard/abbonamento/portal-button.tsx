"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { createPortalSession } from "./actions";

export function PortalButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      await createPortalSession();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Reindirizzamento..." : "Gestisci abbonamento"}
    </Button>
  );
}
