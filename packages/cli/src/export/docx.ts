import { Document, Packer, Paragraph, TextRun } from 'docx';
import { ExportSession } from './builder';
import fs from 'fs';

export async function renderDocx(session: ExportSession, outPath: string) {
  const children: Paragraph[] = [
    new Paragraph({ text: `Session — ${session.date}`, heading: 'Heading1' as any }),
  ];

  for (const section of session.sections) {
    children.push(new Paragraph({ text: section.directory, heading: 'Heading2' as any }));
    for (const cmd of section.commands) {
      children.push(new Paragraph({ children: [new TextRun({ text: `$ ${cmd.command}`, font: 'Courier New' })] }));
      if (cmd.output) {
        children.push(new Paragraph({ children: [new TextRun({ text: cmd.output, font: 'Courier New', color: '666666' })] }));
      }
    }
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
}
