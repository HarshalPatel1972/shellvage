import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

export interface Session {
  id: string;
  started_at: number;
  ended_at: number | null;
  shell: string | null;
  hostname: string | null;
  username: string | null;
  git_repo: string | null;
  tags: string;
  summary: string | null;
  is_paused: number;
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSessions = async () => {
    try {
      setLoading(true);
      const data = await invoke<Session[]>('get_sessions');
      setSessions(data);
      setError(null);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSessions();
    const interval = setInterval(refreshSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  return { sessions, loading, error, refreshSessions };
}
