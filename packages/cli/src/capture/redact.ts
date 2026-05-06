const PATTERNS = [
  /(?:password|passwd|pwd)\s*[=:]\s*\S+/gi,
  /(?:secret|token|key|api[_-]?key)\s*[=:]\s*\S+/gi,
  /sk-[a-zA-Z0-9]{20,}/g,
  /ghp_[a-zA-Z0-9]{36}/g,
  /AKIA[0-9A-Z]{16}/g,
  /(?:export\s+\w*(?:KEY|TOKEN|SECRET|PASSWORD)\w*\s*=\s*)\S+/g,
  /Bearer\s+[a-zA-Z0-9\-._~+/]+=*/g,
  /basic\s+[a-zA-Z0-9+/]+=*/gi,
];

export function redact(text: string): { text: string; wasRedacted: boolean } {
  let wasRedacted = false;
  let result = text;
  for (const pattern of PATTERNS) {
    result = result.replace(pattern, (match) => {
      wasRedacted = true;
      return '[REDACTED]';
    });
  }
  return { text: result, wasRedacted };
}
