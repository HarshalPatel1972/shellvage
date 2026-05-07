import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

export interface Command {
  id: string;
  session_id: string;
  timestamp: number;
  directory: string;
  command: string;
  output: string | null;
  exit_code: number | null;
  duration_ms: number | null;
  git_branch: string | null;
  annotation: string | null;
  is_redacted: number;
}

export function useCommands(sessionId: string | null) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setCommands([]);
      return;
    }

    const fetchCommands = async () => {
      try {
        setLoading(true);
        const data = await invoke<Command[]>('get_commands', { sessionId });
        setCommands(data);
        setError(null);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchCommands();
    const interval = setInterval(fetchCommands, 2000);
    return () => clearInterval(interval);
  }, [sessionId]);

  return { commands, loading, error };
}
