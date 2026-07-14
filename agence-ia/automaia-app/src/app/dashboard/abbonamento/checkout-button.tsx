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

  async function handleClick() {
    setIsLoading(true);
    try {
      await createCheckoutSession(kind);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={handleClick} disabled={disabled || isLoading} className="w-full">
      {isLoading ? "Reindirizzamento..." : label}
    </Button>
  );
}
