# ⬡ Shellvage

> **// salvage your sessions.** 

Shellvage is a background terminal recorder and companion GUI application designed for developers. It silently captures your terminal sessions, allowing you to export, search, summarize, and browse your daily command-line work as readable documents. Built for Windows with a cross-platform architecture and zero configuration required.

---

## ⚡ Features

- **Silent Background Recording**: Automatically records all commands, outputs, and exit codes without slowing down your terminal.
- **Smart Session Management**: Intelligently splits and groups commands into cohesive "sessions" based on timing and directory context.
- **Inline Annotation**: Add quick notes to your commands directly from the terminal prompt using `#! <text>` or `shellvage note`.
- **Advanced Export & Sharing**: Export your entire session or specific blocks to Markdown, PDF, HTML, or DOCX. Upload instantly to GitHub Gists with a single command.
- **AI-Powered Summaries**: Automatically generate daily standup bullet points or session summaries powered by AI.
- **Cross-Platform CLI**: A beautifully crafted, zero-config command-line interface featuring an ultra-wide, dual-tone typography engine.

---

## 🚀 Getting Started

Shellvage operates in two parts: a background daemon hooked into your shell profile, and a native GUI app to browse your history.

### 1. The Desktop App (Windows)
The easiest way to get started is to download the compiled setup file.
1. Go to the [Releases](https://github.com/HarshalPatel1972/shellvage/releases) page on this repository.
2. Download the latest `Shellvage_x.x.x_setup.exe`.
3. Run the installer to install the native GUI application on your machine.

### 2. The CLI Engine
To power the background recording and terminal annotations, you need the CLI tool installed globally.
Ensure you have Node.js (v18+) installed, then open your terminal and run:
```bash
npm install -g shellvage
```
*Note: If you are building from source instead, you can clone the repository, run `npm install`, and build the CLI manually.*

---

## 💻 Core Commands

The `shellvage` command provides complete control over your telemetry engine directly from the terminal.

| Command | Description |
| :--- | :--- |
| `shellvage` | Show help and massive ASCII status overview. |
| `shellvage pause` | Pause background recording. |
| `shellvage resume` | Resume background recording. |
| `shellvage status` | Show recording state, active session count, and DB size. |
| `shellvage list` | Display a table of recent sessions. |
| `shellvage open` | Launch the companion Shellvage GUI application. |

---

## 📝 Annotation & Tagging

Never lose context on a complex command string again. You can annotate your work in real-time.

```bash
# Tag the currently active session
shellvage tag "debugging-auth"

# Add a note to the last captured command
shellvage note "Fixed the invalid token expiration bug here"

# Pro Tip: Add notes instantly inline using the hash-bang syntax!
npm run build #! taking a while today
```

---

## 📤 Export & Share

Export your sessions into beautifully formatted documents.

```bash
# Export the last session to a Markdown file in the current directory
shellvage export --format md

# Merge the last 3 sessions into one PDF
shellvage export --format pdf --last 3

# Upload the last session to a private GitHub Gist and copy URL
shellvage share
```

---

## 🛠 Architecture

- **CLI Engine**: Built with TypeScript and Node.js.
- **GUI Application**: Built using Tauri (Rust) for minimal footprint and maximum performance on Windows.
- **Database**: Local SQLite database ensuring 100% data privacy and offline capability.

---

*Windows-Native · Telemetry Engine · Zero Config*