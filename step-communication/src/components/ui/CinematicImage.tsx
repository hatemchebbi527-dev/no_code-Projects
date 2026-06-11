"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { tones, type Tone } from "@/content/media";

type Props = {
  src?: string;
  alt: string;
  tone?: Tone;
  priority?: boolean;
  sizes?: string;
  className?: string;
  overlay?: boolean;
  zoom?: boolean;
};

/**
 * Image cinématographique avec base dégradée toujours présente.
 * Si la photo échoue (réseau, URL invalide), le dégradé `tone` reste:
 * le rendu demeure premium, jamais d'image cassée.
 */
export function CinematicImage({
  src,
  alt,
  tone = "slate",
  priority = false,
  sizes = "100vw",
  className,
  overlay = true,
  zoom = false,
}: Props) {
  const [ok, setOk] = useState(true);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-bg", className)}>
      {/* Base cinématographique (toujours visible) */}
      <div className="absolute inset-0" style={{ backgroundImage: tones[tone] }} />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 0%, rgb(var(--accent) / 0.14), transparent 55%)",
        }}
      />

      {src && ok && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setOk(false)}
          className={cn(
            "object-cover transition-transform duration-1000 ease-premium",
            zoom && "group-hover:scale-105"
          )}
        />
      )}

      <div className="absolute inset-0 grain" />
      {/* Velo scuro locale (indipendente dal tema): mantiene le foto come
          vignette cinematografiche leggibili anche sul sito chiaro. */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />
      )}
    </div>
  );
}
