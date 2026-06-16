document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Wird gesendet…';
    btn.disabled = true;

    const data = {
      vorname:   form.vorname?.value.trim(),
      nachname:  form.nachname?.value.trim(),
      telefon:   form.telefon?.value.trim(),
      email:     form.email?.value.trim(),
      leistung:  form.leistung?.value,
      nachricht: form.nachricht?.value.trim(),
    };

    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.innerHTML = '<p style="text-align:center;font-size:1.1rem;padding:20px 0">&#10003; Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>';
      } else {
        const json = await res.json();
        btn.textContent = 'Jetzt kostenlos anfragen';
        btn.disabled = false;
        alert(json.error || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
      }
    } catch {
      btn.textContent = 'Jetzt kostenlos anfragen';
      btn.disabled = false;
      alert('Keine Verbindung möglich. Bitte rufen Sie uns an.');
    }
  });

});
