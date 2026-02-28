---
name: web-dev
description: Browser automation and dev tools for visual-first debugging. Chrome DevTools MCP and Next.js DevTools MCP patterns.
globs: []
---

# Web Development - Browser Automation & Visual Debugging

**Visual-first debugging** for UI changes in React/Next.js applications.

## Core Philosophy

Never complete UI work without visual confirmation. Screenshots are the primary debugging tool -- DOM inspection is secondary.

## Workflow

For ANY UI changes:

1. **Code changes** -- navigate to page -- take screenshot
2. **Test interactions** -- check console errors -- verify API calls
3. **Verify** -- screenshot after changes -- compare before/after

```
Code change -> Navigate -> Screenshot -> Test -> Console check -> Network verify -> Screenshot
```

## Setup

Chrome DevTools MCP provides browser automation through the Chrome DevTools Protocol.

### Configuration Reference

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--", "--isolated", "--headless"]
    }
  }
}
```

**Key flags:**
- `--headless` -- runs Chrome without a visible window (default, always use unless explicitly requested otherwise)
- `--isolated` -- each MCP server process gets its own temporary Chrome profile (prevents cross-session conflicts)
- `--` separator -- required so npx forwards flags to the chrome-devtools-mcp binary

### Next.js DevTools MCP (Optional)

For Next.js 16+ apps, add server discovery and runtime diagnostics:

```json
{
  "mcpServers": {
    "next-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

## References

| Reference | Content |
|-----------|---------|
| **[browser-automation.md](references/browser-automation.md)** | Chrome DevTools MCP tools, context management, multi-agent patterns, debugging workflows |
| **[nextjs-devtools.md](references/nextjs-devtools.md)** | Next.js server discovery, error detection, combined client+server error coverage |
