"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Sulla home l'header trasparente è sopra l'hero scuro a tutta pagina:
  // i link devono restare chiari finché non si scrolla. Sulle pagine interne
  // (sfondo chiaro) e dopo lo scroll si usa il colore adattivo del tema.
  const onDarkHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blocca lo scroll del body quando il menu mobile è aperto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
        scrolled
          ? "border-b border-line/80 bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Velo scuro in cima alla home: garantisce la leggibilità degli elementi
          chiari dell'header sopra le zone chiare della foto (es. tetto bianco
          dello stadio), in entrambi i temi. */}
      {onDarkHero && !open && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/30 to-transparent"
        />
      )}
      <div className="container-wide relative z-10 flex h-[72px] items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="group flex items-center"
          onClick={() => setOpen(false)}
        >
          <Logo
            onDark={onDarkHero && !open}
            className="transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                onDarkHero
                  ? "text-white/85 hover:text-white"
                  : "text-fg-muted hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle onDark={onDarkHero && !open} />
          <Link
            href="/contatti"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Richiedi una consulenza
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Toggle mobile */}
          <button
            type="button"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
              onDarkHero && !open
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-line text-fg hover:bg-fg/5"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Overlay mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-wide flex flex-col gap-1 py-8">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-5 text-2xl font-display font-medium text-fg"
                  >
                    {item.label}
                    <ArrowUpRight className="h-5 w-5 text-fg-muted" />
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contatti"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
              >
                Richiedi una consulenza
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
