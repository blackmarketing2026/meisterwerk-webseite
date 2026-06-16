document.addEventListener('DOMContentLoaded', function () {

  // Aktiven Nav-Link markieren
  const links = document.querySelectorAll('.main-nav a');
  const path  = window.location.pathname;
  links.forEach(function (link) {
    if (link.getAttribute('href') === path || link.getAttribute('href') === path.replace(/\/$/, '/index.shtml')) {
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
