import { getDb } from '../db/init';
import { palette } from '../brand';

export function note(text: string) {
  const db = getDb();
  const stmt = db.prepare(`SELECT id, annotation FROM commands ORDER BY timestamp DESC LIMIT 1`);
  const row = stmt.get() as { id: string, annotation: string | null } | undefined;
  
  if (!row) {
    console.log(palette.error('No previous command found to annotate.'));
    return;
  }

  let newAnnotation = row.annotation ? row.annotation + '\n' + text : text;
  
  const updateStmt = db.prepare(`UPDATE commands SET annotation = ? WHERE id = ?`);
  updateStmt.run(newAnnotation, row.id);
  
  console.log(palette.signal('Annotated last command.'));
}
