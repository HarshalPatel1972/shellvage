import { getDb } from '../db/init';
export function flushCmd() {
  const db = getDb();
  db.exec('DELETE FROM commands; DELETE FROM sessions;');
  console.log('All sessions flushed.');
}
