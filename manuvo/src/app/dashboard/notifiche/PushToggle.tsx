"use client";

// Manuvo - attivazione/disattivazione delle notifiche push del dispositivo.
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { savePushSubscription, removePushSubscription } from "./actions";

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

type Status = "loading" | "unsupported" | "denied" | "off" | "on";

export function PushToggle() {
  const t = useTranslations("notifiche");
  const [status, setStatus] = useState<Status>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window &&
      VAPID_PUBLIC.length > 0;
    if (!supported) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setStatus(sub ? "on" : "off"))
      .catch(() => setStatus("off"));
  }, []);

  async function enable() {
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "off");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC) as BufferSource,
      });
      const json = sub.toJSON() as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
      const res = await savePushSubscription({
        endpoint: json.endpoint ?? "",
        keys: { p256dh: json.keys?.p256dh ?? "", auth: json.keys?.auth ?? "" },
      });
      setStatus(res.ok ? "on" : "off");
    } catch {
      setStatus("off");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await removePushSubscription(sub.endpoint);
        await sub.unsubscribe();
      }
      setStatus("off");
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  if (status === "loading") return null;

  const box = "rounded-2xl border border-neutral-200 bg-white p-5";

  if (status === "unsupported") {
    return <div className={box}><p className="text-sm text-neutral-500">{t("unsupported")}</p></div>;
  }
  if (status === "denied") {
    return (
      <div className={box}>
        <p className="text-sm font-medium">{t("push_title")}</p>
        <p className="mt-1 text-sm text-neutral-500">{t("denied")}</p>
      </div>
    );
  }

  return (
    <div className={`${box} flex items-center justify-between gap-4`}>
      <div>
        <p className="text-sm font-medium">{t("push_title")}</p>
        <p className="mt-1 text-sm text-neutral-500">
          {status === "on" ? t("push_on_desc") : t("push_off_desc")}
        </p>
      </div>
      {status === "on" ? (
        <button
          onClick={disable}
          disabled={busy}
          className="shrink-0 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold hover:bg-neutral-100 disabled:opacity-60"
        >
          {t("disable")}
        </button>
      ) : (
        <button
          onClick={enable}
          disabled={busy}
          className="shrink-0 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {t("enable")}
        </button>
      )}
    </div>
  );
}
