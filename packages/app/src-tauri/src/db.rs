use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Debug)]
pub struct Session {
    pub id: String,
    pub started_at: i64,
    pub ended_at: Option<i64>,
    pub shell: Option<String>,
    pub hostname: Option<String>,
    pub username: Option<String>,
    pub git_repo: Option<String>,
    pub tags: String,
    pub summary: Option<String>,
    pub is_paused: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Command {
    pub id: String,
    pub session_id: String,
    pub timestamp: i64,
    pub directory: String,
    pub command: String,
    pub output: Option<String>,
    pub exit_code: Option<i32>,
    pub duration_ms: Option<i32>,
    pub git_branch: Option<String>,
    pub annotation: Option<String>,
    pub is_redacted: i32,
}

fn get_db_path() -> PathBuf {
    let mut path = dirs::home_dir().expect("Could not find home directory");
    path.push(".shellvage");
    path.push("sessions.db");
    path
}

pub fn fetch_sessions() -> Result<Vec<Session>> {
    let conn = Connection::open(get_db_path())?;
    let mut stmt = conn.prepare("SELECT id, started_at, ended_at, shell, hostname, username, git_repo, tags, summary, is_paused FROM sessions ORDER BY started_at DESC")?;
    let session_iter = stmt.query_map([], |row| {
        Ok(Session {
            id: row.get(0)?,
            started_at: row.get(1)?,
            ended_at: row.get(2)?,
            shell: row.get(3)?,
            hostname: row.get(4)?,
            username: row.get(5)?,
            git_repo: row.get(6)?,
            tags: row.get(7)?,
            summary: row.get(8)?,
            is_paused: row.get(9)?,
        })
    })?;

    let mut sessions = Vec::new();
    for session in session_iter {
        sessions.push(session?);
    }
    Ok(sessions)
}

pub fn fetch_commands(session_id: &str) -> Result<Vec<Command>> {
    let conn = Connection::open(get_db_path())?;
    let mut stmt = conn.prepare("SELECT id, session_id, timestamp, directory, command, output, exit_code, duration_ms, git_branch, annotation, is_redacted FROM commands WHERE session_id = ? ORDER BY timestamp ASC")?;
    let command_iter = stmt.query_map([session_id], |row| {
        Ok(Command {
            id: row.get(0)?,
            session_id: row.get(1)?,
            timestamp: row.get(2)?,
            directory: row.get(3)?,
            command: row.get(4)?,
            output: row.get(5)?,
            exit_code: row.get(6)?,
            duration_ms: row.get(7)?,
            git_branch: row.get(8)?,
            annotation: row.get(9)?,
            is_redacted: row.get(10)?,
        })
    })?;

    let mut commands = Vec::new();
    for command in command_iter {
        commands.push(command?);
    }
    Ok(commands)
}

pub fn search_commands(query: &str) -> Result<Vec<Command>> {
    let conn = Connection::open(get_db_path())?;
    let mut stmt = conn.prepare("
        SELECT c.id, c.session_id, c.timestamp, c.directory, c.command, c.output, c.exit_code, c.duration_ms, c.git_branch, c.annotation, c.is_redacted 
        FROM commands c
        JOIN commands_fts f ON f.rowid = c.rowid
        WHERE commands_fts MATCH ?
        ORDER BY timestamp DESC
    ")?;
    let command_iter = stmt.query_map([query], |row| {
        Ok(Command {
            id: row.get(0)?,
            session_id: row.get(1)?,
            timestamp: row.get(2)?,
            directory: row.get(3)?,
            command: row.get(4)?,
            output: row.get(5)?,
            exit_code: row.get(6)?,
            duration_ms: row.get(7)?,
            git_branch: row.get(8)?,
            annotation: row.get(9)?,
            is_redacted: row.get(10)?,
        })
    })?;

    let mut commands = Vec::new();
    for command in command_iter {
        commands.push(command?);
    }
    Ok(commands)
}