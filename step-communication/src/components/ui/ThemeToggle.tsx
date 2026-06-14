"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("7sport-theme", "dark");
    } else {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("7sport-theme", "light");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      title={dark ? "Tema chiaro" : "Tema scuro"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300",
        onDark
          ? "border-white/30 text-white/90 hover:border-white/60 hover:text-white"
          : "border-line text-fg-muted hover:border-fg/30 hover:text-fg",
        className
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
