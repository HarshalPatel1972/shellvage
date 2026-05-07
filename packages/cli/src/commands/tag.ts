import { getDb } from '../db/init';
import { getActiveSession } from '../db/session';
import chalk from 'chalk';
import { palette } from '../brand';

export async function tag(tagName: string, sessionId?: string) {
  const db = await getDb();
  let id = sessionId;
  if (!id) {
    const s = await getActiveSession(process.env.SHELL || 'unknown');
    if (!s) return console.log('No active session.');
    id = s.id;
  }

  const session = await db.get(`SELECT tags FROM sessions WHERE id = ?`, [id]) as {tags: string};
  if (!session) return console.log('Session not found.');

  const tags = JSON.parse(session.tags || '[]');
  if (!tags.includes(tagName)) {
    tags.push(tagName);
    await db.run(`UPDATE sessions SET tags = ? WHERE id = ?`, [JSON.stringify(tags), id]);
    console.log(`${chalk.green('✓')} Tag ${palette.ember.bold(tagName)} added to session ${id.substring(0, 8)}`);
  }
}
