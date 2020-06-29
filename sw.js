"use strict";

const staticCacheName = "site-static-v1.0.0";
const assets = [
  "/",
  "/index.html",
  "/assets/js/script.js",
  "/assets/js/materialize.min.js",
  "/assets/css/style.css",
  "/assets/css/materialize.min.css",
  "/assets/css/icons.css",
  "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  //console.log("service worker has been activated");
});

self.addEventListener("fetch", (event) => {
  //console.log('fetch event', event);

  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
