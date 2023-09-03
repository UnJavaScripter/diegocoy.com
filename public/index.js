if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(registration => {
    registration.onupdatefound = () => {

      const installingWorker = registration.installing;

      installingWorker.onstatechange = (e) => {
      
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log('Content updated. The new version will be available after refreshing the page.');
          } else {
            console.log('Content cached. Offline mode available.');
          }
        }
        
      };
    };

  }).catch(err => {
    console.warn('Service worker registration failed: ', err);
  });

  navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
    console.log('Service worker ready.');
  })
}