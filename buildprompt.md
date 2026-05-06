# Shellvage — FullBuildPrompt
> Shell + Salvage. Save your terminal sessions as documents, diffs, and summaries.

---

## 0. Prime Directive

You are building **Shellvage** — a globally-installed npm CLI package and companion Tauri v2 GUI app that silently records every terminal session and lets users export, search, summarize, and browse their work as readable documents (`.md`, `.pdf`, `.docx`, `.txt`, `.html`).

This is a **monorepo** with two packages:
- `packages/cli` → npm package, published as `shellvage`
- `packages/app` → Tauri v2 + React GUI app

**Constraints (non-negotiable):**
- Free tier only. No paid services. No credit card required.
- No Fly.io. Vercel for any web deployment if needed.
- Fully local — no cloud, no server, no account required in v1.
- Graceful degradation — if Shellvage errors for ANY reason, it fails silently. The user's shell is NEVER blocked.
- Atomic conventional commits. One logical unit per commit. Git history must read as a chronological build story.
- Always add something innovative that similar tools don't have.

---

## 1. Product Identity

| Key | Value |
|---|---|
| **Name** | Shellvage |
| **Tagline** | "Salvage your sessions." |
| **Hero copy** | "Every other tool records your terminal so you can watch it again. Shellvage records it so you can use it again." |
| **npm package** | `shellvage` |
| **GitHub repo** | `github.com/HarshalPatel1972/shellvage` |
| **Repo structure** | Monorepo — `packages/cli` + `packages/app` |

---

## 2. Brand & Visual Identity

### CLI Brand Palette — "Salvage Amber"

| Token | Hex | Usage |
|---|---|---|
| `ember` | `#E8A045` | Wordmark, primary accents |
| `ash` | `#A0A0A0` | Tagline, secondary text, borders |
| `ink` | `#0D0D0D` | Background |
| `signal` | `#4ADE80` | Recording indicator ● |
| `muted` | `#555555` | Paused indicator ○, disabled state |
| `error` | `#FF4444` | Failed commands, warnings |
| `info` | `#60A5FA` | Info messages, update notices |

Rendered with `chalk` — zero extra font dependencies.

### CLI Wordmark (shown on every explicit `shellvage` command)

```
  ⬡  shellvage  v{version}
     salvage your sessions
```

Rendered as: `ember` for `⬡ shellvage`, `ash` for tagline, `muted` for version. Compact. Never more than 2 lines. No ASCII art banners.

### GUI Palette (Tauri App)

| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#0D0D0F` | App background |
| `bg-panel` | `#141416` | Session list, side panels |
| `bg-surface` | `#1A1A1E` | Command cards, code blocks |
| `bg-hover` | `#222228` | Hover states |
| `border` | `#2A2A32` | Dividers, card borders |
| `ember` | `#E8A045` | Brand accent, active states |
| `text-primary` | `#E8E8E6` | Main content |
| `text-secondary` | `#A0A0A0` | Metadata, timestamps |
| `text-muted` | `#555555` | Placeholders |
| `signal` | `#4ADE80` | Success, recording |
| `error` | `#FF4444` | Failed commands |
| `annotation` | `#E8A045` | Annotated commands |

**Fonts:**
- UI chrome: `Inter` (sans-serif)
- Commands + outputs: `JetBrains Mono` (monospace)

---

## 3. Full File & Folder Structure

