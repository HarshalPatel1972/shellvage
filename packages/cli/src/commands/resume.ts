import { readConfig, writeConfig } from '../utils/config';
import { palette } from '../brand';

export function resume() {
  const config = readConfig();
  config.recording = true;
  writeConfig(config);
  console.log(palette.signal('⬤ shellvage recording resumed'));
}
