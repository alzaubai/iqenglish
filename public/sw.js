// ==============================================================================
// English for Iraq - Unit 1 | PWA Service Worker (Media & Offline Caching Engine)
// إعداد وإشراف مدرس المادة: أ. حسام محمود منصور
// ==============================================================================

const STATIC_CACHE = 'iqenglish-static-v2';
const MEDIA_CACHE = 'iqenglish-media-v2';
const ALL_CACHES = [STATIC_CACHE, MEDIA_CACHE];

// Install: Activate immediately without waiting
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate: Claim clients and delete older cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !ALL_CACHES.includes(name))
          .map((name) => {
            console.log('[SW] Removing deprecated cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Listen for skip waiting messages from the application
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Strategy Router
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // 1. Only handle GET requests with HTTP/HTTPS protocols
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const url = new URL(request.url);

  // 2. Direct Network Bypass for Realtime Firebase Services & APIs
  // Always fetch live so teacher lock states, exams, and attendance are 100% instant and live.
  if (
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('firebaseinstallations.googleapis.com')
  ) {
    return; // Pass through to browser default network
  }

  // 3. Media & Fonts: Cache-First with Automatic Permanent Caching
  // Audio recordings (.mp3), Illustrations (.jpg, .png, .webp, .svg), and Google Fonts
  const isMediaOrFont =
    url.pathname.includes('/audio/') ||
    url.pathname.includes('/images/') ||
    url.pathname.endsWith('.mp3') ||
    url.pathname.endsWith('.wav') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.ttf');

  if (isMediaOrFont) {
    event.respondWith(
      caches.open(MEDIA_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          // Instant local playback / render from student device storage (0 KB internet consumed)
          return cachedResponse;
        }

        try {
          // Fetch from network and silently store in media cache for future instant offline access
          const networkResponse = await fetch(request);
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // If offline and not in cache, fallback
          if (cachedResponse) return cachedResponse;
          throw err;
        }
      })
    );
    return;
  }

  // 4. Hashed Static Assets (Vite CSS, JS chunks, icons, manifest): Cache-First
  const isStaticHashedAsset =
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/icons/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('manifest.json') ||
    url.pathname.endsWith('favicon.ico');

  if (isStaticHashedAsset) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          if (cachedResponse) return cachedResponse;
          throw err;
        }
      })
    );
    return;
  }

  // 5. App Shell / HTML Navigation: Network-First with Cache Fallback
  // Checks for the latest version online; if student is offline, immediately serves cached index.html
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match('/iqenglish/index.html').then((indexCached) => {
              return indexCached || caches.match('/iqenglish/');
            });
          });
        })
    );
    return;
  }
});