```
shellvage/
├── package.json                  # npm workspaces root
├── .gitignore
├── .github/
│   └── workflows/
│       ├── release-cli.yml       # publish npm on tag
│       └── release-app.yml       # build + release Tauri binaries
├── packages/
│   ├── cli/
│   │   ├── package.json          # name: "shellvage", bin: { shellvage: "./dist/index.js" }
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts          # CLI entry — parses argv, routes commands
│   │   │   ├── brand.ts          # wordmark, chalk palette, box renderer
│   │   │   ├── commands/
│   │   │   │   ├── pause.ts
│   │   │   │   ├── resume.ts
│   │   │   │   ├── status.ts
│   │   │   │   ├── tag.ts
│   │   │   │   ├── note.ts
│   │   │   │   ├── export.ts
│   │   │   │   ├── summarize.ts
│   │   │   │   ├── standup.ts
│   │   │   │   ├── open.ts
│   │   │   │   ├── list.ts
│   │   │   │   ├── share.ts
│   │   │   │   ├── ignore.ts
│   │   │   │   ├── flush.ts
│   │   │   │   ├── doctor.ts
│   │   │   │   ├── version.ts
│   │   │   │   └── docs.ts
│   │   │   ├── capture/
│   │   │   │   ├── capture-cmd.ts    # invoked by preexec hook
│   │   │   │   ├── capture-result.ts # invoked by precmd hook
│   │   │   │   └── redact.ts         # secret masking before storage
│   │   │   ├── db/
│   │   │   │   ├── init.ts           # create tables if not exist
│   │   │   │   ├── session.ts        # session CRUD
│   │   │   │   └── command.ts        # command CRUD + FTS5 search
│   │   │   ├── export/
│   │   │   │   ├── builder.ts        # session → structured JSON intermediate
│   │   │   │   ├── md.ts             # → .md
│   │   │   │   ├── txt.ts            # → .txt
│   │   │   │   ├── html.ts           # → .html (also used by pdf)
│   │   │   │   ├── pdf.ts            # html → .pdf via puppeteer
│   │   │   │   └── docx.ts           # → .docx via docx npm package
│   │   │   ├── ai/
│   │   │   │   ├── provider.ts       # Groq → Gemini → HuggingFace fallback
│   │   │   │   └── prompts.ts        # summarize / standup prompt templates
│   │   │   ├── hooks/
│   │   │   │   ├── install.ts        # writes hooks into shell config on postinstall
│   │   │   │   ├── uninstall.ts      # removes hooks on npm uninstall
│   │   │   │   └── templates/
│   │   │   │       ├── shellvage.sh  # bash + zsh hook (preexec/precmd/PROMPT_COMMAND)
│   │   │   │       ├── shellvage.fish
│   │   │   │       └── shellvage.ps1 # PowerShell hook
│   │   │   ├── indicator/
│   │   │   │   └── prompt.ts         # injects ⬤/○ sv into RPROMPT / PS1
│   │   │   ├── updater/
│   │   │   │   └── check.ts          # async npm version check + notify
│   │   │   └── utils/
│   │   │       ├── paths.ts          # ~/.shellvage/* path constants
│   │   │       ├── config.ts         # read/write config.json
│   │   │       ├── ignore.ts         # .shellvageignore parser
│   │   │       └── git.ts            # detect git repo + branch from $PWD
│   │   └── scripts/
│   │       └── postinstall.ts        # runs hook installer after npm install -g
│   │
│   └── app/
│       ├── package.json
│       ├── src-tauri/
│       │   ├── Cargo.toml
│       │   ├── tauri.conf.json
│       │   └── src/
│       │       ├── main.rs
│       │       ├── db.rs             # rusqlite — reads ~/.shellvage/sessions.db
│       │       ├── commands.rs       # Tauri commands exposed to frontend
│       │       └── updater.rs        # tauri-plugin-updater integration
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           ├── components/
│           │   ├── layout/
│           │   │   ├── Sidebar.tsx       # sessions list + project/tag filters
│           │   │   ├── CommandView.tsx   # main session content panel
│           │   │   └── DetailPanel.tsx   # annotations, export, summary
│           │   ├── session/
│           │   │   ├── SessionCard.tsx
│           │   │   ├── CommandBlock.tsx  # command + output + copy button
│           │   │   ├── OutputBlock.tsx   # collapsible output
│           │   │   └── DiffView.tsx      # two sessions side by side
│           │   ├── ui/
│           │   │   ├── SearchBar.tsx     # full-text search across all sessions
│           │   │   ├── UpdateBadge.tsx   # bottom status bar update notice
│           │   │   ├── CommandPalette.tsx # ⌘K palette
│           │   │   └── ExportModal.tsx   # format picker slide-over
│           │   └── brand/
│           │       └── Logo.tsx          # ⬡ shellvage wordmark in GUI
│           ├── hooks/
│           │   ├── useSessions.ts
│           │   ├── useSearch.ts
│           │   └── useKeyboard.ts
│           └── styles/
│               └── globals.css          # CSS vars from brand palette
```

---

## 4. Data Layer

### Storage Location

