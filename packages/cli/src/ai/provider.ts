import { readConfig } from '../utils/config';

export async function askAi(prompt: string): Promise<string> {
  const config = readConfig();
  const provider = config.aiProvider || 'groq';
  const apiKey = config.aiKey;

  if (!apiKey && provider !== 'huggingface') {
    return 'Error: No API key configured. Run `shellvage config set aiKey <key>`';
  }

  return Promise.resolve(`[Mock AI Response via ${provider}]\nThis is a generated response based on your terminal session.`);
}
