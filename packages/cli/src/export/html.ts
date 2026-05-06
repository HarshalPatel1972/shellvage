import { ExportSession } from './builder';

export function renderHtml(session: ExportSession): string {
  let html = `<!DOCTYPE html><html><head><title>Session ${session.date}</title>`;
  html += `<style>body{font-family:sans-serif;} pre{background:#f4f4f4;padding:10px;}</style></head><body>`;
  html += `<h1>Session — ${session.date}</h1>`;
  
  for (const section of session.sections) {
    html += `<h2>${section.directory}</h2>`;
    for (const cmd of section.commands) {
      html += `<div><strong>${cmd.timestamp}</strong>`;
      html += `<pre><code>$ ${cmd.command}</code></pre>`;
      if (cmd.output) html += `<pre>${cmd.output}</pre>`;
      if (cmd.annotation) html += `<p><em>${cmd.annotation}</em></p>`;
      html += `</div>`;
    }
  }
  
  html += `</body></html>`;
  return html;
}
