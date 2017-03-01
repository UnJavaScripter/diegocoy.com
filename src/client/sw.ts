declare let caches: any;
declare let fetch: any;
declare let Promise: any;

interface Window {
  skipWaiting: any;
  clients: any;
}

const CACHE_ACTUAL = 'cache0';
const archivos_para_cachear = [
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

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_ACTUAL)
      .then((cache) => {
        return cache.addAll(archivos_para_cachear).then(() => {
          console.log('Archivos cacheados');
        });
      })
  );
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(self.clients.claim());

  event.waitUntil(
    caches.keys().then(lasCachesQueExisten => {

      return Promise.all(
        lasCachesQueExisten.map(unaCache => {
          if (unaCache !== CACHE_ACTUAL) {
            return caches.delete(unaCache).then(() => {
              console.log('Cachés previas eliminadas');
            });
          }
        })
      );

    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then((respuestaEnCache) => {
        const laSolicitud = event.request.clone();

        if(respuestaEnCache || !(/(google-analytics.com)|(fonts.googleapis.com)/gi).test(laSolicitud.url) ) {
          return respuestaEnCache;
        }

        return fetch(laSolicitud).then((respuestaDeLaRed) => {

            if(!respuestaDeLaRed || respuestaDeLaRed.status !== 200 || respuestaDeLaRed.type !== 'basic') {
              return respuestaDeLaRed;
            }

            const respuestaDeLaRedParaCachear = respuestaDeLaRed.clone();

            caches.open(CACHE_ACTUAL)
              .then((cache) => {
                cache.put(event.request, respuestaDeLaRedParaCachear);
              });

            return respuestaDeLaRed;
          }
        );
      })
    );
});