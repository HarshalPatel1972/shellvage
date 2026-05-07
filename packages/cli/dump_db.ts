import { getDb } from './src/db/init';

async function dump() {
  const db = await getDb();
  const commands = await db.all('SELECT command, output, length(output) as len FROM commands ORDER BY timestamp DESC LIMIT 5');
  console.log(JSON.stringify(commands, null, 2));
}

dump().catch(console.error);
