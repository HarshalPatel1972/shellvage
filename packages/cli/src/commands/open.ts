import { exec } from 'child_process';
import path from 'path';

export function openCmd() {
  console.log('Opening Shellvage GUI...');
  
  // In development, we can try to run npm run tauri dev in the app package
  // But for a published package, it would be an executable.
  // For now, let's assume we are in the monorepo dev environment.
  
  const appDir = path.resolve(__dirname, '../../../app');
  
  // Try to run tauri dev
  const child = exec('npm run tauri dev', { cwd: appDir });
  
  child.stdout?.on('data', (data) => console.log(data));
  child.stderr?.on('data', (data) => console.error(data));
}
