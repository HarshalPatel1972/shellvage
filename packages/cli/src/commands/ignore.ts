import fs from 'fs';
import path from 'path';
import { shellvageDir } from '../utils/paths';
export function ignoreCmd(targetPath: string) {
  const ignoreFile = path.join(shellvageDir, '.shellvageignore');
  const resolved = path.resolve(targetPath);
  fs.appendFileSync(ignoreFile, resolved + '\n');
  console.log(`Added ${resolved} to .shellvageignore`);
}
