var CACHE_ACTUAL = 'cache0';
var archivos_para_cachear = [
    '/',
    '/?o=i',
    '/talks',
    '/hire-me',
    '/manifest.json',
    '/stylesheets/main.css',
    '/images/bkg.jpg',
    '/images/me.jpg',
    '/fonts/icomoon.eot',
    '/fonts/icomoon.svg',
    '/fonts/icomoon.ttf',
    '/fonts/icomoon.woff',
    '/scripts/index.js',
    '/scripts/sw_registration.js'
];
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_ACTUAL)
        .then(function (cache) {
        return cache.addAll(archivos_para_cachear).then(function () {
            console.log('Archivos cacheados');
        });
    }));
});
self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
    event.waitUntil(caches.keys().then(function (lasCachesQueExisten) {
        return Promise.all(lasCachesQueExisten.map(function (unaCache) {
            if (unaCache !== CACHE_ACTUAL) {
                return caches["delete"](unaCache).then(function () {
                    console.log('Cachés previas eliminadas');
                });
            }
        }));
    }));
});
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.open(CACHE_ACTUAL).then(function (cache) {
        if (event.request.method === 'GET') {
            return cache.match(event.request).then(function (elementoCacheado) {
                var elementoDeLaRed = fetch(event.request).then(function (respuestaDeLaRed) {
                    cache.put(event.request, respuestaDeLaRed.clone());
                    return respuestaDeLaRed;
                });
                return elementoCacheado || elementoDeLaRed;
            });
        }
    }));
});
