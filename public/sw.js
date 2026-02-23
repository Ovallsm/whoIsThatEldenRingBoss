self.addEventListener("install", (e) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});
