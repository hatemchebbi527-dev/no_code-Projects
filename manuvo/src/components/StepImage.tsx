"use client";

// Manuvo - image d'une etape "Come funziona" : photo + fallback degrade ; rien si pas d'URL.
import { useState } from "react";

export function StepImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src) return null;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
      {failed ? (
        <div className="h-full w-full bg-linear-to-br from-red-400 to-red-600" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