```
~/.shellvage/
├── sessions.db          # SQLite — single source of truth
├── config.json          # user preferences
├── .shellvageignore     # dirs/patterns to never record
├── last-update-check    # timestamp, prevents spam
├── exports/             # default output dir for shellvage export
└── hooks/
    ├── shellvage.sh
    ├── shellvage.fish
    └── shellvage.ps1
```

### SQLite Schema

```sql
-- FTS5 enabled

CREATE TABLE sessions (
  id          TEXT PRIMARY KEY,   -- uuid v4
  started_at  INTEGER NOT NULL,   -- unix ms
  ended_at    INTEGER,
  shell       TEXT,               -- zsh | bash | fish | pwsh
  hostname    TEXT,
  username    TEXT,
  git_repo    TEXT,               -- remote origin URL if present
  tags        TEXT DEFAULT '[]',  -- JSON array of strings
  summary     TEXT,               -- AI-generated, nullable
  is_paused   INTEGER DEFAULT 0
);

CREATE TABLE commands (
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

-- Full-text search across all commands and outputs
CREATE VIRTUAL TABLE commands_fts USING fts5(
  command,
  output,
  annotation,
  content='commands',
  content_rowid='rowid'
);

-- Triggers to keep FTS in sync
CREATE TRIGGER commands_ai AFTER INSERT ON commands BEGIN
  INSERT INTO commands_fts(rowid, command, output, annotation)
  VALUES (new.rowid, new.command, new.output, new.annotation);
END;
```

### config.json Shape

```json
{
  "version": 1,
  "recording": true,
  "aiProvider": "groq",
  "aiKey": "",
  "exportDir": "~/.shellvage/exports",
  "densityMode": "comfortable",
  "updateCheckEnabled": true,
  "promptIndicator": true,
  "redactPatterns": []
}
```

---

## 5. Shell Hook Mechanism

### How It Works

On `npm install -g shellvage`, the postinstall script:
1. Detects which shells are present (`$SHELL`, checks for fish, pwsh)
2. Appends a single `source` line to each active shell config
3. Never duplicates — checks for the shellvage marker comment first
4. Reports what it did cleanly

```bash
# ~/.zshrc  (appended once)
# shellvage-hook-start
source ~/.shellvage/hooks/shellvage.sh
# shellvage-hook-end
```

### Bash/Zsh Hook (`shellvage.sh`)

```bash
#!/usr/bin/env bash

# Capture command BEFORE execution
shellvage_preexec() {
  __sv_cmd="$1"
  __sv_start=$(date +%s%3N)
}

# Capture result AFTER execution
shellvage_precmd() {
  local exit_code=$?
  if [ -n "$__sv_cmd" ]; then
    shellvage-capture-result \
      --cmd "$__sv_cmd" \
      --exit "$exit_code" \
      --dir "$PWD" \
      --start "$__sv_start" \
      &  # async — never blocks the shell
    unset __sv_cmd __sv_start
  fi
}

# Zsh hooks
if [ -n "$ZSH_VERSION" ]; then
  autoload -Uz add-zsh-hook
  add-zsh-hook preexec shellvage_preexec
  add-zsh-hook precmd shellvage_precmd
fi

# Bash hooks
if [ -n "$BASH_VERSION" ]; then
  trap 'shellvage_preexec "$BASH_COMMAND"' DEBUG
  PROMPT_COMMAND="shellvage_precmd${PROMPT_COMMAND:+; $PROMPT_COMMAND}"
fi

# Prompt indicator (right side)
# Appends ⬤ sv or ○ sv to RPROMPT (zsh) / PS1 (bash)
# Color: signal green when on, muted gray when paused
```

### Fish Hook (`shellvage.fish`)

```fish
function shellvage_preexec --on-event fish_preexec
  set -g __sv_cmd $argv[1]
  set -g __sv_start (date +%s%3N)
end

function shellvage_precmd --on-event fish_postexec
  shellvage-capture-result \
    --cmd $__sv_cmd \
    --exit $status \
    --dir $PWD \
    --start $__sv_start &
end
```

---

## 6. Capture & Redaction

### `capture-result.ts` Logic

