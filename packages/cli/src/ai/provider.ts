import { readConfig } from '../utils/config';

export async function askAi(prompt: string): Promise<string> {
  const config = readConfig();
  const provider = config.aiProvider || 'groq';
  const apiKey = config.aiKey;

  if (!apiKey) {
    return 'Error: No API key configured. Run `shellvage config set aiKey <key>`';
  }

  try {
    if (provider === 'groq') {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await response.json() as any;
      return data.choices[0].message.content;
    } 
    
    if (provider === 'gemini') {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json() as any;
      return data.candidates[0].content.parts[0].text;
    }

    return `Error: Unsupported AI provider ${provider}`;
  } catch (err) {
    return `Error calling AI provider: ${err}`;
  }
}
