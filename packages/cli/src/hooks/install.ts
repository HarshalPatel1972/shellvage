import fs from 'fs';
import path from 'path';
import os from 'os';
import { hooksDir, ensureDirs } from '../utils/paths';

export function installHooks() {
  ensureDirs();

  const templatesDir = path.join(__dirname, '../../src/hooks/templates');
  
  if (fs.existsSync(templatesDir)) {
    fs.copyFileSync(path.join(templatesDir, 'shellvage.sh'), path.join(hooksDir, 'shellvage.sh'));
    fs.copyFileSync(path.join(templatesDir, 'shellvage.fish'), path.join(hooksDir, 'shellvage.fish'));
    fs.copyFileSync(path.join(templatesDir, 'shellvage.ps1'), path.join(hooksDir, 'shellvage.ps1'));
  } else {
    console.warn('[shellvage] Warning: templates directory not found');
  }

  const homedir = os.homedir();
  
  const inject = (file: string, lines: string[]) => {
    const fullPath = path.join(homedir, file);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf-8');
    if (content.includes('# shellvage-hook-start')) return;
    
    content += '\n# shellvage-hook-start\n' + lines.join('\n') + '\n# shellvage-hook-end\n';
    fs.writeFileSync(fullPath, content);
    console.log(`[shellvage] Installed hook in ${file}`);
  };

  inject('.zshrc', [`source ~/.shellvage/hooks/shellvage.sh`]);
  inject('.bashrc', [`source ~/.shellvage/hooks/shellvage.sh`]);
  
  const fishConfig = path.join('.config', 'fish', 'config.fish');
  inject(fishConfig, [`source ~/.shellvage/hooks/shellvage.fish`]);

  const psConfig = path.join('Documents', 'PowerShell', 'Microsoft.PowerShell_profile.ps1');
  inject(psConfig, [`. ~/.shellvage/hooks/shellvage.ps1`]);
}
