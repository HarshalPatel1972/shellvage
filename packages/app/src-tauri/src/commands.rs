use crate::db::{self, Session, Command};

#[tauri::command]
pub fn get_sessions() -> Result<Vec<Session>, String> {
    db::fetch_sessions().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_commands(session_id: String) -> Result<Vec<Command>, String> {
    db::fetch_commands(&session_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn search_commands(query: String) -> Result<Vec<Command>, String> {
    db::search_commands(&query).map_err(|e| e.to_string())
}