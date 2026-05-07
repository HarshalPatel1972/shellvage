import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Command } from './useCommands';

export function useSearch() {
  const [results, setResults] = useState<Command[]>([]);
  const [searching, setSearching] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const data = await invoke<Command[]>('search_commands', { query });
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return { results, searching, search };
}
