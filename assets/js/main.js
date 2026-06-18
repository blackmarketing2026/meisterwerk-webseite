// SSI-Fallback: lädt Header/Footer per fetch wenn Live Server kein SSI verarbeitet
(function () {
  function loadInclude(url, insertFn) {
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) { insertFn(html); })
      .catch(function () {});
  }

  if (!document.querySelector('.site-header')) {
    loadInclude('/includes/header.shtml', function (html) {
      document.body.insertAdjacentHTML('afterbegin', html);
    });
  }

  if (!document.querySelector('.site-footer')) {
    loadInclude('/includes/footer.shtml', function (html) {
      var scripts = document.querySelectorAll('body script');
      var lastScript = scripts[scripts.length - 1];
      lastScript.insertAdjacentHTML('beforebegin', html);
    });
  }
})();

document.addEventListener('DOMContentLoaded', function () {

  // Aktiven Nav-Link markieren
  const links = document.querySelectorAll('.main-nav a');
  const path  = window.location.pathname.replace(/\.shtml$/, '').replace(/\/index$/, '/');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || href === path.replace(/\/$/, '')) {
      link.classList.add('active');
    }
  });

  // Details-Elemente (FAQ): jeweils nur eines offen
  const allDetails = document.querySelectorAll('details');
  allDetails.forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (detail.open) {
        allDetails.forEach(function (other) {
          if (other !== detail) other.removeAttribute('open');
        });
      }
    });
  });

});
