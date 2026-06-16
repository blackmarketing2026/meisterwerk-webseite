import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'lead@function-concept.de';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { vorname, nachname, telefon, email, leistung, nachricht } = req.body;

  if (!vorname || !nachname || !telefon || !email || !leistung) {
    return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }

  const leistungLabel = {
    entruempelung:      'Entrümpelung',
    haushaltsaufloesung: 'Haushaltsauflösung',
    umzug:              'Umzug',
    sonstiges:          'Sonstiges',
  }[leistung] ?? leistung;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: RECIPIENT,
      reply_to: email,
      subject: `Neue Anfrage: ${leistungLabel} – ${vorname} ${nachname}`,
      html: `
        <h2>Neue Websiteanfrage</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td><strong>Name</strong></td><td>${vorname} ${nachname}</td></tr>
          <tr><td><strong>Telefon</strong></td><td>${telefon}</td></tr>
          <tr><td><strong>E-Mail</strong></td><td>${email}</td></tr>
          <tr><td><strong>Leistung</strong></td><td>${leistungLabel}</td></tr>
          <tr><td><strong>Nachricht</strong></td><td>${nachricht ? nachricht : '–'}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
}
