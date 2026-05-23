const CACHE = 'guardian-x5-v2';
const ASSETS = [
  '/guardian-x5/',
  '/guardian-x5/index.html',
  '/guardian-x5/manifest.json',
  '/guardian-x5/icon-192.png',
  '/guardian-x5/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
