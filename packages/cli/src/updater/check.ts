import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { shellvageDir } from '../utils/paths';
import { renderBox } from '../brand';

export async function checkForUpdate(currentVersion: string) {
  const lastCheckPath = path.join(shellvageDir, 'last-update-check');
  
  let lastCheck = 0;
  try {
    lastCheck = parseInt(fs.readFileSync(lastCheckPath, 'utf8'), 10);
  } catch (e) {}

  if (Date.now() - lastCheck < 24 * 60 * 60 * 1000) return;

  try {
    const res = await fetch('https://registry.npmjs.org/shellvage/latest');
    const data = await res.json() as any;
    const latestVersion = data.version;

    if (latestVersion && semver.gt(latestVersion, currentVersion)) {
      renderBox('update available', [
        `shellvage v${currentVersion}  ->  v${latestVersion}`,
        `npm install -g shellvage`
      ]);
    }

    fs.writeFileSync(lastCheckPath, Date.now().toString());
  } catch (e) {
    // silently fail
  }
}