```
1. Check .shellvageignore — if $PWD matches, skip silently
2. Check if recording is paused — if yes, skip silently
3. Get or create active session for this terminal (by $TERM_SESSION_ID / $PPID)
4. Run redact() on command string and output
5. Detect git repo + branch from $PWD traversal
6. Write to SQLite commands table
7. Update session.ended_at = now
```

### Redaction Patterns (`redact.ts`)

Auto-redact before anything touches disk:

```typescript
const PATTERNS = [
  /(?:password|passwd|pwd)\s*[=:]\s*\S+/gi,
  /(?:secret|token|key|api[_-]?key)\s*[=:]\s*\S+/gi,
  /sk-[a-zA-Z0-9]{20,}/g,          // OpenAI-style keys
  /ghp_[a-zA-Z0-9]{36}/g,           // GitHub PATs
  /AKIA[0-9A-Z]{16}/g,              // AWS Access Keys
  /(?:export\s+\w*(?:KEY|TOKEN|SECRET|PASSWORD)\w*\s*=\s*)\S+/g,
  /Bearer\s+[a-zA-Z0-9\-._~+/]+=*/g,
  /basic\s+[a-zA-Z0-9+/]+=*/gi,
];

export function redact(text: string): { text: string; wasRedacted: boolean } {
  // Replace matched patterns with [REDACTED]
  // Return original if no match
}
```

---

## 7. Export Engine

### Structured Intermediate Format

Before any format renderer runs, the raw session rows are assembled into a clean intermediate:

```typescript
interface ExportSession {
  id: string;
  date: string;         // human readable
  duration: string;     // "43 min"
  shell: string;
  hostname: string;
  gitRepo?: string;
  tags: string[];
  summary?: string;
  sections: ExportSection[];  // grouped by directory
}

interface ExportSection {
  directory: string;
  commands: ExportCommand[];
}

interface ExportCommand {
  timestamp: string;
  command: string;
  output: string;
  exitCode: number;
  durationMs: number;
  gitBranch?: string;
  annotation?: string;
  isRedacted: boolean;
}
```

### Markdown Renderer

```markdown
# Session — {date}
**Duration:** {duration} · **Shell:** {shell} · **Machine:** {hostname}
**Repo:** {gitRepo} · **Tags:** {tags}

{summary if present}

---

## ~/projects/kensho

**{timestamp}** · branch: `main`
```bash
npm run dev
```

<details>
<summary>Output (12 lines)</summary>

```
> kensho@1.0.0 dev
  ✓ compiled successfully
```

</details>

> 📝 Had to bump node version first
```

### PDF Renderer

HTML → PDF via `puppeteer`. The HTML template uses print-specific CSS:
- Page breaks before each directory section
- Monospace font for code blocks
- Syntax-highlighted output using highlight.js (bundled, no CDN)
- Footer with session date + page number
- Cover page: session metadata summary

### DOCX Renderer

Uses the `docx` npm package:
- Heading 1: session date
- Heading 2: each directory section
- Code block style: monospace, light gray background
- Normal text for outputs
- Italic for annotations

---

## 8. CLI Commands — Full Spec

### Global Behavior

Every explicit `shellvage` command (not background captures):
1. Prints the wordmark header (2 lines, chalk colored)
2. Runs the command
3. Async: checks for npm update. If found AND last check was >24h ago: prints update notice at bottom

### Command Reference

```
shellvage                         → show help + status overview
shellvage pause                   → pause recording, update indicator
shellvage resume                  → resume recording, update indicator  
shellvage status                  → recording on/off, session count, DB size

shellvage tag <label>             → tag current active session
shellvage tag --session <id> <label>
shellvage note "<text>"           → annotate the last captured command

shellvage export                  → export last session as .md to ./exports/
shellvage export --format <fmt>   → md | pdf | docx | txt | html
shellvage export --last <n>       → last N sessions merged into one doc
shellvage export --since "<expr>" → e.g. "2 days ago", "last monday"
shellvage export --project <name> → sessions filtered by git repo name
shellvage export --tag <label>    → sessions filtered by tag
shellvage export --output <path>  → custom output path
shellvage export --session <id>   → specific session by ID

shellvage summarize               → AI summary of last session
shellvage summarize --last <n>
shellvage standup                 → last 24h → standup bullet points

shellvage list                    → table of recent sessions (id, date, dir, duration, tags)
shellvage list --all
shellvage list --project <name>
shellvage open                    → launch GUI app

shellvage share                   → export last session as md → GitHub Gist → copy URL
shellvage ignore <path>           → add path to .shellvageignore
shellvage flush                   → delete all sessions (requires --confirm flag)
shellvage flush --before "<expr>" → delete sessions older than date

shellvage doctor                  → check hooks installed, DB accessible, version match
shellvage version                 → print version
shellvage docs                    → open docs URL in browser
shellvage config get <key>
shellvage config set <key> <val>
```

