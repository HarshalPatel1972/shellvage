import { v4 as uuidv4 } from 'uuid';
import { getDb } from './init';

export interface Session {
  id: string;
  started_at: number;
  ended_at: number | null;
  shell: string;
  hostname: string;
  username: string;
  git_repo: string | null;
  tags: string;
  summary: string | null;
  is_paused: number;
}

export async function createSession(data: Partial<Session>): Promise<Session> {
  const db = await getDb();
  const id = data.id || uuidv4();
  const started_at = Date.now();
  const session = {
    id,
    started_at,
    shell: data.shell || 'unknown',
    hostname: data.hostname || 'unknown',
    username: data.username || 'unknown',
    git_repo: data.git_repo || null,
    tags: '[]',
    is_paused: 0,
    ...data
  };

  await db.run(
    `INSERT INTO sessions (id, started_at, shell, hostname, username, git_repo, tags, is_paused) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [session.id, session.started_at, session.shell, session.hostname, session.username, session.git_repo, session.tags, session.is_paused]
  );

  return session as Session;
}

export async function getSessionById(id: string): Promise<Session | null> {
  const db = await getDb();
  const row = await db.get(
    `SELECT * FROM sessions WHERE id = ?`,
    [id]
  ) as Session | undefined;
  return row || null;
}

export async function getActiveSession(shell: string): Promise<Session | null> {
  const db = await getDb();
  const row = await db.get(
    `SELECT * FROM sessions WHERE shell = ? AND ended_at IS NULL ORDER BY started_at DESC LIMIT 1`,
    [shell]
  ) as Session | undefined;
  return row || null;
}
