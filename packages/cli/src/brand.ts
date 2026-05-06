import chalk from 'chalk';

export const palette = {
  ember: chalk.hex('#E8A045'),
  ash: chalk.hex('#A0A0A0'),
  ink: chalk.hex('#0D0D0D'),
  signal: chalk.hex('#4ADE80'),
  muted: chalk.hex('#555555'),
  error: chalk.hex('#FF4444'),
  info: chalk.hex('#60A5FA'),
};

export function renderWordmark(version: string) {
  const line1 = palette.ember(`  ⬡  shellvage  `) + palette.muted(`v${version}`);
  const line2 = palette.ash(`     salvage your sessions`);
  console.log(line1);
  console.log(line2);
  console.log();
}

export function renderBox(title: string, content: string[]) {
  const boxWidth = 44;
  const topDashCount = boxWidth - title.length - 5;
  const topDashes = '─'.repeat(Math.max(0, topDashCount));
  console.log(palette.ash(`  ╭─ ${title} ${topDashes}╮`));
  for (const line of content) {
    const visibleLength = line.replace(/\x1B\[\d+m/g, '').length;
    const pad = boxWidth - visibleLength - 4;
    console.log(palette.ash(`  │  `) + line + ' '.repeat(Math.max(0, pad)) + palette.ash(` │`));
  }
  const bottomDashes = '─'.repeat(boxWidth - 2);
  console.log(palette.ash(`  ╰${bottomDashes}╯`));
}
