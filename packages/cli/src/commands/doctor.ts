import { shellvageDir, sessionsDbPath, configPath, ensureDirs } from '../utils/paths';
import { getDb } from '../db/init';
import fs from 'fs';
import chalk from 'chalk';
import { palette } from '../brand';

export async function doctorCmd() {
  ensureDirs();
  await getDb();
  
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ aiProvider: 'gemini', aiKey: '' }, null, 2));
  }

  console.log(chalk.bold('Shellvage Diagnostic Report'));
  console.log(chalk.gray('─'.repeat(30)));

  const checks = [
    { name: 'Directory', path: shellvageDir },
    { name: 'Database', path: sessionsDbPath },
    { name: 'Config', path: configPath }
  ];

  for (const check of checks) {
    const exists = fs.existsSync(check.path);
    const status = exists ? chalk.green('✓ FOUND') : chalk.yellow('! MISSING');
    console.log(`${check.name.padEnd(12)} ${status} ${chalk.gray(check.path)}`);
  }

  console.log(chalk.gray('─'.repeat(30)));
  console.log(palette.signal('Diagnostic complete. Everything looks good!'));
}
