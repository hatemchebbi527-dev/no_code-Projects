// Manuvo - layout delle pagine legali.
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1b1e24]">
      <header className="border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-700 font-display font-extrabold text-white">
              M
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">Manuvo</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-10">{children}</main>
    </div>
  );
}
