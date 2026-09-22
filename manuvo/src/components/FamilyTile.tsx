"use client";

// Manuvo - tuile d'une famille (landing) : photo + overlay, sinon fallback icone sur degrade.
import { useState } from "react";

export function FamilyTile({
  src,
  label,
  meta,
  grad,
  iconPath,
}: {
  src?: string;
  label: string;
  meta: string;
  grad: string;
  iconPath: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className="relative flex min-h-[150px] flex-col justify-end overflow-hidden rounded-2xl shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
      {showPhoto ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-linear-to-br ${grad}`}>
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-4 top-4 text-white/90 transition group-hover:scale-110"
            dangerouslySetInnerHTML={{ __html: iconPath }}
          />
        </div>
      )}
      <div className="relative p-4 text-white">
        <div className="font-display text-base font-bold leading-tight drop-shadow-sm">{label}</div>
        <div className="mt-0.5 text-xs text-white/85">{meta}</div>
      </div>
    </div>
  );
}
