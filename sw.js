// ==============================================================================
// English for Iraq - Unit 1 | PWA Service Worker (Media Audio/Images Cache Only)
// إعداد وإشراف مدرس المادة: أ. حسام محمود منصور
// ==============================================================================

const MEDIA_CACHE = 'iqenglish-media-v3';

// Immediate activation
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Clean up any old static or document caches so navigation is 100% native
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== MEDIA_CACHE) {
            console.log('[SW] Purging deprecated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. NEVER intercept Realtime Firebase, APIs, or Google services
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('google-analytics.com')
  ) {
    return;
  }

  // 2. NEVER intercept Document Navigation, HTML, JS scripts, or CSS styles!
  // Always let the browser load HTML, JS, and CSS natively with zero risk of blank screens!
  if (
    request.mode === 'navigate' ||
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  ) {
    return;
  }

  // 3. ONLY intercept Media Assets (Audio recordings & Lesson Illustrations)
  const isMedia =
    url.pathname.includes('/iqenglish/audio/') ||
    url.pathname.includes('/iqenglish/images/') ||
    url.pathname.endsWith('.mp3') ||
    url.pathname.endsWith('.wav') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg');

  if (isMedia) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(MEDIA_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        }).catch(() => {
          return cachedResponse || new Response('', { status: 404 });
        });
      })
    );
  }
});
