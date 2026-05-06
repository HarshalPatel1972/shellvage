import { ExportSession } from './builder';

export function renderTxt(session: ExportSession): string {
  let txt = `Session — ${session.date}\n`;
  txt += `Duration: ${session.duration} | Shell: ${session.shell} | Machine: ${session.hostname}\n`;
  txt += `=========================================\n\n`;

  for (const section of session.sections) {
    txt += `[ ${section.directory} ]\n\n`;
    for (const cmd of section.commands) {
      txt += `> ${cmd.command}\n`;
      if (cmd.output) txt += `${cmd.output}\n`;
      if (cmd.annotation) txt += `Note: ${cmd.annotation}\n`;
      txt += `\n`;
    }
  }

  return txt;
}
