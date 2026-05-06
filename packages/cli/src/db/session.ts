import { getDb } from './init';
import { v4 as uuidv4 } from 'uuid';

export interface Session {
  id: string;
  started_at: number;
  ended_at: number | null;
  shell: string | null;
  hostname: string | null;
  username: string | null;
  git_repo: string | null;
  tags: string;
  summary: string | null;
  is_paused: number;
}

export function createSession(data: Partial<Session>): string {
  const db = getDb();
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO sessions (id, started_at, shell, hostname, username, git_repo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    id,
    data.started_at || Date.now(),
    data.shell || null,
    data.hostname || null,
    data.username || null,
    data.git_repo || null
  );
  return id;
}

export function getActiveSession(shell: string): Session | undefined {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM sessions WHERE shell = ? ORDER BY started_at DESC LIMIT 1`);
  return stmt.get(shell) as Session | undefined;
}
