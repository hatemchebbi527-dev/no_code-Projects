"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { createPortalSession } from "./actions";

export function PortalButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createPortalSession();
      if (result?.error) {
        setError(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Reindirizzamento..." : "Gestisci abbonamento"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
