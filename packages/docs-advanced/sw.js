// Nostromo UI Advanced Documentation - Service Worker

const CACHE_NAME = 'nostromo-docs-v1';
const STATIC_CACHE = 'nostromo-static-v1';
const DYNAMIC_CACHE = 'nostromo-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/assets/css/critical.css',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/lazy-loading.js',
  '/assets/js/performance.js',
  '/assets/js/caching.js',
  '/assets/images/favicon.svg'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Try cache first for static files
  if (isStaticFile(url.pathname)) {
    const cachedResponse = await getFromCache(request, STATIC_CACHE);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  // Try network
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      await cacheResponse(request, networkResponse);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    // Fallback to cache
    const cachedResponse = await getFromCache(request, DYNAMIC_CACHE);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return getOfflinePage();
    }
    
    throw error;
  }
}

function isStaticFile(pathname) {
  return pathname.endsWith('.css') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.svg') ||
         pathname.endsWith('.png') ||
         pathname.endsWith('.jpg') ||
         pathname.endsWith('.jpeg') ||
         pathname.endsWith('.gif') ||
         pathname.endsWith('.webp') ||
         pathname === '/' ||
         pathname === '/index.html';
}

async function getFromCache(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    return await cache.match(request);
  } catch (error) {
    console.error('Failed to get from cache:', error);
    return null;
  }
}

async function cacheResponse(request, response) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response.clone());
  } catch (error) {
    console.error('Failed to cache response:', error);
  }
}

async function getOfflinePage() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const response = await cache.match('/offline.html');
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Failed to get offline page:', error);
  }
  
  // Return a basic offline page
  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Nostromo UI</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: #f8fafc;
          color: #1f2937;
        }
        .offline-container {
          text-align: center;
          max-width: 400px;
          padding: 2rem;
        }
        .offline-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        .offline-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .offline-message {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        .retry-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .retry-button:hover {
          background: #5a6fd8;
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">📡</div>
        <h1 class="offline-title">You're offline</h1>
        <p class="offline-message">
          It looks like you're not connected to the internet. 
          Please check your connection and try again.
        </p>
        <button class="retry-button" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
    </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Performing background sync...');
  // Implement background sync logic here
}

// Push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/images/favicon.svg',
      badge: '/assets/images/favicon.svg',
      tag: 'nostromo-docs',
      requireInteraction: true
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handling
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker loaded');
