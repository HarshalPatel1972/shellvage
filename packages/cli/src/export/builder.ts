import { getDb } from '../db/init';
import { Session } from '../db/session';
import { CommandRecord } from '../db/command';

export interface ExportCommand {
  timestamp: string;
  command: string;
  output: string;
  exitCode: number;
  durationMs: number;
  gitBranch?: string;
  annotation?: string;
  isRedacted: boolean;
}

export interface ExportSection {
  directory: string;
  commands: ExportCommand[];
}

export interface ExportSession {
  id: string;
  date: string;
  duration: string;
  shell: string;
  hostname: string;
  gitRepo?: string;
  tags: string[];
  summary?: string;
  sections: ExportSection[];
}

export function buildSessionData(sessionId: string): ExportSession | null {
  const db = getDb();
  const session = db.prepare(`SELECT * FROM sessions WHERE id = ?`).get(sessionId) as Session;
  if (!session) return null;

  const commands = db.prepare(`SELECT * FROM commands WHERE session_id = ? ORDER BY timestamp ASC`).all(sessionId) as CommandRecord[];
  
  const sectionsMap = new Map<string, ExportCommand[]>();
  for (const cmd of commands) {
    if (!sectionsMap.has(cmd.directory)) {
      sectionsMap.set(cmd.directory, []);
    }
    sectionsMap.get(cmd.directory)!.push({
      timestamp: new Date(cmd.timestamp).toLocaleTimeString(),
      command: cmd.command,
      output: cmd.output || '',
      exitCode: cmd.exit_code || 0,
      durationMs: cmd.duration_ms || 0,
      gitBranch: cmd.git_branch,
      annotation: cmd.annotation,
      isRedacted: cmd.is_redacted === 1
    });
  }

  const sections: ExportSection[] = [];
  for (const [directory, cmds] of sectionsMap.entries()) {
    sections.push({ directory, commands: cmds });
  }

  const durationMs = (session.ended_at || Date.now()) - session.started_at;
  const durationStr = \`\${Math.round(durationMs / 60000)} min\`;

  return {
    id: session.id,
    date: new Date(session.started_at).toLocaleDateString(),
    duration: durationStr,
    shell: session.shell || 'unknown',
    hostname: session.hostname || 'unknown',
    gitRepo: session.git_repo || undefined,
    tags: JSON.parse(session.tags || '[]'),
    summary: session.summary || undefined,
    sections
  };
}
