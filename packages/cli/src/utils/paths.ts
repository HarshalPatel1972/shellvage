import path from 'path';
import os from 'os';
import fs from 'fs';

export const shellvageDir = path.join(os.homedir(), '.shellvage');
export const dbPath = path.join(shellvageDir, 'sessions.db');
export const configPath = path.join(shellvageDir, 'config.json');
export const exportsDir = path.join(shellvageDir, 'exports');
export const hooksDir = path.join(shellvageDir, 'hooks');

export function ensureDirs() {
  if (!fs.existsSync(shellvageDir)) fs.mkdirSync(shellvageDir, { recursive: true });
  if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });
  if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });
}