### Inline Annotation During Session

While recording, user can type:
```bash
#! Found the memory leak here
```
The `#!` prefix is intercepted by the capture engine. The text is stored as an annotation on the next command, NOT executed as a shell command.

---

## 9. Prompt Indicator

Injected by `shellvage.sh` into RPROMPT (zsh) / right side of PS1 (bash):

```
~/projects/kensho  git:main                    ⬤ sv
```

- `⬤ sv` — signal green (`#4ADE80`) — recording active
- `○ sv` — muted gray (`#555555`) — recording paused
- If `promptIndicator: false` in config — not shown at all
- For bash: appended to end of PS1 with a leading space
- For fish: added as `fish_right_prompt` function

---

## 10. Auto-Update

### CLI (`packages/cli/src/updater/check.ts`)

```typescript
// Runs async after every explicit shellvage command
// Non-blocking. Never delays the user.
async function checkForUpdate() {
  const lastCheck = readLastCheckTimestamp(); // ~/.shellvage/last-update-check
  if (Date.now() - lastCheck < 24 * 60 * 60 * 1000) return; // once per day max

  const latestVersion = await fetch('https://registry.npmjs.org/shellvage/latest')
    .then(r => r.json()).then(d => d.version).catch(() => null);

  if (!latestVersion) return;
  if (semver.gt(latestVersion, currentVersion)) {
    printUpdateNotice(currentVersion, latestVersion);
  }
  writeLastCheckTimestamp();
}
```

Update notice format:
```
  ╭─ update available ──────────────────────────╮
  │  shellvage v1.0.0  →  v1.1.0               │
  │  npm install -g shellvage                   │
  ╰──────────────────────────────────────────────╯
```

### GUI (Tauri `tauri-plugin-updater`)

```json
// tauri.conf.json
{
  "plugins": {
    "updater": {
      "endpoints": [
        "https://github.com/HarshalPatel1972/shellvage/releases/latest/download/latest.json"
      ],
      "dialog": false,
      "pubkey": "YOUR_TAURI_UPDATE_PUBKEY"
    }
  }
}
```

- Checks on app startup (async, non-blocking)
- If update available: shows `● Update available v1.1.0` in bottom status bar
- Clicking it opens a slide-over with changelog + "Install & Relaunch" button
- Uses GitHub Releases — `latest.json` is generated by `release-app.yml` CI

---

## 11. GUI App — Full Spec

