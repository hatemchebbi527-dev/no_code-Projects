// Manuvo - logo orizzontale (marchio esagonale + wordmark MANUVO) per gli header.
// Servito da /public/logo-horizontal.svg. Il marchio quadrato (LogoMark) resta per favicon/PWA.
import Image from "next/image";

export function LogoWordmark({
  className = "h-7 w-auto",
}: {
  className?: string;
}) {
  return (
    <Image
      src="/logo-horizontal.svg"
      alt="Manuvo"
      width={241}
      height={100}
      priority
      className={className}
    />
  );
}
