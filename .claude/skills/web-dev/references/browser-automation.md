# Browser Automation - Chrome DevTools MCP Guide

Complete guide for browser automation debugging using Chrome DevTools MCP.

## Setup

### Configuration

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

**Key flags:**
- `--headless` -- always use headless mode. Browsers must never appear in the foreground unless the user explicitly requests it.
- `--isolated` -- each MCP server process gets its own temporary Chrome profile.
- `--` separator -- required so npx forwards the flags to the binary (without it, npx silently swallows `--isolated` and `--headless`).

### Prerequisites

- Node.js 18+
- Chrome browser (current stable version)

## Browser Context Management

### Fresh Context (Default)

Always start browser sessions with a clean state. Chrome DevTools MCP shares browser context across pages, so cookies, localStorage, and sessionStorage persist from previous sessions. **Clear state before testing:**

```javascript
// 1. Open a new page
mcp__chrome-devtools__new_page({ url: "about:blank", background: true })

// 2. Clear all browser storage
mcp__chrome-devtools__evaluate_script({ function: `() => {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(';').forEach(c => {
    document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });
  return 'Storage cleared';
}` })

// 3. Navigate to the page under test
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000" })
```

### When to Preserve Context

Keep existing browser state only when you specifically need it:
- Testing logged-in flows after manual authentication
- Multi-step workflows requiring session continuity
- Debugging a specific user's session state

### Logout Fallback

If unexpectedly logged in, navigate to your app's logout endpoint:

```javascript
mcp__chrome-devtools__navigate_page({ url: "http://localhost:3000/account/logout" })
```

**Prefer clearing storage** over the logout page -- it is faster and does not depend on the app being functional.

## Browser Cleanup

Always close browser pages when finished testing. This prevents stale pages from accumulating:

```javascript
// List open pages to find the one to close
mcp__chrome-devtools__list_pages()

// Close by page ID (from list_pages output)
mcp__chrome-devtools__close_page({ pageId: PAGE_ID })
```

**Note**: The last open page cannot be closed. If yours is the only one, leave it.

**Full lifecycle**: Open page -> clear storage -> navigate -> test -> screenshot -> close page.

## Multi-Agent Browser Limitations

### The Problem: In-Process Agent Teams Share MCP Connections

Agent Team teammates using `backendType: "in-process"` all run within the parent Claude Code process and **share the parent's MCP server connections**, including Chrome DevTools MCP. This means:

| Problem | Root Cause |
|---------|-----------|
| **Page selection hijacking** | All agents share one `selectedPage` pointer -- Agent B's `select_page()` redirects Agent A's next `click()` |
| **Form field contamination** | `fill()` targets whichever page is currently selected, not the calling agent's page |
| **Session cookie sharing** | Shared Chrome instance means all agents share cookies (mitigated by `isolatedContext`) |
| **SPA state leaking** | Registration wizards and auth flows bleed across agents |

### What `--isolated` Does and Does Not Do

The `--isolated` flag creates a unique temporary Chrome profile per MCP server **process**. It prevents the "browser already running" error when multiple Claude Code **sessions** use Chrome DevTools MCP. However, it does **NOT** help within a single session's Agent Team because all in-process teammates share one MCP server process.

### Recommended Pattern: Sequential Browser Agents

For QA passes requiring multiple tiers, run agents **sequentially** -- one at a time. Each agent gets exclusive browser access with no contention:

```
coordinator
  -> agent-1 -> runs Pass A -> completes -> shuts down
      -> agent-2 -> runs Pass B -> completes -> shuts down
```

Alternatively, a **single agent** can run all passes back-to-back (most efficient -- avoids agent spawn overhead).

### Single-Agent Multi-Context

For a single agent testing multiple users (e.g., premium vs free), use `isolatedContext` on `new_page()`:

```javascript
// Premium user session
mcp__chrome-devtools__new_page({
  url: "http://localhost:3000",
  isolatedContext: "premium",
  background: true,
})

// Free user session (separate cookies/storage)
mcp__chrome-devtools__new_page({
  url: "http://localhost:3000",
  isolatedContext: "free",
  background: true,
})
```

This works within a single agent because there is no page selection race condition.

## Visual-First Debugging Philosophy

### Core Principle: Screenshots First

Always start with `take_screenshot` when debugging visual issues. Screenshots provide immediate visual feedback that is often more valuable than DOM inspection alone.

### Workflow Pattern

```
1. navigate_page - Load the page
2. take_screenshot - See current state
3. Identify issues visually
4. Use targeted tools for investigation
5. take_screenshot - Verify fixes
```

## Essential Chrome DevTools MCP Tools

### Navigation & Visual Debugging

