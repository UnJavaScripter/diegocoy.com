interface Navigator {
  serviceWorker: any;
}

// if('serviceWorker' in window.navigator) {
//   navigator.serviceWorker.register('../sw.js', {scope: '.'}).then(registration => {
//     registration.onupdatefound = () => {
//       const installingWorker = registration.installing;
//       installingWorker.onstatechange = _ => {
//         if(installingWorker.state === 'installed') {
//           if (!navigator.serviceWorker.controller) {
//             //tostada.mostrar('Sitio \'cacheado\' ¡Visitas offline activadas!');
//             console.log('sitio cacheado');
//           }
//         }
//       };
//     };
//   }).catch(error => {
//     console.log(error);
//   });
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}