import { neon } from '@neondatabase/serverless';

// Einmalig aufrufen: POST /api/setup-db
// Danach kann dieser Endpoint gelöscht oder gesperrt werden.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id          SERIAL PRIMARY KEY,
        email       TEXT        NOT NULL,
        token       TEXT        NOT NULL UNIQUE,
        expires_at  TIMESTAMPTZ NOT NULL,
        used        BOOLEAN     NOT NULL DEFAULT FALSE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_reset_tokens_token ON password_reset_tokens(token)
    `;

    return res.status(200).json({ success: true, message: 'Tabelle erstellt.' });
  } catch (err) {
    console.error('DB setup error:', err);
    return res.status(500).json({ error: 'Fehler beim Erstellen der Tabelle.' });
  }
}
