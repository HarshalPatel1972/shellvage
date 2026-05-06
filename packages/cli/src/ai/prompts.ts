export function getSummarizePrompt(sessionJson: string) {
  return `You are summarizing a developer's terminal session for personal documentation.

Session data (structured JSON):
${sessionJson}

Write a 3-5 sentence summary in past tense describing:
1. What directories were worked in
2. What the main tasks accomplished were
3. Any errors encountered and whether they were resolved
4. Any notable commands or operations

Be factual and concise. No bullet points. No preamble like "In this session...".
Write as if the developer is reading their own notes.`;
}

export function getStandupPrompt(sessionsJson: string) {
  return `You are generating a developer standup update from terminal session data.

Sessions from the last 24 hours:
${sessionsJson}

Generate 3-5 bullet points starting with "Yesterday I..." describing:
- What was built, fixed, or deployed
- What tools or services were used
- Any blockers encountered

Be specific, use technical terms where appropriate. Keep each bullet under 15 words.`;
}
