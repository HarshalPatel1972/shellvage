import { v4 as uuidv4 } from 'uuid';
import { getDb } from './init';

export interface CommandRecord {
  id: string;
  session_id: string;
  timestamp: number;
  directory: string;
  command: string;
  output: string | null;
  exit_code: number | null;
  duration_ms: number | null;
  git_branch: string | null;
  annotation: string | null;
  is_redacted: number;
}

export async function addCommand(data: Partial<CommandRecord>): Promise<void> {
  const db = await getDb();
  const id = uuidv4();
  const timestamp = Date.now();

  await db.run(
    `INSERT INTO commands (id, session_id, timestamp, directory, command, output, exit_code, duration_ms, git_branch, annotation, is_redacted)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.session_id,
      timestamp,
      data.directory,
      data.command,
      data.output || null,
      data.exit_code ?? null,
      data.duration_ms ?? null,
      data.git_branch || null,
      data.annotation || null,
      data.is_redacted || 0
    ]
  );
}
