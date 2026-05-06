import { readConfig, writeConfig } from '../utils/config';
import { palette } from '../brand';

export function pause() {
  const config = readConfig();
  config.recording = false;
  writeConfig(config);
  console.log(palette.muted('○ shellvage recording paused'));
}
