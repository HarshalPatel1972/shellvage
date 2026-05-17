import { palette } from '../brand';
import chalk from 'chalk';

function renderDocSection(title: string, content: string[]) {
  console.log(palette.ember(chalk.bold(`  ${title}`)));
  
  for (const line of content) {
    console.log(`    ${line}`);
  }
  
  console.log();
}

export function docsCmd() {
  const cmd = (text: string) => palette.signal(text);
  const arg = (text: string) => palette.ash(text);
  const info = (text: string) => palette.info(text);
  const dim = (text: string) => palette.muted(text);

  // Helper to mathematically align columns regardless of invisible ANSI escape codes
  const align = (left: string, right: string, targetCol = 38) => {
    // Basic regex to strip ANSI codes
    const visibleLength = left.replace(/\x1b\[[0-9;]*m/g, '').length;
    const padding = Math.max(1, targetCol - visibleLength);
    return `${left}${' '.repeat(padding)}${right}`;
  };

  console.log(); // Spacing after wordmark

  renderDocSection('ABOUT SHELLVAGE', [
    `Shellvage is a background terminal recorder and companion GUI app.`,
    `It silently captures your terminal sessions and lets you export,`,
    `search, summarize, and browse your work as readable documents.`,
  ]);

  renderDocSection('CORE COMMANDS', [
    align(cmd('shellvage'), dim('Show help and status overview')),
    align(cmd('shellvage pause'), dim('Pause recording')),
    align(cmd('shellvage resume'), dim('Resume recording')),
    align(cmd('shellvage status'), dim('Show recording state, session count, DB size')),
  ]);

  renderDocSection('ANNOTATION', [
    align(`${cmd('shellvage tag')} ${arg('<label>')}`, dim('Tag the current active session')),
    align(`${cmd('shellvage tag --session')} ${arg('<id>')}`, dim('Tag a specific session')),
    align(`${cmd('shellvage note')} ${arg('"<text>"')}`, dim('Annotate the last captured command')),
    ``,
    `💡 ${info('Pro Tip:')} You can also use ${cmd('#! <text>')} directly in your prompt`,
    `to quickly add notes without invoking the CLI.`
  ]);

  renderDocSection('EXPORT & SHARE', [
    align(cmd('shellvage export'), dim('Export last session to default directory')),
    align(`  ${cmd('--format')} ${arg('<fmt>')}`, dim('Export as md, pdf, docx, txt, or html')),
    align(`  ${cmd('--last')} ${arg('<n>')}`, dim('Merge the last N sessions into one doc')),
    align(`  ${cmd('--since')} ${arg('"<expr>"')}`, dim('Export matching time (e.g. "2 days ago")')),
    align(`  ${cmd('--project')} ${arg('<name>')}`, dim('Filter by git repository name')),
    align(`  ${cmd('--tag')} ${arg('<label>')}`, dim('Filter by tag')),
    align(`  ${cmd('--output')} ${arg('<path>')}`, dim('Specify a custom output path')),
    align(`  ${cmd('--session')} ${arg('<id>')}`, dim('Export a specific session by ID')),
    ``,
    align(cmd('shellvage share'), dim('Export as MD, upload to Gist, copy URL')),
  ]);

  renderDocSection('AI & SUMMARY', [
    align(cmd('shellvage summarize'), dim('Generate an AI summary of the last session')),
    align(`  ${cmd('--last')} ${arg('<n>')}`, dim('Summarize the last N sessions')),
    align(cmd('shellvage standup'), dim('Generate standup bullets from last 24h')),
  ]);

  renderDocSection('MANAGEMENT', [
    align(cmd('shellvage list'), dim('Display a table of recent sessions')),
    align(`  ${cmd('--all')}`, dim('Show all sessions')),
    align(`  ${cmd('--project')} ${arg('<name>')}`, dim('Filter by project')),
    align(cmd('shellvage open'), dim('Launch the Shellvage GUI application')),
    align(`${cmd('shellvage ignore')} ${arg('<path>')}`, dim('Add a path to the .shellvageignore file')),
    align(cmd('shellvage flush'), dim('Delete all sessions (requires --confirm)')),
    align(`  ${cmd('--before')} ${arg('"<expr>"')}`, dim('Delete sessions older than date')),
  ]);

  renderDocSection('SYSTEM & CONFIG', [
    align(cmd('shellvage doctor'), dim('Check hooks, database, and version match')),
    align(cmd('shellvage version'), dim('Print the installed version')),
    align(`${cmd('shellvage config get')} ${arg('<key>')}`, dim('Get a configuration value')),
    align(`${cmd('shellvage config set')} ${arg('<k> <v>')}`, dim('Set a configuration value')),
  ]);

  renderDocSection('ONLINE RESOURCES', [
    align(`Source Code:`, info('https://github.com/HarshalPatel1972/shellvage'), 14),
    align(`Need help?`, info('https://github.com/HarshalPatel1972/shellvage/issues'), 14),
  ]);
}
