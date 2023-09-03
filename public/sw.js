let CACHE_ACTUAL = 'cache0';
let archivos_para_cachear = [
  '/',
  '/contact',

  
  './assets/stylesheets/main.css',
  './assets/stylesheets/home.css',
  './assets/stylesheets/contact.css',
  
  './assets/components/dc-elements/dc-icon.js',
  
  './index.js',
  
  'icons/android/android-launchericon-512-512.png',
  'icons/android/android-launchericon-192-192.png',
];

// Instalación del service worker y cacheo inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_ACTUAL)
      .then((cache) => {
        return cache.addAll(archivos_para_cachear).then(() => {
          console.log('Cached all required files.');
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
              console.log('Old caches gone!');
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