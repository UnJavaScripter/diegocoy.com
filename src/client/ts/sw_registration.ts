if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').then(registration  => {
      console.log('service worker registrado');
    }).catch(function(err) {
      console.warn(':/ algo pasó al intentar registrar el service worker');
    });
  });
}