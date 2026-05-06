#!/usr/bin/env node
import { renderWordmark } from './brand';
import { pause } from './commands/pause';
import { resume } from './commands/resume';
import { status } from './commands/status';
import { list } from './commands/list';
import { tag } from './commands/tag';
import { note } from './commands/note';
import { exportCmd } from './commands/export';
import { summarizeCmd } from './commands/summarize';
import { standupCmd } from './commands/standup';
import { openCmd } from './commands/open';
import { shareCmd } from './commands/share';
import { ignoreCmd } from './commands/ignore';
import { flushCmd } from './commands/flush';
import { doctorCmd } from './commands/doctor';
import { docsCmd } from './commands/docs';

renderWordmark('1.0.0');

const args = process.argv.slice(2);
const cmd = args[0];

switch (cmd) {
  case 'pause': pause(); break;
  case 'resume': resume(); break;
  case 'status': status(); break;
  case 'list': list({ all: args.includes('--all') }); break;
  case 'tag': tag(args[1], args.includes('--session') ? args[args.indexOf('--session')+1] : undefined); break;
  case 'note': note(args[1]); break;
  case 'export': exportCmd({ format: 'md' }); break;
  case 'summarize': summarizeCmd(); break;
  case 'standup': standupCmd(); break;
  case 'open': openCmd(); break;
  case 'share': shareCmd(); break;
  case 'ignore': ignoreCmd(args[1]); break;
  case 'flush': flushCmd(); break;
  case 'doctor': doctorCmd(); break;
  case 'docs': docsCmd(); break;
  default: console.log('Unknown command. Available commands: pause, resume, status, list, tag, note, export, summarize, standup, open, share, ignore, flush, doctor, docs'); break;
}
