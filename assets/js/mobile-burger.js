(function () {
  if (window.__ANTS_MOBILE_BURGER_COMPAT__) return;
  window.__ANTS_MOBILE_BURGER_COMPAT__ = true;

  var current = document.currentScript;
  if (!current || !current.src) return;

  var base = current.src.replace(/mobile-burger\.js(?:\?.*)?$/i, '');
  var version = 'v=20260408-1';

  function load(name) {
    var s = document.createElement('script');
    s.src = base + name + '?' + version;
    s.defer = true;
    document.head.appendChild(s);
  }

  load('menu-main-burger.js');
  load('mobile-project-menu.js');
})();
