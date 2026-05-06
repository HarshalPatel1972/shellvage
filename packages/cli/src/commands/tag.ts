import { getActiveSession } from '../db/session';
import { getDb } from '../db/init';
import { palette } from '../brand';

export function tag(label: string, sessionId?: string) {
  const db = getDb();
  let id = sessionId;
  
  if (!id) {
    const shell = process.env.SHELL || 'unknown';
    const session = getActiveSession(shell);
    if (!session) {
      console.log(palette.error('No active session found.'));
      return;
    }
    id = session.id;
  }

  const stmt = db.prepare(`SELECT tags FROM sessions WHERE id = ?`);
  const row = stmt.get(id) as { tags: string } | undefined;
  if (!row) {
    console.log(palette.error('Session not found.'));
    return;
  }

  const tags = JSON.parse(row.tags || '[]');
  if (!tags.includes(label)) {
    tags.push(label);
    const updateStmt = db.prepare(`UPDATE sessions SET tags = ? WHERE id = ?`);
    updateStmt.run(JSON.stringify(tags), id);
  }
  
  console.log(palette.signal(`Added tag '${label}' to session ${id}`));
}
