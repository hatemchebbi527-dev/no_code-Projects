// Manuvo - service worker (network-first + Web Push).
const CACHE = "manuvo-v3";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.add(OFFLINE_URL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Navigazioni: rete, fallback pagina offline.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  // Altre risorse GET: rete, fallback eventuale cache.
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

// Web Push: mostra la notifica ricevuta.
self.addEventListener("push", (event) => {
  let data = { title: "Manuvo", body: "", url: "/dashboard/notifiche" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    if (event.data) data.body = event.data.text();
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      // Suono/segnale di sistema attivo (non silenzioso) + vibrazione su mobile.
      silent: false,
      vibrate: [200, 100, 200],
      // Tag fisso + renotify: ogni nuova richiesta avvisa di nuovo (suono/vibrazione) senza accumulare.
      tag: "manuvo-richiesta",
      renotify: true,
      // Resta visibile finche l'utente non interagisce (utile su desktop).
      requireInteraction: true,
      timestamp: Date.now(),
      data: { url: data.url || "/dashboard/notifiche" },
    }),
  );
});

// Clic sulla notifica: apre/mette a fuoco l'app sulla pagina indicata.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/dashboard/notifiche";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    }),
  );
});
