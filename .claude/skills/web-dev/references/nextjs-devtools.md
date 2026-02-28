# Next.js DevTools MCP Reference

**Two core use cases: Check if app is running + Verify server errors.**

## 1. Check if App is Running

Replaces `lsof` + `curl` checks with a single reliable call:

```javascript
// Auto-discover running Next.js servers
mcp__next-devtools__nextjs_index()

// Or check specific port
mcp__next-devtools__nextjs_index({ port: "3000" })
```

**Returns**: Port, PID, URL, available tool names (or empty if no server)

## 2. Check Server-Side Errors

Get compilation errors, SSR errors, API route errors that do not appear in browser console:

```javascript
// Always call nextjs_index first to get tool names
const servers = await mcp__next-devtools__nextjs_index()
const toolName = servers[0].tools.find(t => t.includes("error"))

// Then get server errors
mcp__next-devtools__nextjs_call({
  port: "3000",
  toolName: toolName  // Tool names vary by Next.js version
})
```

**Use together with browser console** for complete error coverage:
```javascript
// 1. Server errors (server-side) - check first
mcp__next-devtools__nextjs_call({ port: "3000", toolName: "get_errors" })

// 2. Browser errors (client-side)
mcp__chrome-devtools__list_console_messages({ types: ["error"] })
```

## Port Mapping

Update this for your project:

| App | Port |
|-----|------|
| app-1 | 3000 |
| app-2 | 3001 |
| app-3 | 3002 |
