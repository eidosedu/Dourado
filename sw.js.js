const CACHE_NAME = 'eidos-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Instalação: Baixa os arquivos na primeira vez
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptação: Serve do cache se estiver sem internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se achou no cache, retorna. Se não, tenta a rede.
        return response || fetch(event.request);
      })
  );
});