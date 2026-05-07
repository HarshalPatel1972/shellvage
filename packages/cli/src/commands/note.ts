import { getActiveSession, createSession } from '../db/session';
import { addCommand } from '../db/command';
import chalk from 'chalk';
import os from 'os';

export async function note(text: string) {
  const shell = process.env.SHELL || 'unknown';
  let s = await getActiveSession(shell);
  
  if (!s) {
    s = await createSession({
      shell,
      hostname: os.hostname(),
      username: os.userInfo().username,
    });
  }

  await addCommand({
    session_id: s.id,
    directory: process.cwd(),
    command: 'note',
    annotation: text
  });

  console.log(`${chalk.green('✓')} Note added to current session.`);
}
