import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token || typeof token !== 'string' || token.length !== 64) {
    return res.status(400).json({ error: 'Ungültiger Token.' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const rows = await sql`
      SELECT email, expires_at, used
      FROM password_reset_tokens
      WHERE token = ${token}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Token ungültig oder nicht gefunden.' });
    }

    const { email, expires_at, used } = rows[0];

    if (used) {
      return res.status(400).json({ error: 'Dieser Link wurde bereits verwendet.' });
    }

    if (new Date(expires_at) < new Date()) {
      return res.status(400).json({ error: 'Dieser Link ist abgelaufen. Bitte fordere einen neuen an.' });
    }

    // Token als verwendet markieren
    await sql`
      UPDATE password_reset_tokens
      SET used = TRUE
      WHERE token = ${token}
    `;

    // Hier später: Passwort-Hash in der Users-Tabelle speichern
    // Für jetzt: Bestätigung zurückgeben
    return res.status(200).json({ success: true, email });
  } catch (err) {
    console.error('Verify token error:', err);
    return res.status(500).json({ error: 'Ein Fehler ist aufgetreten.' });
  }
}
