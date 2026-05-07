import { getDb } from '../db/init';
import chalk from 'chalk';
import { palette, paletteHex } from '../brand';

export async function list(options: { all?: boolean } = {}) {
  const db = await getDb();
  const limit = options.all ? '' : 'LIMIT 10';
  const sessions = await db.all(`SELECT * FROM sessions ORDER BY started_at DESC ${limit}`) as any[];

  if (sessions.length === 0) {
    console.log(chalk.gray('No sessions found.'));
    return;
  }

  console.log(chalk.bold('\nRECENT SESSIONS'));
  console.log(chalk.gray('─'.repeat(40)));

  for (const s of sessions) {
    const date = new Date(s.started_at).toLocaleDateString();
    const time = new Date(s.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const tags = JSON.parse(s.tags || '[]');
    
    console.log(
      `${palette.ember(s.id.substring(0, 8))} ` +
      `${chalk.white(date)} ${chalk.gray(time)} ` +
      `${chalk.cyan(s.shell)} ` +
      `${tags.map((t: string) => chalk.bgHex(paletteHex.bgSurface).hex(paletteHex.ember)(` ${t} `)).join(' ')}`
    );
  }
  console.log();
}
