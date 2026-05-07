import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { sessionsDbPath, ensureDirs } from '../utils/paths';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (db) return db;

  ensureDirs();

  db = await open({
    filename: sessionsDbPath,
    driver: sqlite3.Database
  });

  await db.exec('PRAGMA foreign_keys = ON;');
  await db.exec('PRAGMA journal_mode = WAL;');

  // Sessions Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      started_at INTEGER NOT NULL,
      ended_at INTEGER,
      shell TEXT,
      hostname TEXT,
      username TEXT,
      git_repo TEXT,
      tags TEXT DEFAULT '[]',
      summary TEXT,
      is_paused INTEGER DEFAULT 0
    );
  `);

  // Commands Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS commands (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      directory TEXT NOT NULL,
      command TEXT NOT NULL,
      output TEXT,
      exit_code INTEGER,
      duration_ms INTEGER,
      git_branch TEXT,
      annotation TEXT,
      is_redacted INTEGER DEFAULT 0,
      FOREIGN KEY(session_id) REFERENCES sessions(id)
    );
  `);

  // FTS5 Virtual Table for Search
  await db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS commands_fts USING fts5(
      command,
      output,
      annotation,
      content='commands',
      content_rowid='rowid'
    );
  `);

  // Triggers to sync FTS
  await db.exec(`
    CREATE TRIGGER IF NOT EXISTS commands_ai AFTER INSERT ON commands BEGIN
      INSERT INTO commands_fts(rowid, command, output, annotation) 
      VALUES (new.rowid, new.command, new.output, new.annotation);
    END;
  `);

  return db;
}
