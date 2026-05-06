import { readConfig } from '../utils/config';
import { palette, renderBox } from '../brand';

export function status() {
  const config = readConfig();
  const stateStr = config.recording ? palette.signal('⬤ Recording active') : palette.muted('○ Recording paused');
  renderBox('Status', [
    `State: ${stateStr}`
  ]);
}
