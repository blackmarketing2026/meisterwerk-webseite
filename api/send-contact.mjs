import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'lead@function-concept.de';

const LEISTUNG_LABEL = {
  umzug:          'Umzüge',
  entruempelung:  'Entrümpelung',
  gartenservice:  'Gartenservice',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { leistung, betreff, nachricht, name, email, telefon } = req.body;

  if (!leistung || !betreff || !name || !email) {
    return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }

  const leistungLabel = LEISTUNG_LABEL[leistung] ?? leistung;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: RECIPIENT,
      reply_to: email,
      subject: `[${leistungLabel}] ${betreff} – ${name}`,
      html: `
        <h2 style="color:#e85d04">Neue Anfrage über die Website</h2>
        <table cellpadding="10" style="border-collapse:collapse;width:100%;max-width:560px;font-size:15px">
          <tr style="background:#f8f8f8">
            <td style="width:140px"><strong>Leistung</strong></td>
            <td>${leistungLabel}</td>
          </tr>
          <tr>
            <td><strong>Betreff</strong></td>
            <td>${betreff}</td>
          </tr>
          <tr style="background:#f8f8f8">
            <td><strong>Nachricht</strong></td>
            <td>${nachricht ? nachricht.replace(/\n/g, '<br>') : '–'}</td>
          </tr>
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr style="background:#f8f8f8">
            <td><strong>E-Mail</strong></td>
            <td><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td><strong>Telefon</strong></td>
            <td>${telefon ? `<a href="tel:${telefon}">${telefon}</a>` : '–'}</td>
          </tr>
        </table>
        <p style="margin-top:24px;color:#999;font-size:13px">Diese Anfrage wurde über das Kontaktformular auf meisterwerk-ingolstadt.de gesendet.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
}
