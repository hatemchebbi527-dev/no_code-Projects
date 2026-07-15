"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { CheckoutKind } from "@/lib/stripe";

import { createCheckoutSession } from "./actions";

export function CheckoutButton({
  kind,
  label,
  disabled,
}: {
  kind: CheckoutKind;
  label: string;
  disabled?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createCheckoutSession(kind);
      if (result?.error) {
        setError(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleClick} disabled={disabled || isLoading} className="w-full">
        {isLoading ? "Reindirizzamento..." : label}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
