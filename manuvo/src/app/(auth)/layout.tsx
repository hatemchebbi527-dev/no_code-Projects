// Manuvo - layout des pages d'authentification (centrees, avec logo).
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoMark } from "@/components/LogoMark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FAF8F4] px-4 py-10">
      <div className="absolute end-4 top-4">
        <LanguageSwitcher />
      </div>
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <LogoMark className="h-9 w-9" />
        <span className="text-xl font-extrabold tracking-tight">Manuvo</span>
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
        {children}
      </div>
    </div>
  );
}
