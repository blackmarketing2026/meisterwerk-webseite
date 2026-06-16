import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'lead@function-concept.de';

const LEISTUNG_LABEL = {
  umzug:         'Umzüge',
  entruempelung: 'Entrümpelung',
  gartenservice: 'Gartenservice',
};

const LEISTUNG_ICON = {
  umzug:         '🚚',
  entruempelung: '🏠',
  gartenservice: '🌿',
};

function buildEmailHtml({ leistung, betreff, nachricht, name, email, telefon }) {
  const label = LEISTUNG_LABEL[leistung] ?? leistung;
  const icon  = LEISTUNG_ICON[leistung] ?? '📋';
  const now   = new Date().toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    day:   '2-digit',
    month: '2-digit',
    year:  'numeric',
    hour:  '2-digit',
    minute:'2-digit',
  });

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center">
              <p style="margin:0;color:#e85d04;font-size:22px;font-weight:700;letter-spacing:0.04em">MEISTERWERK</p>
              <p style="margin:6px 0 0;color:#888;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">Ingolstadt &amp; Region</p>
            </td>
          </tr>

          <!-- Orange Akzentlinie -->
          <tr>
            <td style="background:#e85d04;height:4px;font-size:0;line-height:0">&nbsp;</td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="background:#fff;padding:36px 40px 20px;text-align:center">
              <span style="display:inline-block;background:#fff5ef;border:2px solid #e85d04;border-radius:50px;padding:10px 24px;font-size:15px;font-weight:700;color:#e85d04">
                ${icon}&nbsp;&nbsp;Neue Anfrage: ${label}
              </span>
            </td>
          </tr>

          <!-- Betreff -->
          <tr>
            <td style="background:#fff;padding:0 40px 28px;text-align:center">
              <h1 style="margin:0;font-size:20px;color:#1a1a2e;font-weight:700">${betreff}</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#aaa">Eingegangen am ${now} Uhr</p>
            </td>
          </tr>

          <!-- Trennlinie -->
          <tr>
            <td style="background:#fff;padding:0 40px">
              <hr style="border:none;border-top:1.5px solid #f0f0f0;margin:0">
            </td>
          </tr>

          <!-- Nachricht -->
          ${nachricht ? `
          <tr>
            <td style="background:#fff;padding:28px 40px">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#aaa">Nachricht</p>
              <p style="margin:0;font-size:15px;color:#333;line-height:1.6">${nachricht.replace(/\n/g, '<br>')}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#fff;padding:0 40px">
              <hr style="border:none;border-top:1.5px solid #f0f0f0;margin:0">
            </td>
          </tr>
          ` : ''}

          <!-- Kontaktdaten -->
          <tr>
            <td style="background:#fff;padding:28px 40px 36px">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#aaa">Kontaktdaten</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f5f5f5">
                    <span style="font-size:13px;color:#999;display:block;margin-bottom:2px">Name</span>
                    <span style="font-size:15px;color:#1a1a2e;font-weight:600">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f5f5f5">
                    <span style="font-size:13px;color:#999;display:block;margin-bottom:2px">E-Mail</span>
                    <a href="mailto:${email}" style="font-size:15px;color:#e85d04;font-weight:600;text-decoration:none">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0">
                    <span style="font-size:13px;color:#999;display:block;margin-bottom:2px">Telefon</span>
                    ${telefon
                      ? `<a href="tel:${telefon}" style="font-size:15px;color:#e85d04;font-weight:600;text-decoration:none">${telefon}</a>`
                      : `<span style="font-size:15px;color:#bbb">–</span>`
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#f8f8f8;border-top:1.5px solid #f0f0f0;padding:28px 40px;text-align:center;border-radius:0 0 12px 12px">
              <a href="mailto:${email}"
                 style="display:inline-block;background:#e85d04;color:#fff;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none">
                Jetzt antworten
              </a>
              ${telefon ? `
              <p style="margin:14px 0 0">
                <a href="tel:${telefon}" style="font-size:13px;color:#888;text-decoration:none">oder anrufen: ${telefon}</a>
              </p>` : ''}
              <p style="margin:20px 0 0;font-size:11px;color:#bbb">
                Diese Anfrage wurde über das Kontaktformular auf meisterwerk-ingolstadt.de gesendet.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

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

  const label = LEISTUNG_LABEL[leistung] ?? leistung;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: RECIPIENT,
      reply_to: email,
      subject: `[${label}] ${betreff} – ${name}`,
      html: buildEmailHtml({ leistung, betreff, nachricht, name, email, telefon }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
}
