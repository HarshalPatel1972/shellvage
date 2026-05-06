import { installHooks } from '../hooks/install';

console.log('[shellvage] Running postinstall...');
try {
  installHooks();
  console.log('[shellvage] Hooks installed successfully.');
} catch (e) {
  console.error('[shellvage] Failed to install hooks:', e);
}
