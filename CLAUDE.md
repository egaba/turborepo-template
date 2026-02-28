# Portable Development Patterns

Reusable Claude Code skills for Next.js monorepo projects. Distilled from production workflows — generalizable to any team.

## How to Use

1. Copy this `CLAUDE.md` and the `.claude/` directory into your project root
2. Customize the **Project Structure** section below with your apps and packages
3. Customize the **Essential Commands** section with your build/dev/test commands
4. Update `.claude/skills/jira/references/jira-playbook.md` placeholders (`{YOUR_ORG}`, `{YOUR_APP}`, etc.)
5. If using Agent Teams, enable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` in `.claude/settings.json`

## Skill Index

| Skill | Type | Description |
|-------|------|-------------|
| **jira** | User-invocable | JIRA ticket workflow orchestration via Agent Teams (lead + dev + QA + deploy) |
| **nextjs** | Auto-load | Next.js App Router and Pages Router patterns, routing, layouts, data fetching |
| **react-query** | Auto-load | @tanstack/react-query patterns, query keys, mutations, prefetching |
| **nextauth** | Auto-load | NextAuth.js authentication, session management, middleware, permissions |
| **testing** | Auto-load | Jest + React Testing Library + MSW patterns, custom render utilities |
| **web-dev** | Auto-load | Core React/TypeScript component patterns, browser automation, visual debugging |
| **daisyui** | Auto-load | DaisyUI v5 + TailwindCSS v4 theming, semantic colors, component patterns, responsive design |
| **typescript** | Auto-load | TypeScript conventions, type vs interface, import type, strict mode patterns |
| **monorepo** | Auto-load | Turborepo + pnpm workspace patterns, dependency management, build caching |

## Agent Teams (JIRA Workflow)

When a user presents a JIRA ticket (key pattern `[A-Z]+-\d+` or Atlassian URL), you become the **jira lead** and spawn an agent team:

```
User <-> jira lead (you, main Claude — follows the jira skill playbook)
           |-- teammate -> jira-dev  (Developer)
           |-- teammate -> jira-qa   (QA — unit tests + browser verification)
           +-- teammate -> deploy    (Deployment)
```

The jira lead handles: ticket analysis, planning, checkpoints, git operations, and team coordination. Teammates handle specialized work. See `.claude/skills/jira/SKILL.md` for full details.

**Requires**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` enabled in `.claude/settings.json`.

## Code Quality Conventions

- **TypeScript**: Always required for new features and files
- **type over interface**: Prefer `type` unless inheritance is specifically needed
- **Import ordering**: `import type` statements first, then regular imports
- **HTTP status codes**: Always use `http-status-codes` package constants (`StatusCodes.OK`, `StatusCodes.NOT_FOUND`) — never raw numeric codes
- **DaisyUI semantic colors**: Always use DaisyUI semantic color classes (`bg-base-100`, `text-primary`, `btn-primary`, etc.) instead of hardcoded hex values or raw Tailwind color classes (`bg-gray-700`). Exception: external brand colors (e.g., social login buttons)
- **Component variant maps**: Use explicit `Record<Variant, string>` objects for mapping prop values to DaisyUI class names -- never template literals like `` `btn-${variant}` ``

  ```tsx
  const variantClass: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
  }

  export function Button({ variant = "primary", className = "", ...props }) {
    return <button className={`btn ${variantClass[variant]} ${className}`.trim()} {...props} />
  }
  ```
- **pnpm overrides**: When adding entries to `pnpm.overrides` in root `package.json`, always pin to **exact versions** — never use range specifiers like `>=5.2.0` or `^5.2.0`

## Project Structure

> **CUSTOMIZE**: Replace the sections below with your actual project layout.

### Applications

- `apps/{app-1}` - Primary application (**Pages Router** or **App Router**)
- `apps/{app-2}` - Secondary application (**App Router**)

### Shared Packages

- `packages/ui` - Shared component library
- `packages/ts-config` - TypeScript configuration
- `packages/eslint-config` - ESLint rules

### File Structure

```
apps/*/src/pages/          # Pages Router routes
apps/*/app/                # App Router routes
apps/*/components/         # React components
apps/*/types/              # TypeScript definitions
apps/*/queries/            # React Query hooks
apps/*/mocks/              # MSW handlers
```

## Essential Commands

> **CUSTOMIZE**: Replace the commands below with your actual monorepo commands.

```bash
# Required first-time setup
pnpm install

# Development (persistent, auto-builds dependencies)
pnpm turbo run dev --filter={app-name}

# Server Ready Indicators:
# Pages Router apps: "server listening on port {PORT}" (custom server)
# App Router apps: "Ready in XXXms" (Next.js)

# Build (cached, auto-builds dependencies)
pnpm turbo run build --filter={app-name}

# Testing
pnpm turbo run test --filter={app-name}              # Watch mode
pnpm turbo run test:ci --filter={app-name}           # CI mode (non-interactive)

# Linting
pnpm turbo run lint --filter={app-name}

# Type checking
pnpm turbo run check:types --filter={app-name}
```

## MCP Servers

### Available MCP Servers

- **Chrome DevTools MCP**: Browser automation and debugging. Always runs in headless mode.
- **Atlassian MCP (built-in)**: `claude_ai_Atlassian` — JIRA integration via Claude.ai OAuth
- **Next.js DevTools MCP**: Next.js 16+ server discovery, runtime diagnostics, error detection

### Installation

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
claude mcp add next-devtools npx next-devtools-mcp@latest
```
