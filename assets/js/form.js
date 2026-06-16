document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Wird gesendet…';
    btn.disabled = true;

    // Formular per fetch absenden (Endpunkt anpassen)
    const data = new FormData(form);
    fetch(form.action, { method: 'POST', body: data })
      .then(function () {
        form.innerHTML = '<p style="text-align:center;font-size:1.1rem;color:#fff;padding:20px 0">✅ Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>';
      })
      .catch(function () {
        btn.textContent = 'Jetzt kostenlos anfragen';
        btn.disabled = false;
        alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
      });
  });

});
