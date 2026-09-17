// Manuvo - marchio (logo esagonale "H") riutilizzabile, servito da /public/logo-mark.svg.
import Image from "next/image";

export function LogoMark({
  className = "",
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/logo-mark.svg"
      alt="Manuvo"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
