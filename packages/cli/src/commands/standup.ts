import { askAi } from '../ai/provider';
import { getStandupPrompt } from '../ai/prompts';
import { buildSessionData } from '../export/builder';
import { getDb } from '../db/init';

export async function standupCmd() {
  const db = await getDb();
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  
  const sessions = await db.all(`SELECT id FROM sessions WHERE started_at > ?`, [dayAgo]) as {id: string}[];
  if (sessions.length === 0) return console.log('No sessions in the last 24 hours.');

  const dataPromises = sessions.map(s => buildSessionData(s.id));
  const data = (await Promise.all(dataPromises)).filter(Boolean);

  console.log('Generating standup...');
  const prompt = getStandupPrompt(JSON.stringify(data, null, 2));
  const res = await askAi(prompt);
  console.log('\n' + res + '\n');
}
