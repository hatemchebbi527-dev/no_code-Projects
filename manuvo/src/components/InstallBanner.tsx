"use client";

// Manuvo - bandeau discret invitant à installer la PWA (rétention).
// Android/Chrome : bouton d'installation natif via beforeinstallprompt.
// iOS/Safari : renvoie vers /installa (pas d'API d'installation sur iOS).
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const DISMISS_KEY = "manuvo_install_dismissed_at";
const DISMISS_DAYS = 14;

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const mm = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return Boolean(mm || iosStandalone);
}

function recentlyDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const then = Number(raw);
    if (!Number.isFinite(then)) return false;
    return Date.now() - then < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function InstallBanner() {
  const t = useTranslations("install");
  const [mode, setMode] = useState<"android" | "ios" | null>(null);
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    // Android / Chrome desktop : on capte l'événement et on propose notre bouton.
    function onBIP(e: Event) {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setMode("android");
    }
    window.addEventListener("beforeinstallprompt", onBIP);

    // iOS Safari : pas d'événement, on détecte l'appareil et on renvoie vers le guide.
    const ua = window.navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /^((?!chrome|crios|fxios|android).)*safari/i.test(ua);
    let timer: number | undefined;
    if (isIOS && isSafari) {
      // Petit délai : on ne saute pas à la figure dès l'arrivée.
      timer = window.setTimeout(() => setMode((m) => m ?? "ios"), 2500);
    }

    function onInstalled() {
      setMode(null);
      try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
    }
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setMode(null);
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
  }

  async function install() {
    if (!deferred) return;
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      /* l'utilisateur a fermé le prompt : rien à faire */
    }
    setDeferred(null);
    dismiss();
  }

  if (!mode) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-red-700 text-lg font-extrabold text-white">
          M
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">{t("title")}</p>
          <p className="mt-0.5 text-xs text-neutral-500">
            {mode === "android" ? t("text_android") : t("text_ios")}
          </p>
        </div>
        {mode === "android" ? (
          <button
            onClick={install}
            className="flex-none rounded-lg bg-red-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {t("cta_install")}
          </button>
        ) : (
          <Link
            href="/installa"
            onClick={dismiss}
            className="flex-none rounded-lg bg-red-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {t("cta_how")}
          </Link>
        )}
        <button
          onClick={dismiss}
          aria-label={t("dismiss")}
          className="flex-none rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