### Stack
- Tauri v2
- React 18 + TypeScript
- Tailwind CSS (CSS vars from brand palette)
- `JetBrains Mono` + `Inter` fonts (bundled, no CDN)
- `rusqlite` in Rust backend — reads `~/.shellvage/sessions.db` directly

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ⬡ shellvage          [Search all sessions...  ⌘K]    [⚙]      │
├──────────────┬──────────────────────────────┬───────────────────┤
│ SESSIONS     │ May 7, 2026 · 43min          │ EXPORT            │
│              │ ~/projects/kensho · main     │ [MD] [PDF] [DOCX] │
│ Today        │ Tags: auth-bug               │                   │
│  ● 11:42 AM  │ ─────────────────────────── │ SUMMARY           │
│  ● 09:15 AM  │                              │ [Generate]        │
│              │ ~/projects/kensho/           │                   │
│ Yesterday    │ ┌─────────────────────────┐  │ ANNOTATE          │
│    08:30 PM  │ │ $ npm run dev      [⎘] │  │ [+ Add note]      │
│    03:12 PM  │ │ ▶ 12 lines         [+] │  │                   │
│              │ └─────────────────────────┘  │                   │
│ PROJECTS     │ ┌─────────────────────────┐  │                   │
│  kensho      │ │ $ git commit -m ... [⎘]│  │                   │
│  velocity    │ │ ✓ [main abc123]         │  │                   │
│  keyflex     │ └─────────────────────────┘  │                   │
│              │                              │                   │
│ TAGS         │ ~/projects/kensho/backend/   │                   │
│  auth-bug    │ ┌─────────────────────────┐  │                   │
│  deploy      │ │ $ go build ./...   [⎘] │  │                   │
│              │ │ ▶ 3 lines          [+] │  │                   │
└──────────────┴──────────────────────────┴───────────────────────┘
│ ⬤ Recording · 1,247 commands · 38 sessions         ● v1.1.0   │
└─────────────────────────────────────────────────────────────────┘
```

### Panel Specs

**Left Sidebar:**
- Sessions grouped by Today / Yesterday / This Week / Older
- Each session shows: time, primary directory, duration dot
- Projects section: auto-detected from git repos in sessions
- Tags section: all unique tags across sessions
- Clicking any session loads it in center panel

**Center Panel:**
- Session header: date, duration, shell, machine, git repo + branch, tags
- Commands grouped by directory (each directory = a visual section header)
- Each command card:
  - `$` prompt + command text in JetBrains Mono
  - Copy button `⎘` on the right (copies command only)
  - Output toggle `+` (expands/collapses output)
  - Output block: monospace, scrollable, max 20 lines then truncated with "Show more"
  - Exit code badge: green (0) or red (non-zero)
  - Annotation shown below if present (amber, italic)
- Failed commands (non-zero exit) have a subtle red left border

**Right Panel:**
- Export: three format buttons MD / PDF / DOCX (TXT and HTML in a "more" dropdown)
- Summary: "Generate" button (requires AI config) or shows existing summary
- Annotate: click any command in center → annotation text field appears here
- Session tags editor: add/remove tags inline

**Bottom Status Bar:**
- `⬤ Recording` or `○ Paused` (matches CLI indicator colors)
- Command count + session count
- `● v1.1.0 available` — update badge (amber, clickable → update slide-over)

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` | Open command palette |
| `⌘F` | Focus search bar |
| `⌘E` | Export current session as MD |
| `⌘⇧E` | Open export format picker |
| `⌘S` | Summarize current session |
| `J` / `K` | Navigate sessions in sidebar |
| `⌘D` | Open diff view (select two sessions) |
| `⎋` | Close panels / palettes |

### Diff View

Triggered via command palette or `⌘D`:
- Select two sessions from date picker
- Side-by-side view: left = session A, right = session B
- Highlight commands that appear in one but not the other
- Highlight outputs that differ significantly
- Useful for: "what did I do differently when deploying to prod vs staging?"

---

## 12. AI Integration

### Provider Chain

```
User has GROQ_API_KEY    → Groq llama3-8b-8192 (fast, free)
  fallback →  GEMINI_API_KEY  → Gemini Flash (generous free tier)
    fallback →  no key at all → HuggingFace Mistral (no key needed, slower)
```

Set via: `shellvage config set aiKey YOUR_KEY` or `config set aiProvider groq`

### Summarize Prompt

```
You are summarizing a developer's terminal session for personal documentation.

Session data (structured JSON):
{sessionJson}

Write a 3-5 sentence summary in past tense describing:
1. What directories were worked in
2. What the main tasks accomplished were
3. Any errors encountered and whether they were resolved
4. Any notable commands or operations

Be factual and concise. No bullet points. No preamble like "In this session...".
Write as if the developer is reading their own notes.
```

### Standup Prompt

```
You are generating a developer standup update from terminal session data.

Sessions from the last 24 hours:
{sessionsJson}

Generate 3-5 bullet points starting with "Yesterday I..." describing:
- What was built, fixed, or deployed
- What tools or services were used
- Any blockers encountered

Be specific, use technical terms where appropriate. Keep each bullet under 15 words.
```

---

## 13. GitHub Actions

### `release-cli.yml`

Triggered on `git tag v*`:
```yaml
- runs: npm publish --workspace packages/cli --access public
```

### `release-app.yml`

Triggered on same tag:
```yaml
- uses: tauri-apps/tauri-action@v0
  with:
    tagName: v__VERSION__
    releaseName: Shellvage v__VERSION__
    releaseBody: See CHANGELOG.md
    updaterJsonPreferNsis: true
```

