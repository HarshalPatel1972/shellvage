import { Session } from '../../hooks/useSessions';

interface SidebarProps {
  sessions: Session[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function Sidebar({ sessions, selectedId, onSelect }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Sessions</h2>
      </div>
      <div className="session-list">
        {sessions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`session-item ${selectedId === s.id ? 'active' : ''}`}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
              <span style={{color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500}}>
                {new Date(s.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={{color: 'var(--text-muted)', fontSize: '10px'}}>{s.shell}</span>
            </div>
            <div style={{color: 'var(--text-secondary)', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {s.git_repo || 'No Project'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}