```javascript
// Navigate to development server
mcp__chrome-devtools__navigate_page(url: "http://localhost:3000")
mcp__chrome-devtools__navigate_page(type: "reload")  // Reload current page
mcp__chrome-devtools__navigate_page(type: "back")    // Go back in history

// Take screenshot (appears as image for AI analysis)
mcp__chrome-devtools__take_screenshot()              // Viewport
mcp__chrome-devtools__take_screenshot(uid: "element-uid")  // Element specific
mcp__chrome-devtools__take_screenshot(fullPage: true)      // Full scrollable page

// Get page content snapshot (provides element UIDs for interaction)
mcp__chrome-devtools__take_snapshot()
mcp__chrome-devtools__take_snapshot(verbose: true)   // Include full a11y tree

// Create new page/tab
mcp__chrome-devtools__new_page(url: "http://localhost:3000", background: true)

// Page management
mcp__chrome-devtools__close_page(pageId: 1)
mcp__chrome-devtools__select_page(pageId: 1)
mcp__chrome-devtools__list_pages()

// Wait for text to appear
mcp__chrome-devtools__wait_for(text: "Loading complete")
```

### Element Inspection & Interaction

**Important**: Use `take_snapshot` first to get element UIDs, then use those UIDs for interactions.

```javascript
// First, get a snapshot to find element UIDs
mcp__chrome-devtools__take_snapshot()
// Returns elements with UIDs like: [button uid="abc123"] Submit

// Interact with elements using uid from snapshot
mcp__chrome-devtools__click(uid: "abc123")
mcp__chrome-devtools__click(uid: "abc123", dblClick: true)

// Fill form fields
mcp__chrome-devtools__fill(uid: "email-input-uid", value: "user@example.com")
mcp__chrome-devtools__fill_form(elements: [
  { uid: "email-uid", value: "user@example.com" },
  { uid: "password-uid", value: "password123" }
])

// Press keys
mcp__chrome-devtools__press_key(key: "Enter")
mcp__chrome-devtools__press_key(key: "Control+A")

// Drag elements
mcp__chrome-devtools__drag(from_uid: "draggable-uid", to_uid: "dropzone-uid")

// Hover
mcp__chrome-devtools__hover(uid: "tooltip-trigger-uid")

// Handle browser dialogs (alert, confirm, prompt)
mcp__chrome-devtools__handle_dialog(action: "accept")
mcp__chrome-devtools__handle_dialog(action: "dismiss")
mcp__chrome-devtools__handle_dialog(action: "accept", promptText: "user input")

// Upload files
mcp__chrome-devtools__upload_file(uid: "file-input-uid", filePath: "/path/to/file.txt")
```

### Debugging & Monitoring

```javascript
// Console logs (essential for React debugging)
mcp__chrome-devtools__list_console_messages()
mcp__chrome-devtools__list_console_messages(types: ["error"])
mcp__chrome-devtools__list_console_messages(types: ["error", "warn"])
mcp__chrome-devtools__get_console_message(msgid: 5)

// Network monitoring
mcp__chrome-devtools__list_network_requests()
mcp__chrome-devtools__list_network_requests(resourceTypes: ["fetch", "xhr"])  // API calls only
mcp__chrome-devtools__get_network_request(reqid: 123)

// JavaScript evaluation in page context
mcp__chrome-devtools__evaluate_script(function: "() => document.title")
mcp__chrome-devtools__evaluate_script(function: "() => localStorage.getItem('authToken')")

// Performance analysis
mcp__chrome-devtools__performance_start_trace(reload: true, autoStop: true)
mcp__chrome-devtools__performance_stop_trace()
mcp__chrome-devtools__performance_analyze_insight(insightSetId: "...", insightName: "LCPBreakdown")

// Viewport & emulation
mcp__chrome-devtools__resize_page(width: 375, height: 667)           // Mobile
mcp__chrome-devtools__emulate(networkConditions: "Slow 3G")          // Network throttling
mcp__chrome-devtools__emulate(geolocation: { latitude: 40.7, longitude: -74.0 })
```

## React Application Debugging

### Component State Issues

```javascript
// 1. Visual confirmation
mcp__chrome-devtools__take_screenshot()

// 2. Check console for React errors
mcp__chrome-devtools__list_console_messages(types: ["error"])

// 3. Inspect component props/state (dev builds)
mcp__chrome-devtools__evaluate_script(function: `() => {
  const el = document.querySelector('[data-component]');
  const fiber = el._reactInternalFiber || el.__reactInternalInstance__;
  return fiber?.memoizedProps;
}`)

// 4. Check for hydration issues
mcp__chrome-devtools__list_console_messages()  // Look for "Hydration failed"
```

### Hook Dependency Warnings

```javascript
// React warnings about useEffect dependencies
mcp__chrome-devtools__list_console_messages(types: ["warn"])
// Look for: "React Hook useEffect has a missing dependency"
// Look for: "Cannot update a component while rendering a different component"
```

## MUI Debugging Patterns

### Component Inspection

```javascript
mcp__chrome-devtools__evaluate_script(function: `() => {
  return Array.from(document.querySelectorAll('.MuiButton-root')).map(el => ({
    text: el.textContent,
    variant: Array.from(el.classList).find(cls => cls.includes('variant')),
    disabled: el.disabled
  }));
}`)

// State-specific inspection
mcp__chrome-devtools__evaluate_script(function: `() => ({
  disabled: document.querySelectorAll('.Mui-disabled').length,
  errors: document.querySelectorAll('.Mui-error').length,
  focused: document.querySelectorAll('.Mui-focused').length
})`)
```

