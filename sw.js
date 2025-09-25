// Enhanced Service Worker for CxE Americas Step Tracker
const CACHE_NAME = 'step-tracker-v2'; // Updated version for new optimizations
const STATIC_CACHE = 'step-tracker-static-v2';
const DYNAMIC_CACHE = 'step-tracker-dynamic-v2';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/favicon.svg',
    '/manifest.json'
];

// External resources to cache with strategies
const EXTERNAL_RESOURCES = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Cache strategies
const CACHE_STRATEGIES = {
    'cache-first': ['fonts.googleapis.com', 'cdnjs.cloudflare.com'],
    'network-first': ['api.open-meteo.com'],
    'stale-while-revalidate': ['/']
};

// Install event - enhanced caching strategy
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache critical resources immediately
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Caching critical resources...');
                return cache.addAll(CRITICAL_RESOURCES);
            }),
            
            // Cache external resources with error handling
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('Caching external resources...');
                return Promise.allSettled(
                    EXTERNAL_RESOURCES.map(url => 
                        cache.add(url).catch(error => {
                            console.warn(`Failed to cache ${url}:`, error);
                        })
                    )
                );
            })
        ]).then(() => {
            console.log('Service Worker installation complete');
            // Skip waiting to activate immediately
            self.skipWaiting();
        }).catch(error => {
            console.error('Service Worker installation failed:', error);
        })
    );
});

// Fetch event - enhanced caching strategies
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    event.respondWith(
        handleRequest(request, url)
    );
});

async function handleRequest(request, url) {
    try {
        // Determine cache strategy based on URL
        const strategy = getCacheStrategy(url.hostname);
        
        switch (strategy) {
            case 'cache-first':
                return await cacheFirst(request);
            case 'network-first':
                return await networkFirst(request);
            case 'stale-while-revalidate':
                return await staleWhileRevalidate(request);
            default:
                return await cacheFirst(request);
        }
    } catch (error) {
        console.error('Fetch handler error:', error);
        return await handleFallback(request);
    }
}

function getCacheStrategy(hostname) {
    for (const [strategy, hosts] of Object.entries(CACHE_STRATEGIES)) {
        if (hosts.some(host => hostname.includes(host))) {
            return strategy;
        }
    }
    return 'cache-first';
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return await handleFallback(request);
    }
}

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return await handleFallback(request);
    }
}

async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    // Fetch in background to update cache
    const fetchPromise = fetch(request).then(response => {
        if (response.ok) {
            const cache = caches.open(DYNAMIC_CACHE);
            cache.then(c => c.put(request, response.clone()));
        }
        return response;
    }).catch(error => {
        console.warn('Background fetch failed:', error);
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Otherwise wait for network
    return await fetchPromise || handleFallback(request);
}

async function handleFallback(request) {
    // Return offline page for navigation requests
    if (request.destination === 'document') {
        const offlineResponse = await caches.match('/index.html');
        return offlineResponse || new Response('Offline - Please check your connection', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
    
    // Return empty response for other requests
    return new Response('', { status: 204 });
}

// Activate event - enhanced cache management
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all clients immediately
            self.clients.claim()
        ]).then(() => {
            console.log('Service Worker activated and ready');
        })
    );
});

// Background sync for data persistence (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'step-data-sync') {
        event.waitUntil(syncStepData());
    }
});

async function syncStepData() {
    // This would sync with a backend if available
    // For now, just log that sync was triggered
    console.log('Background sync triggered for step data');
}

// Push notifications (for future enhancement)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const options = {
        body: event.data.text(),
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        vibrate: [200, 100, 200],
        tag: 'step-tracker',
        actions: [
            {
                action: 'view',
                title: 'View App',
                icon: '/favicon.svg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Step Tracker', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view' || !event.action) {
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                // Focus existing window if available
                const existingClient = clients.find(client => 
                    client.url.includes(self.location.origin) && 'focus' in client
                );
                
                if (existingClient) {
                    return existingClient.focus();
                } else {
                    // Open new window
                    return self.clients.openWindow('/');
                }
            })
        );
    }
});
