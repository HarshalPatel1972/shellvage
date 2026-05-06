import { askAi } from '../ai/provider';
import { getSummarizePrompt } from '../ai/prompts';
import { buildSessionData } from '../export/builder';
import { getActiveSession } from '../db/session';

export async function summarizeCmd(sessionId?: string) {
  let id = sessionId;
  if (!id) {
    const s = getActiveSession(process.env.SHELL || 'unknown');
    if (!s) return console.log('No active session.');
    id = s.id;
  }
  const data = buildSessionData(id);
  if (!data) return;

  console.log('Generating summary...');
  const prompt = getSummarizePrompt(JSON.stringify(data, null, 2));
  const res = await askAi(prompt);
  console.log('\n' + res + '\n');
}
