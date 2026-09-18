// Manuvo - layout des pages d'authentification (centrees, avec logo).
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoWordmark } from "@/components/LogoWordmark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 py-10">
      <div className="absolute end-4 top-4">
        <LanguageSwitcher />
      </div>
      <Link href="/" className="mb-8 flex items-center">
        <LogoWordmark className="h-9 w-auto" />
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
        {children}
      </div>
    </div>
  );
}
