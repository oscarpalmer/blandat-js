"use strict";!function(t){function e(t){return t.substr(0,f.base.length)===f.base?t:f.base+t}function n(t){"function"==typeof f.onPop&&f.onPop.call(t,t.state.knuff)}function o(n){var o=n.target;if(!1===o.matches(f.link)||n.metaKey||n.ctrlKey)return!0;n.preventDefault();var a=o.getAttribute("data-knuff")||o.href||!1;return!1!==a&&a!==t.location.href&&(a=e(a),t.history.pushState({knuff:a},null,a),"function"==typeof f.onPush&&f.onPush.call(n,a),!1)}function a(t){if("[object Object]"===u.toString.call(t))for(var e in t)u.hasOwnProperty.call(t,e)&&u.hasOwnProperty.call(f,e)&&(f[e]=t[e])}var r=t.document,c=t.location.href,l=Element.prototype,u=Object.prototype,f={base:t.location.protocol+"//"+t.location.host+"/",link:"[data-knuff]",onPop:null,onPush:null},i=!1;void 0===l.matches&&(l.matches=l.msMatchesSelector||l.webkitMatchesSelector),t.knuff=function(e){i||(i=!0,a(e||{}),t.addEventListener("popstate",n),r.addEventListener("click",o),t.history.replaceState({knuff:c},null,c))}}(this);