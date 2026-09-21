"use client";

// Manuvo - image d'un metier avec fallback (icone sur degrade) si la photo manque ou ne charge pas.
import { useState } from "react";

export function CategoryImage({
  src,
  label,
  iconPath,
  grad,
}: {
  src?: string;
  label: string;
  iconPath: string;
  grad: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-linear-to-br ${grad}`}
        >
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/90 transition duration-300 group-hover:scale-110"
            dangerouslySetInnerHTML={{ __html: iconPath }}
          />
        </div>
      )}
    </div>
  );
}
