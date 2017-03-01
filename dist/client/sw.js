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
    event.respondWith(caches.match(event.request)
        .then(function (respuestaEnCache) {
        var laSolicitud = event.request.clone();
        if (respuestaEnCache || !(/(google-analytics.com)|(fonts.googleapis.com)/gi).test(laSolicitud.url)) {
            return respuestaEnCache;
        }
        return fetch(laSolicitud).then(function (respuestaDeLaRed) {
            if (!respuestaDeLaRed || respuestaDeLaRed.status !== 200 || respuestaDeLaRed.type !== 'basic') {
                return respuestaDeLaRed;
            }
            var respuestaDeLaRedParaCachear = respuestaDeLaRed.clone();
            caches.open(CACHE_ACTUAL)
                .then(function (cache) {
                cache.put(event.request, respuestaDeLaRedParaCachear);
            });
            return respuestaDeLaRed;
        });
    }));
});
