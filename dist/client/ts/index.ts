// Trying to avoid spam robots
function writeEmailAddress(elementSelector, address){
  const emailContainer = document.querySelector(elementSelector);
  emailContainer.innerHTML = address;
}

function dynamicEmailLink(elementSelector, address) {
  const emailLink = document.querySelector(elementSelector);

  emailLink.setAttribute('href', 'mailto:' + address);
  emailLink.setAttribute('title', 'Email address: ' + address);
  emailLink.setAttribute('aria-label', 'Email address: ' + address);

}