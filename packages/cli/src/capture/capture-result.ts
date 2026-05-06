#!/usr/bin/env node
import { insertCommand } from '../db/command';
import { getActiveSession, createSession } from '../db/session';
import { redact } from './redact';

const args = process.argv.slice(2);
let cmd = '';
let exitCode = 0;
let dir = process.cwd();
let start = Date.now();

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--cmd') cmd = args[++i];
  if (args[i] === '--exit') exitCode = parseInt(args[++i], 10);
  if (args[i] === '--dir') dir = args[++i];
  if (args[i] === '--start') start = parseInt(args[++i], 10);
}

if (!cmd) process.exit(0);

let annotation = '';
if (cmd.startsWith('#! ')) {
  annotation = cmd.substring(3);
}

const { text: redactedCmd, wasRedacted: cmdRedacted } = redact(cmd);
const shell = process.env.SHELL || 'unknown';

let session = getActiveSession(shell);
if (!session) {
  const sessionId = createSession({ shell, started_at: start });
  session = { id: sessionId, shell, started_at: start, ended_at: null, hostname: null, username: null, git_repo: null, tags: '[]', summary: null, is_paused: 0 };
}

insertCommand({
  session_id: session.id,
  timestamp: start,
  directory: dir,
  command: redactedCmd,
  output: '', 
  exit_code: exitCode,
  duration_ms: Date.now() - start,
  annotation,
  is_redacted: cmdRedacted ? 1 : 0
});
