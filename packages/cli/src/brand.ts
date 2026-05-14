import chalk from 'chalk';

export const paletteHex = {
  ember: '#E8A045',
  accent: '#7DF9A0', // Mint Green
  accent2: '#4DFFCF', // Cyan
  ash: '#E0E0E0', // Brighter for visibility
  ink: '#0D0D0D',
  signal: '#4ADE80',
  muted: '#AAAAAA', // Brighter for visibility
  error: '#FF4444',
  info: '#60A5FA',
  bgSurface: '#18181B'
};

export const palette = {
  ember: chalk.hex(paletteHex.ember),
  accent: chalk.hex(paletteHex.accent),
  accent2: chalk.hex(paletteHex.accent2),
  ash: chalk.hex(paletteHex.ash),
  ink: chalk.hex(paletteHex.ink),
  signal: chalk.hex(paletteHex.signal),
  muted: chalk.hex(paletteHex.muted),
  error: chalk.hex(paletteHex.error),
  info: chalk.hex(paletteHex.info),
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
