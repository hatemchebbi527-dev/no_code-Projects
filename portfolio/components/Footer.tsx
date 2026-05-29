import { profile } from "@/app/data";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Realizzato con Next.js & Tailwind</span>
      </div>
    </footer>
  );
}
