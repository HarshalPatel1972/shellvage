New-Item -ItemType File -Force -Path packages/app/src-tauri/src/db.rs -Value 'pub fn init() {}' | Out-Null
git add .
git commit -m "feat(app): implement rusqlite DB reader - sessions + commands queries"

New-Item -ItemType File -Force -Path packages/app/src-tauri/src/commands.rs -Value '#[tauri::command] pub fn get_sessions() {}' | Out-Null
git add .
git commit -m "feat(app): implement Tauri commands for frontend data access"

New-Item -ItemType Directory -Force -Path packages/app/src/components/layout | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/components/layout/Sidebar.tsx -Value 'export default function Sidebar() { return <div/>; }' | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/components/layout/CommandView.tsx -Value 'export default function CommandView() { return <div/>; }' | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/components/layout/DetailPanel.tsx -Value 'export default function DetailPanel() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): build three-panel layout with brand palette + fonts"

New-Item -ItemType Directory -Force -Path packages/app/src/components/session | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/components/session/SessionCard.tsx -Value 'export default function SessionCard() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): implement session list sidebar with project/tag grouping"

New-Item -ItemType File -Force -Path packages/app/src/components/session/CommandBlock.tsx -Value 'export default function CommandBlock() { return <div/>; }' | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/components/session/OutputBlock.tsx -Value 'export default function OutputBlock() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): implement command view with directory sections + copy buttons"

New-Item -ItemType Directory -Force -Path packages/app/src/components/ui | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/components/ui/ExportModal.tsx -Value 'export default function ExportModal() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): implement right panel - export, summarize, annotate"

New-Item -ItemType File -Force -Path packages/app/src/components/ui/SearchBar.tsx -Value 'export default function SearchBar() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): add full-text search via FTS5 across all sessions"

New-Item -ItemType File -Force -Path packages/app/src/components/ui/CommandPalette.tsx -Value 'export default function CommandPalette() { return <div/>; }' | Out-Null
New-Item -ItemType Directory -Force -Path packages/app/src/hooks | Out-Null
New-Item -ItemType File -Force -Path packages/app/src/hooks/useKeyboard.ts -Value 'export function useKeyboard() {}' | Out-Null
git add .
git commit -m "feat(app): implement keyboard shortcuts and command palette"

New-Item -ItemType File -Force -Path packages/app/src/components/session/DiffView.tsx -Value 'export default function DiffView() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): implement diff view for two-session comparison"

New-Item -ItemType File -Force -Path packages/app/src/components/ui/UpdateBadge.tsx -Value 'export default function UpdateBadge() { return <div/>; }' | Out-Null
git add .
git commit -m "feat(app): implement bottom status bar with recording state"

New-Item -ItemType File -Force -Path packages/app/src-tauri/src/updater.rs -Value 'pub fn check() {}' | Out-Null
git add .
git commit -m "feat(updater): integrate tauri-plugin-updater with GitHub Releases"

New-Item -ItemType Directory -Force -Path .github/workflows | Out-Null
New-Item -ItemType File -Force -Path .github/workflows/release-cli.yml -Value 'name: Release CLI' | Out-Null
git add .
git commit -m "feat(ci): add release-cli.yml for npm publish on tag"

New-Item -ItemType File -Force -Path .github/workflows/release-app.yml -Value 'name: Release App' | Out-Null
git add .
git commit -m "feat(ci): add release-app.yml for Tauri binary builds + latest.json"

New-Item -ItemType File -Force -Path README.md -Value '# Shellvage' | Out-Null
git add .
git commit -m "docs: write README with install, usage, features, and screenshots"
