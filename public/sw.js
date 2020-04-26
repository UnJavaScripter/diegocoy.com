let CACHE_ACTUAL = 'cache2';
let archivos_para_cachear = [
  './icon-512.png',
  './icon-310.png',
  './icon-192.png',

  './icon-70.png',
  './icon-150.png',
  './icon-310x150.png',

  '/',

  '/contact',
  '/talks',
  '/info',

  './assets/stylesheets/contact.css',
  './assets/stylesheets/home.css',
  './assets/stylesheets/info.css',
  './assets/stylesheets/main.css',
  './assets/stylesheets/talks.css',

  './assets/img/wtm-logo-100x100.jpg',
  './assets/img/mvp-logo-100x100.jpg',
  './assets/img/gdg-logo-100x100.jpg',
  './assets/img/gde-logo-100x100.jpg',
  './assets/img/devc-logo-100x100.jpg',
  './assets/img/angularco-logo-100x100.jpg',
  './assets/img/wtm-logo-100x100.webp',
  './assets/img/mvp-logo-100x100.webp',
  './assets/img/me-800w-100x100.webp',
  './assets/img/gdg-logo-100x100.webp',
  './assets/img/gde-logo-100x100.webp',
  './assets/img/devc-logo-100x100.webp',
  './assets/img/angularco-logo-100x100.webp',
  './assets/img/wtm-logo-200x200.webp',
  './assets/img/mvp-logo-200x200.webp',
  './assets/img/me-800w.webp',
  './assets/img/gdg-logo-200x200.webp',
  './assets/img/gde-logo-200x200.webp',
  './assets/img/devc-logo-200x200.webp',
  './assets/img/angularco-logo-200x200.webp',
  './assets/img/wtm-logo-200x200.jpg',
  './assets/img/mvp-logo-200x200.jpg',
  './assets/img/me-800w.jpg',
  './assets/img/gdg-logo-200x200.jpg',
  './assets/img/gde-logo-200x200.jpg',
  './assets/img/devc-logo-200x200.jpg',
  './assets/img/angularco-logo-200x200.jpg',

  './assets/fonts/icomoon.eot',
  './assets/fonts/icomoon.svg',
  './assets/fonts/icomoon.ttf',
  './assets/fonts/icomoon.woff',

  './index.js'
]

// Instalación del service worker y cacheo inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_ACTUAL)
      .then((cache) => {
        return cache.addAll(archivos_para_cachear).then(() => {
          console.log('Archivos cacheados');
        });
      })
      .then(_ => self.skipWaiting())
  );
});


// El service worker actual tomó control
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());

  event.waitUntil(
    caches.keys().then(lasCachesQueExisten => {

      return Promise.all(
        lasCachesQueExisten.map(unaCache => {
          if (unaCache !== CACHE_ACTUAL) {
            return caches.delete(unaCache).then(() => {
              console.log('Cachés previas eliminadas');
              self.skipWaiting();
            });
          }
        })
      );

    })
  );
});

// Interceptor de solicitudes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((respuestaEnCache) => {
        const laSolicitud = event.request.clone();

        return fetch(laSolicitud).then((respuestaDeLaRed) => {

            if(!respuestaDeLaRed
              || respuestaDeLaRed.status !== 200 
              || respuestaDeLaRed.type !== 'basic'
              || (/(google-analytics.com)|(fonts.googleapis.com)/gi).test(laSolicitud.url)
            ){
              return respuestaDeLaRed;
            }

            const respuestaDeLaRedParaCachear = respuestaDeLaRed.clone();

            caches.open(CACHE_ACTUAL)
              .then((cache) => {
                cache.put(event.request, respuestaDeLaRedParaCachear);
              });

            return respuestaDeLaRed;
          }
        ).catch(err => {
          return respuestaEnCache;
        });
      })
    );
});