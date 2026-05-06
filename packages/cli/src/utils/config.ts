import fs from 'fs';
import { configPath } from './paths';

export interface Config {
  recording: boolean;
  promptIndicator: boolean;
  aiProvider?: string;
  aiKey?: string;
}

export function readConfig(): Config {
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    return { recording: true, promptIndicator: true };
  }
}

export function writeConfig(config: Config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
