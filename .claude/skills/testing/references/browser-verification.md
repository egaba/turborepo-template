# Browser Verification

MCP-based browser tools for visual debugging and verification. Organized by tool.

## Chrome DevTools MCP

### Setup

Add to `.claude/settings.json`:

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

Flags: `--headless` (always), `--isolated` (unique profile per process). Prerequisites: Node.js 18+, Chrome stable.

### Core Tools

```javascript
// Navigation & Visual
navigate_page(url: "http://localhost:3000")
navigate_page(type: "reload")
take_screenshot()                         // viewport
take_screenshot(fullPage: true)           // full page
take_snapshot()                           // DOM structure + element UIDs

// Interaction (use UIDs from take_snapshot)
click(uid: "abc123")
fill(uid: "email-uid", value: "user@example.com")
fill_form(elements: [{ uid: "email-uid", value: "..." }, { uid: "pass-uid", value: "..." }])
press_key(key: "Enter")

// Debugging
list_console_messages(types: ["error"])
list_network_requests(resourceTypes: ["fetch", "xhr"])
get_network_request(reqid: 123)
evaluate_script(function: "() => document.title")
resize_page(width: 375, height: 667)

// Page Management
new_page(url: "http://localhost:3000", background: true)
close_page(pageId: 1)
list_pages()
```

### Context Management

Chrome DevTools MCP shares browser context. Clear state before testing:

```javascript
evaluate_script(function: `() => {
  localStorage.clear(); sessionStorage.clear();
  document.cookie.split(';').forEach(c => {
    document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });
}`)
navigate_page(url: "http://localhost:3000")
```

### Multi-Agent Limitations

Agent teams share MCP connections. Problems: page hijacking, form contamination, session cookie sharing. Run browser agents sequentially. For multi-context (premium vs free), use `isolatedContext` on `new_page()`.

## Cursor IDE Browser MCP

Built-in, no installation. Use `browser_snapshot` to get element refs before interactions.

### Lock/Unlock Workflow

Order: `browser_navigate` -> `browser_lock` -> (interactions) -> `browser_unlock`

### Core Tools

| Action     | Tool                                               | Notes                           |
| ---------- | -------------------------------------------------- | ------------------------------- |
| Navigate   | `browser_navigate`                                 | Load URL                        |
| Snapshot   | `browser_snapshot`                                 | Structure + refs for click/type |
| Screenshot | `browser_screenshot`                               | Visual capture                  |
| Click      | `browser_click`                                    | Use ref from snapshot           |
| Type/Fill  | `browser_type` (append) / `browser_fill` (replace) |                                 |
| Resize     | `browser_resize`                                   | Viewport dimensions             |
| Console    | `browser_console_messages`                         | Client-side errors              |
| Network    | `browser_network_requests`                         | API calls                       |
| Storage    | `browser_get_storage` / `browser_clear_storage`    |                                 |

Prefer short incremental waits (1-3s) with `browser_snapshot` checks over long waits.

## Next.js DevTools MCP

Two use cases: check if app is running + get server-side errors.

```javascript
// 1. Discover running servers
mcp__next - devtools__nextjs_index()
mcp__next - devtools__nextjs_index({ port: '3000' })

// 2. Get server errors (compilation, SSR, API route)
mcp__next - devtools__nextjs_call({ port: '3000', toolName: 'get_errors' })
```

Use together with browser console for complete error coverage: server errors (DevTools MCP) + client errors (browser console).

| App   | Port |
| ----- | ---- |
| app-1 | 3000 |
| app-2 | 3001 |

## Best Practices

1. **Screenshot first** — visual confirmation before DOM inspection
2. **Console monitoring** — check React errors after interactions
3. **Network monitoring** — verify API calls for auth and data flow
4. **Fresh context** — clear storage before each test session
5. **Clean up** — close pages when done
