import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Command } from '../../hooks/useCommands';
import CommandBlock from './CommandBlock';

interface DiffViewProps {
  sessionAId: string;
  sessionBId: string;
}

export default function DiffView({ sessionAId, sessionBId }: DiffViewProps) {
  const [commandsA, setCommandsA] = useState<Command[]>([]);
  const [commandsB, setCommandsB] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [a, b] = await Promise.all([
          invoke<Command[]>('get_commands', { sessionId: sessionAId }),
          invoke<Command[]>('get_commands', { sessionId: sessionBId })
        ]);
        setCommandsA(a);
        setCommandsB(b);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sessionAId, sessionBId]);

  if (loading) return <div className="p-8 text-[var(--text-muted)]">Calculating diff...</div>;

  return (
    <div className="flex h-full overflow-hidden bg-[var(--bg-base)]">
      <div className="flex-1 overflow-y-auto p-4 border-r border-[var(--border)]">
        <h3 className="text-[var(--text-muted)] text-[10px] uppercase font-bold mb-4">Session A</h3>
        <div className="space-y-2">
          {commandsA.map(c => <CommandBlock key={c.id} command={c} />)}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-[var(--text-muted)] text-[10px] uppercase font-bold mb-4">Session B</h3>
        <div className="space-y-2">
          {commandsB.map(c => <CommandBlock key={c.id} command={c} />)}
        </div>
      </div>
    </div>
  );
}