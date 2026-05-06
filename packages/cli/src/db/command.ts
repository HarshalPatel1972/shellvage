import { getDb } from './init';
import { v4 as uuidv4 } from 'uuid';

export interface CommandRecord {
  session_id: string;
  timestamp: number;
  directory: string;
  command: string;
  output?: string;
  exit_code?: number;
  duration_ms?: number;
  git_branch?: string;
  annotation?: string;
  is_redacted?: number;
}

export function insertCommand(data: CommandRecord) {
  const db = getDb();
  const id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO commands (
      id, session_id, timestamp, directory, command, output, exit_code, duration_ms, git_branch, annotation, is_redacted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    id,
    data.session_id,
    data.timestamp,
    data.directory,
    data.command,
    data.output || '',
    data.exit_code ?? null,
    data.duration_ms ?? null,
    data.git_branch || null,
    data.annotation || null,
    data.is_redacted || 0
  );
  return id;
}
