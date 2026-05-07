import { useState } from 'react';
import { Command } from '../../hooks/useCommands';

interface CommandBlockProps {
  command: Command;
}

export default function CommandBlock({ command }: CommandBlockProps) {
  const [expanded, setExpanded] = useState(false);

  const hasOutput = command.output && command.output.trim().length > 0;
  const isFailed = command.exit_code !== null && command.exit_code !== 0;

  return (
    <div className={`command-block ${isFailed ? 'failed' : ''}`}>
      <div className="command-row">
        <span className="command-prompt">$</span>
        <div className="command-text">{command.command}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {command.exit_code !== null && (
            <span style={{
              fontSize: '9px', 
              fontWeight: 600,
              padding: '2px 8px', 
              borderRadius: '4px',
              textTransform: 'uppercase',
              background: isFailed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: isFailed ? 'var(--error)' : 'var(--signal)',
              border: `1px solid ${isFailed ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
            }}>
              {isFailed ? `ERROR ${command.exit_code}` : 'SUCCESS'}
            </span>
          )}
          {hasOutput && (
            <button 
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-muted)', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {expanded ? '−' : '+'}
            </button>
          )}
        </div>
      </div>
      
      {command.annotation && (
        <div style={{padding: '0 16px 12px', color: 'var(--ember)', fontStyle: 'italic', fontSize: '11px'}}>
          📝 {command.annotation}
        </div>
      )}

      {expanded && hasOutput && (
        <div className="output-container">
          <pre className="output-box">{command.output}</pre>
        </div>
      )}
    </div>
  );
}