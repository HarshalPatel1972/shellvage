import { ExportSession } from './builder';

export function renderMarkdown(session: ExportSession): string {
  let md = `# Session — ${session.date}\n`;
  md += `**Duration:** ${session.duration} · **Shell:** ${session.shell} · **Machine:** ${session.hostname}\n`;
  if (session.gitRepo) md += `**Repo:** ${session.gitRepo} · `;
  md += `**Tags:** ${session.tags.join(', ') || 'none'}\n\n`;
  if (session.summary) md += `${session.summary}\n\n`;
  md += `---\n\n`;

  for (const section of session.sections) {
    md += `## ${section.directory}\n\n`;
    for (const cmd of section.commands) {
      md += `**${cmd.timestamp}**`;
      if (cmd.gitBranch) md += ` · branch: \`${cmd.gitBranch}\``;
      md += `\n\`\`\`bash\n${cmd.command}\n\`\`\`\n\n`;

      if (cmd.output) {
        const linesCount = cmd.output.split('\n').length;
        md += `<details>\n<summary>Output (${linesCount} lines)</summary>\n\n`;
        md += `\`\`\`\n${cmd.output}\n\`\`\`\n\n</details>\n\n`;
      }

      if (cmd.annotation) {
        md += `> 📝 ${cmd.annotation}\n\n`;
      }
    }
  }

  return md;
}
