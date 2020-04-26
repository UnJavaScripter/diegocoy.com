if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(registration => {
    registration.onupdatefound = () => {

      const installingWorker = registration.installing;

      installingWorker.onstatechange = (e) => {
      
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log('El contenido del sitio se ha actualizado, verás la nueva versión tras refrescar la página');
          } else {
            console.log('Sitio \'cacheado\' ¡Visitas offline activadas!');
          }
        }
        
      };
    };

  }).catch(err => {
    console.warn(':( Algo pasó durante el registro del Service Worker: ', err);
  });

  navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
    console.log('El Service Worker está listo :D');
  })
}