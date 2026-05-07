import { Command } from '../../hooks/useCommands';
import CommandBlock from '../session/CommandBlock';

interface CommandViewProps {
  commands: Command[];
}

export default function CommandView({ commands }: CommandViewProps) {
  const groups: { directory: string; commands: Command[] }[] = [];
  let currentGroup: { directory: string; commands: Command[] } | null = null;

  commands.forEach((cmd) => {
    if (!currentGroup || currentGroup.directory !== cmd.directory) {
      currentGroup = { directory: cmd.directory, commands: [] };
      groups.push(currentGroup);
    }
    currentGroup.commands.push(cmd);
  });

  return (
    <div className="command-scroll">
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        {groups.map((group, i) => (
          <div key={i} className="directory-group">
            <div className="directory-header">
              <h3 className="directory-path">{group.directory}</h3>
              <div className="directory-line"></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {group.commands.map((cmd) => (
                <CommandBlock key={cmd.id} command={cmd} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}