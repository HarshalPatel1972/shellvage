import Database from 'better-sqlite3';
import { dbPath, ensureDirs } from '../utils/paths';

export function getDb() {
  ensureDirs();
  const db = new Database(dbPath);
  
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id          TEXT PRIMARY KEY,
      started_at  INTEGER NOT NULL,
      ended_at    INTEGER,
      shell       TEXT,
      hostname    TEXT,
      username    TEXT,
      git_repo    TEXT,
      tags        TEXT DEFAULT '[]',
      summary     TEXT,
      is_paused   INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS commands (
      id           TEXT PRIMARY KEY,
      session_id   TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      timestamp    INTEGER NOT NULL,
      directory    TEXT NOT NULL,
      command      TEXT NOT NULL,
      output       TEXT DEFAULT '',
      exit_code    INTEGER,
      duration_ms  INTEGER,
      git_branch   TEXT,
      annotation   TEXT,
      is_redacted  INTEGER DEFAULT 0
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS commands_fts USING fts5(
      command,
      output,
      annotation,
      content='commands',
      content_rowid='rowid'
    );

    CREATE TRIGGER IF NOT EXISTS commands_ai AFTER INSERT ON commands BEGIN
      INSERT INTO commands_fts(rowid, command, output, annotation)
      VALUES (new.rowid, new.command, new.output, new.annotation);
    END;
  `);

  return db;
}
