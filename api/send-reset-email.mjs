import { Resend } from 'resend';
import { neon } from '@neondatabase/serverless';
import { randomBytes } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Token generieren (64 hex Zeichen = 32 Bytes)
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 Stunde

    // Alte ungenutzte Tokens für diese E-Mail löschen
    await sql`
      DELETE FROM password_reset_tokens
      WHERE email = ${email} AND used = FALSE
    `;

    // Neuen Token speichern
    await sql`
      INSERT INTO password_reset_tokens (email, token, expires_at)
      VALUES (${email}, ${token}, ${expiresAt.toISOString()})
    `;

    const resetLink = `${process.env.APP_URL}/reset-password.shtml?token=${token}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: 'Passwort zurücksetzen – Meisterwerk',
      html: `
        <p>Hallo,</p>
        <p>du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt.</p>
        <p>
          <a href="${resetLink}" style="background:#e85d04;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;">
            Passwort jetzt zurücksetzen
          </a>
        </p>
        <p>Dieser Link ist 1 Stunde gültig.</p>
        <p>Falls du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.</p>
        <br>
        <p>Dein Meisterwerk-Team</p>
      `,
    });

    // Neutrale Antwort: gibt nicht preis ob die E-Mail existiert
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Reset email error:', err);
    return res.status(500).json({ error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' });
  }
}
