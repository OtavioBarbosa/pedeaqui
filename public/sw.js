var CACHE_NAME = 'pedeaqui_cache';

var urlsToCache = [
    '/',
    '/favicon.ico',
    '/manifest.json',
    '/offline.html',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/1.chunk.js',
    '/static/js/0.chunk.js',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/offline.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => (cacheName.startsWith('pedeaqui_cache')))
            .filter(cacheName => (cacheName !== CACHE_NAME))
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        }).catch((error) => {
            return caches.match('/offline.html');
        })
    );
});  