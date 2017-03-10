"use strict";
exports.__esModule = true;
var MainClass = (function () {
    function MainClass() {
    }
    // Trying to avoid spam robots
    MainClass.prototype.writeEmailAddress = function (elementSelector, address) {
        var emailContainer = document.querySelector(elementSelector);
        emailContainer.innerHTML = address;
    };
    MainClass.prototype.dynamicEmailLink = function (elementSelector, address) {
        var emailLink = document.querySelector(elementSelector);
        emailLink.setAttribute('href', 'mailto:' + address);
        emailLink.setAttribute('title', 'Email address: ' + address);
        emailLink.setAttribute('aria-label', 'Email address: ' + address);
    };
    return MainClass;
}());
exports.MainClass = MainClass;