### Theme Debugging

```javascript
// Check computed styles
mcp__chrome-devtools__evaluate_script(function: `() => {
  const button = document.querySelector('.MuiButton-root');
  const styles = getComputedStyle(button);
  return { backgroundColor: styles.backgroundColor, color: styles.color, fontSize: styles.fontSize };
}`)

// Check CSS variables
mcp__chrome-devtools__evaluate_script(function: `() =>
  getComputedStyle(document.documentElement).getPropertyValue('--mui-palette-primary-main')
`)
```

### Responsive Design Testing

```javascript
// Test different viewport sizes
mcp__chrome-devtools__resize_page(width: 375, height: 667)  // Mobile
mcp__chrome-devtools__take_screenshot()

mcp__chrome-devtools__resize_page(width: 1920, height: 1080)  // Desktop
mcp__chrome-devtools__take_screenshot()
```

## API Integration Testing

### Network Request Monitoring

```javascript
// 1. Navigate to page
mcp__chrome-devtools__navigate_page(url: "http://localhost:3000/login")

// 2. Get element UIDs
mcp__chrome-devtools__take_snapshot()

// 3. Trigger user action
mcp__chrome-devtools__click(uid: "submit-button-uid")

// 4. Monitor API calls
mcp__chrome-devtools__list_network_requests(resourceTypes: ["fetch", "xhr"])

// 5. Inspect specific request details (headers, body, response)
mcp__chrome-devtools__get_network_request(reqid: 123)
```

### Authentication Debugging

```javascript
// Check stored tokens
mcp__chrome-devtools__evaluate_script(function: `() => ({
  localStorage: Object.fromEntries(Object.entries(localStorage)),
  sessionStorage: Object.fromEntries(Object.entries(sessionStorage))
})`)

// Look for auth headers in requests
mcp__chrome-devtools__list_network_requests()
mcp__chrome-devtools__get_network_request(reqid: 123)  // Check request headers
```

### API Error Handling

```javascript
// Check for failed requests
mcp__chrome-devtools__list_network_requests()

// Inspect error responses in console
mcp__chrome-devtools__list_console_messages(types: ["error"])

// Check if error boundaries are working
mcp__chrome-devtools__evaluate_script(function: `() =>
  document.querySelector('.error-boundary') ? 'Found' : 'Not found'
`)
```

## Form Debugging

### Form Validation

```javascript
// Check form field error states
mcp__chrome-devtools__evaluate_script(function: `() => {
  const errorFields = document.querySelectorAll('.MuiTextField-root.Mui-error');
  return Array.from(errorFields).map(field => ({
    name: field.querySelector('input')?.name,
    error: field.querySelector('.MuiFormHelperText-root')?.textContent
  }));
}`)

// Test validation flow
mcp__chrome-devtools__take_snapshot()
mcp__chrome-devtools__fill(uid: "email-input-uid", value: "invalid-email")
mcp__chrome-devtools__click(uid: "submit-button-uid")
mcp__chrome-devtools__take_screenshot()  // Verify error display
```

### Form Submission Flow

```javascript
// 1. Get form element UIDs
mcp__chrome-devtools__take_snapshot()

// 2. Fill form (single or batch)
mcp__chrome-devtools__fill_form(elements: [
  { uid: "email-uid", value: "test@example.com" },
  { uid: "password-uid", value: "password123" }
])

// 3. Submit and monitor
mcp__chrome-devtools__click(uid: "submit-button-uid")
mcp__chrome-devtools__list_network_requests()
mcp__chrome-devtools__take_screenshot()

// 4. Verify success/error
mcp__chrome-devtools__evaluate_script(function: `() => ({
  success: document.querySelector('.success-message')?.textContent,
  error: document.querySelector('.error-message')?.textContent
})`)
```

## Common MUI Selectors

```javascript
// Layout
".MuiContainer-root", ".MuiBox-root", ".MuiGrid-root"

// Form
".MuiTextField-root", ".MuiFormControl-root", ".MuiSelect-root"
".MuiCheckbox-root", ".MuiRadio-root"

// Feedback
".MuiAlert-root", ".MuiSnackbar-root", ".MuiDialog-root", ".MuiTooltip-tooltip"

// Navigation
".MuiAppBar-root", ".MuiTabs-root", ".MuiBreadcrumbs-root"

// Data display
".MuiTable-root", ".MuiList-root", ".MuiCard-root"

// Input states
".Mui-error", ".Mui-disabled", ".Mui-focused", ".Mui-selected"
```

## Best Practices

1. **Screenshot First** -- always start with visual confirmation
2. **Console Monitoring** -- check for React errors after any interaction
3. **Network Monitoring** -- monitor API calls for auth and data flow issues
4. **JavaScript Evaluation** -- use `evaluate_script` for complex DOM inspection
5. **Performance Analysis** -- use tracing for slow interactions
6. **Visual Verification** -- take screenshots before and after changes
7. **Clean Up** -- close pages when done testing
8. **Fresh Context** -- clear storage before each test session
