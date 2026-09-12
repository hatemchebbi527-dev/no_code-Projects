"use client";

// Manuvo - guida all'installazione della PWA, adattata al dispositivo.
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const mm = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return Boolean(mm || iosStandalone);
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-red-700 text-xs font-bold text-white">
        {n}
      </span>
      <span className="text-sm text-neutral-700">{children}</span>
    </li>
  );
}

export function InstallGuide() {
  const t = useTranslations("installa");
  const [env, setEnv] = useState<{ platform: Platform; installed: boolean }>({
    platform: "desktop",
    installed: false,
  });
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const platform = env.platform;
  const installed = env.installed;

  useEffect(() => {
    // Rilevamento lato client dopo il mount (server e primo render restano coerenti).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnv({ platform: detectPlatform(), installed: isStandalone() });
    function onBIP(e: Event) {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    }
    function onInstalled() {
      setEnv((prev) => ({ ...prev, installed: true }));
    }
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!deferred) return;
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      /* prompt chiuso */
    }
    setDeferred(null);
  }

  const cardBase = "rounded-2xl border bg-white p-5 shadow-sm";
  const active = "border-red-300 ring-2 ring-red-600/15";
  const idle = "border-neutral-200";

  return (
    <div className="flex flex-col gap-5">
      {installed && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
          <p className="text-lg font-bold text-green-900">{t("installed")}</p>
          <Link href="/" className="mt-3 inline-block font-semibold text-red-700 hover:underline">
            {t("back")}
          </Link>
        </div>
      )}

      {/* Benefici */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {["b1", "b2", "b3"].map((k) => (
          <div key={k} className="rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-sm font-medium text-neutral-700">{t(`benefits.${k}`)}</p>
          </div>
        ))}
      </div>

      {/* iOS */}
      <div className={`${cardBase} ${platform === "ios" ? active : idle}`}>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{t("ios_title")}</h2>
          {platform === "ios" && (
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">{t("detected")}</span>
          )}
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          <Step n={1}>{t("ios_s1")}</Step>
          <Step n={2}>{t("ios_s2")}</Step>
          <Step n={3}>{t("ios_s3")}</Step>
        </ol>
      </div>

      {/* Android */}
      <div className={`${cardBase} ${platform === "android" ? active : idle}`}>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{t("android_title")}</h2>
          {platform === "android" && (
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">{t("detected")}</span>
          )}
        </div>
        {deferred ? (
          <div className="mt-4">
            <p className="text-sm text-neutral-600">{t("android_auto")}</p>
            <button
              onClick={install}
              className="mt-3 w-full rounded-lg bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              {t("cta_install")}
            </button>
          </div>
        ) : (
          <ol className="mt-4 flex flex-col gap-3">
            <Step n={1}>{t("android_s1")}</Step>
            <Step n={2}>{t("android_s2")}</Step>
            <Step n={3}>{t("android_s3")}</Step>
          </ol>
        )}
      </div>

      {/* Desktop */}
      <div className={`${cardBase} ${platform === "desktop" ? active : idle}`}>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{t("desktop_title")}</h2>
          {platform === "desktop" && (
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">{t("detected")}</span>
          )}
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          <Step n={1}>{t("desktop_s1")}</Step>
        </ol>
      </div>
    </div>
  );
}
