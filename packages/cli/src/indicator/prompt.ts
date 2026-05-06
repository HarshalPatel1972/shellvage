import fs from 'fs';
import { configPath } from '../utils/paths';

export function getIndicatorStr(): string {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.promptIndicator === false) return '';
    if (config.recording === false) return '○ sv';
    return '⬤ sv';
  } catch {
    return '⬤ sv';
  }
}

export function printIndicator() {
  const str = getIndicatorStr();
  if (str) process.stdout.write(str);
}

if (require.main === module) {
  printIndicator();
}
