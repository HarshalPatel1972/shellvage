import { buildSessionData } from '../export/builder';
import { renderMarkdown } from '../export/md';
import { renderTxt } from '../export/txt';
import { renderHtml } from '../export/html';
import { renderPdf } from '../export/pdf';
import { renderDocx } from '../export/docx';
import { getActiveSession } from '../db/session';
import fs from 'fs';
import path from 'path';

export async function exportCmd(options: { format?: string, output?: string, session?: string }) {
  let sessionId = options.session;
  if (!sessionId) {
    const session = getActiveSession(process.env.SHELL || 'unknown');
    if (!session) {
      console.log('No active session.');
      return;
    }
    sessionId = session.id;
  }

  const data = buildSessionData(sessionId);
  if (!data) return;

  const format = options.format || 'md';
  const defaultOut = path.join(process.cwd(), `session-${data.id}.${format}`);
  const outPath = options.output || defaultOut;

  if (format === 'md') fs.writeFileSync(outPath, renderMarkdown(data));
  else if (format === 'txt') fs.writeFileSync(outPath, renderTxt(data));
  else if (format === 'html') fs.writeFileSync(outPath, renderHtml(data));
  else if (format === 'pdf') await renderPdf(data, outPath);
  else if (format === 'docx') await renderDocx(data, outPath);
  
  console.log(`Exported session to ${outPath}`);
}
