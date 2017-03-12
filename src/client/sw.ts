interface Window {
  skipWaiting: any;
  clients: any;
  registration: any;
  Notification: any;
}

const CACHE_ACTUAL = 'cache012';
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
  '/scripts/main.js',
  '/scripts/sw_registration.js'
];

// Instalación del service worker y cacheo inicial
self.addEventListener('install', (event: any) => {
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

// Interceptor de solicitudes
self.addEventListener('fetch', (event: any) => {
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

// Notificaciones Push
self.addEventListener('push', function(event: any) {  
  var title = 'Jojojo';  
  var body = '¡Un mensaje Push ha llegado!';  
  var icon = '/apple-touch-icon.png';  
  var tag = 'jojojojojo-push-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});