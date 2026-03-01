# Claude Code Hooks

Hooks are shell commands that execute automatically in response to Claude Code events. Use them for instant feedback during development -- formatting, validation, and safety checks that run without waiting for CI.

## Available Hook Events

| Event | Fires When | Use Case |
|---|---|---|
| `PreToolUse` | Before a tool executes | Block dangerous operations, validate inputs |
| `PostToolUse` | After a tool executes | Auto-format files, run linters, notify |
| `SessionStart` | Session begins | Set up environment, check prerequisites |
| `SessionEnd` | Session ends | Clean up, save state |
| `Stop` | Agent finishes responding | Verification reminders, summary checks |

## Configuration

Hooks are defined in `.claude/settings.json` (shared, committed) or `.claude/settings.local.json` (personal, gitignored).

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }
    ]
  }
}
```

### Hook Format

Each hook entry has:
- **`matcher`** (optional): Regex pattern to match tool name or arguments. Omit to match all events of that type.
- **`command`**: Shell command to execute. Has access to environment variables set by Claude Code.

### Environment Variables

| Variable | Available In | Value |
|---|---|---|
| `CLAUDE_FILE_PATH` | `PostToolUse(Write\|Edit)` | Path of the written/edited file |
| `CLAUDE_TOOL_NAME` | `PreToolUse`, `PostToolUse` | Name of the tool being used |

## Practical Examples for This Stack

### Auto-Format After File Writes

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }
    ]
  }
}
```

Runs Prettier on every file Claude writes or edits. The `|| true` prevents hook failures from blocking work.

### Verification Reminder on Stop

```json
{
  "hooks": {
    "Stop": [
      {
        "command": "echo 'Reminder: run check-types, lint, test:ci before committing'"
      }
    ]
  }
}
```

Displays a reminder after Claude finishes responding. Lightweight nudge to verify.

### Block Writes to Sensitive Files

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "echo \"$CLAUDE_FILE_PATH\" | grep -qE '(\\.env|node_modules|pnpm-lock\\.yaml)' && echo 'BLOCKED: Cannot write to protected file' && exit 1 || true"
      }
    ]
  }
}
```

Prevents accidental writes to `.env` files, `node_modules`, and lockfiles. Exit code 1 blocks the tool execution.

### Lint After TypeScript Edits

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "echo \"$CLAUDE_FILE_PATH\" | grep -qE '\\.(ts|tsx)$' && npx eslint --fix \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
      }
    ]
  }
}
```

## Hooks vs CI

| Concern | Hooks | CI (GitHub Actions) |
|---|---|---|
| **When** | During development, instant | On push/PR, async |
| **Speed** | Milliseconds | Minutes |
| **Scope** | Single file or reminder | Full repo verification |
| **Purpose** | Instant feedback, safety rails | Merge gating, full test suite |
| **Failure** | Blocks single tool call | Blocks merge |

Use hooks for fast, local feedback. Use CI for comprehensive verification before merge. They complement each other -- hooks catch issues early, CI catches everything.

## Tips

- Keep hook commands fast (<1 second). Slow hooks degrade the development experience.
- Use `|| true` on non-critical hooks to prevent blocking on formatter/linter errors.
- Use `&& exit 1` on critical hooks (PreToolUse) to actually block dangerous operations.
- Test hooks by running the command manually before adding to config.
- Use `.claude/settings.local.json` for personal preferences, `.claude/settings.json` for team standards.
