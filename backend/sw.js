self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('hodlinfo-cache').then(cache => {
            console.log('Opened cache');
            const urlsToCache = [
                '/',
                '/views/index.html',
                '/css/styles.css',
                '/js/script.js',
                '/images/icons/hodlinfo.png',
                '/images/icons/telegram-logo.png',
                'images/icons/holdinfo-txt.png',
                '/views/telegram.html'
            ];

            const cachePromises = urlsToCache.map(url => {
                return fetch(url).then(response => {
                    if (!response.ok) {
                       throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
                    }
                    return cache.put(url, response);
                }).catch(error => {
                    console.error('Caching failed for:', url, error);
                });
            });

            return Promise.all(cachePromises).then(() => {
                console.log('All resources cached successfully');
            });
        }).catch(error => {
            console.error('Cache opening failed:', error);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log('Serving from cache:', event.request.url);
                return response;
            }
            console.log('Fetching from network:', event.request.url);
            return fetch(event.request).catch(error => {
                console.error('Fetch failed:', event.request.url, error);
                // Optionally, return a fallback response here
            });
        })
    );
});
