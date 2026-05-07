import { useState } from 'react';
import { useSessions } from './hooks/useSessions';
import { useCommands } from './hooks/useCommands';
import Sidebar from './components/layout/Sidebar';
import CommandView from './components/layout/CommandView';

export default function App() {
  const { sessions, loading: sessionsLoading, error: sessionsError } = useSessions();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const { commands, loading: commandsLoading } = useCommands(selectedSessionId);

  const selectedSession = sessions.find(s => s.id === selectedSessionId);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-group">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">shellvage</span>
        </div>
        <div className="logo-group">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search all sessions...  ⌘K" 
              className="search-input"
            />
          </div>
          <button className="btn btn-secondary" style={{padding: '6px 10px'}}>⚙</button>
        </div>
      </header>

      <div className="main-wrapper">
        <Sidebar 
          sessions={sessions} 
          selectedId={selectedSessionId} 
          onSelect={setSelectedSessionId} 
        />
        
        <main className="content-area">
          {selectedSession ? (
            <>
              <div className="content-header">
                <div>
                  <h1 className="session-title">
                    {new Date(selectedSession.started_at).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h1>
                  <div className="session-meta">
                    <span>{selectedSession.shell}</span>
                    <span>{selectedSession.hostname}</span>
                    {selectedSession.git_repo && (
                      <span style={{color: 'var(--ember)'}}>{selectedSession.git_repo}</span>
                    )}
                  </div>
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button className="btn btn-secondary">Export</button>
                  <button className="btn btn-primary">Summarize</button>
                </div>
              </div>
              <CommandView commands={commands} />
            </>
          ) : (
            <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontStyle: 'italic'}}>
              Select a session from the sidebar to begin
            </div>
          )}
        </main>
      </div>

      <footer className="footer">
        <div className="recording-status">
          <div className="dot"></div>
          <span>Recording Active</span>
          <span style={{marginLeft: '12px'}}>{sessions.length} sessions</span>
        </div>
        <div>v1.0.0</div>
      </footer>
    </div>
  );
}
