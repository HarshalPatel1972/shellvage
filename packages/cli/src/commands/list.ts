import { getDb } from '../db/init';
import { Session } from '../db/session';
import { palette } from '../brand';

export function list(options: { all?: boolean, project?: string }) {
  const db = getDb();
  
  let query = `SELECT * FROM sessions`;
  let params: any[] = [];
  
  if (options.project) {
    query += ` WHERE git_repo LIKE ?`;
    params.push(`%${options.project}%`);
  }
  
  query += ` ORDER BY started_at DESC`;
  if (!options.all) {
    query += ` LIMIT 10`;
  }
  
  const stmt = db.prepare(query);
  const rows = stmt.all(...params) as Session[];
  
  if (rows.length === 0) {
    console.log(palette.muted('No sessions found.'));
    return;
  }
  
  console.log(palette.ash('ID      Started              Duration Project         Tags'));
  console.log(palette.ash('────────────────────────────────────────────────────────────────────────'));
  
  for (const row of rows) {
    const startStr = new Date(row.started_at).toLocaleString().padEnd(20).substring(0, 20);
    const durationStr = (row.ended_at ? `${Math.round((row.ended_at - row.started_at) / 60000)}m` : 'active').padEnd(8).substring(0, 8);
    const proj = (row.git_repo || '').padEnd(15).substring(0, 15);
    const idStr = row.id.split('-')[0].padEnd(7).substring(0, 7);
    
    console.log(`${palette.ember(idStr)} ${startStr} ${durationStr} ${proj} ${row.tags}`);
  }
}