Produces: `.dmg` (macOS), `.exe` installer (Windows), `.AppImage` (Linux) + `latest.json` for Tauri updater.

---

## 14. Atomic Commit Sequence

Build in this exact order. One commit per step:

```
feat(repo): initialize monorepo with npm workspaces
feat(cli): scaffold package.json, tsconfig, entry point
feat(brand): implement chalk wordmark, amber palette, box renderer
feat(db): initialize SQLite schema — sessions + commands + FTS5
feat(hooks): write shell hook templates for zsh/bash/fish/powershell
feat(hooks): implement postinstall script to inject hooks into shell configs
feat(capture): implement capture-cmd and capture-result binaries
feat(capture): add redact.ts with API key and secret pattern masking
feat(indicator): inject ⬤/○ sv prompt indicator into RPROMPT/PS1
feat(commands): implement pause, resume, status
feat(commands): implement tag and note
feat(commands): implement list with table formatter
feat(export): implement structured intermediate session builder
feat(export): add markdown renderer with directory grouping
feat(export): add txt renderer
feat(export): add html renderer with syntax highlight
feat(export): add pdf renderer via puppeteer
feat(export): add docx renderer via docx npm package
feat(commands): implement export command with format/filter flags
feat(ai): implement provider chain — groq → gemini → huggingface
feat(ai): add summarize and standup prompts + commands
feat(commands): implement open, share, ignore, flush, doctor, docs
feat(updater): implement async npm version check with 24h throttle
feat(app): scaffold Tauri v2 app with Rust backend
feat(app): implement rusqlite DB reader — sessions + commands queries
feat(app): implement Tauri commands for frontend data access
feat(app): build three-panel layout with brand palette + fonts
feat(app): implement session list sidebar with project/tag grouping
feat(app): implement command view with directory sections + copy buttons
feat(app): implement right panel — export, summarize, annotate
feat(app): add full-text search via FTS5 across all sessions
feat(app): implement keyboard shortcuts and command palette
feat(app): implement diff view for two-session comparison
feat(app): implement bottom status bar with recording state
feat(updater): integrate tauri-plugin-updater with GitHub Releases
feat(ci): add release-cli.yml for npm publish on tag
feat(ci): add release-app.yml for Tauri binary builds + latest.json
docs: write README with install, usage, features, and screenshots
```

---

## 15. README Structure

```markdown
# ⬡ Shellvage
> Salvage your sessions.

Every other tool records your terminal so you can watch it again.  
Shellvage records it so you can **use it again** — as a document, a diff, a summary, or a share.

## Install
npm install -g shellvage

Works immediately. No init. No config required.

## What it does
- Records every terminal session silently in the background
- Exports sessions as .md, .pdf, .docx, .txt, .html
- GUI app for browsing, searching, and exporting visually
- AI summaries and standup generation
- Auto-masks secrets before anything touches disk
- Works on macOS, Linux, Windows (WSL + PowerShell)

## Commands
[table]

## GUI App
[screenshot]

## Config
[table]

## Privacy
All data is local. ~/.shellvage/. Nothing leaves your machine unless you run shellvage share.
```

---

## 16. Innovation Checklist

These are the things no other tool does. Implement all of them:

- [ ] Always-on with zero initialization — hooks auto-install on `npm install -g`
- [ ] Export to `.docx` and `.pdf` with proper formatting (not raw dumps)
- [ ] Directory-aware export grouping — sections per `$PWD`
- [ ] Auto secret masking at capture time — before storage
- [ ] `#!` inline annotation syntax mid-session
- [ ] `shellvage standup` — AI-powered daily standup from sessions
- [ ] GUI session diff view — two sessions side by side
- [ ] Subtle prompt indicator `⬤ sv` — right-aligned, never in the way
- [ ] FTS5 full-text search across all sessions and outputs in the GUI
- [ ] Windows support (PowerShell hook) — asciinema explicitly doesn't
- [ ] `.shellvageignore` file — privacy control baked in from day one
- [ ] Per-command copy buttons in GUI — one click, no drag-select

---

*Built by Harshal Patel — github.com/HarshalPatel1972/shellvage*
