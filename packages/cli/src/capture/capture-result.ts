#!/usr/bin/env node
import { getSessionById, createSession } from '../db/session';
import { addCommand } from '../db/command';
import { redact } from './redact';
import os from 'os';
import fs from 'fs';

async function main() {
  const args = process.argv.slice(2);
  const params: any = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    params[key] = args[i + 1];
  }

  const shell = process.env.SHELL || 'pwsh';
  const sessionId = params['session-id'];
  
  let session;
  if (sessionId) {
    session = await getSessionById(sessionId);
  }

  if (!session) {
    session = await createSession({
      id: sessionId, // Use the provided unique ID from the shell
      shell,
      hostname: os.hostname(),
      username: os.userInfo().username,
    });
  }

  if (session.is_paused) return;

  const cmd = params.cmd || '';
  const isAnnotation = cmd.startsWith('#! ');
  let annotation = '';
  let finalCmd = cmd;

  if (isAnnotation) {
    annotation = cmd.substring(3);
    finalCmd = 'comment';
  }

  let output = params.output || '';
  if (params['output-file'] && fs.existsSync(params['output-file'])) {
    try {
      output = fs.readFileSync(params['output-file'], 'utf-8');
      
      // Clean up PowerShell transcript noise
      output = output.replace(/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*[\s\S]*?\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/g, '');
      output = output.replace(/Windows PowerShell transcript start[\s\S]*?Command line:.*/g, '');
      output = output.replace(/PowerShell transcript start[\s\S]*?Command line:.*/g, '');
      output = output.trim();

      fs.unlinkSync(params['output-file']); // Clean up
    } catch (e) {
      console.error('Failed to read output file:', e);
    }
  }

  const redacted = redact(finalCmd);

  await addCommand({
    session_id: session.id,
    directory: params.dir || process.cwd(),
    command: redacted.text,
    output: output,
    exit_code: parseInt(params.exit) || 0,
    duration_ms: Math.max(0, Date.now() - Math.floor(parseFloat(params.start || Date.now().toString()))),
    annotation: annotation || undefined,
    is_redacted: redacted.wasRedacted ? 1 : 0
  });
}

main().catch(console.error);
