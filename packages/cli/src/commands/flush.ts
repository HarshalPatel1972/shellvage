import { getDb } from '../db/init';

export async function flushCmd() {
  const db = await getDb();
  await db.exec('DELETE FROM commands; DELETE FROM sessions;');
  console.log('All sessions flushed.');
}
