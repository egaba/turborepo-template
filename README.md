# Next.js Monorepo Template

Opinionated starting template for Next.js projects with Turborepo, DaisyUI v5, and TailwindCSS v4. Includes AI agent skills for Claude Code.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | DaisyUI v5 + TailwindCSS v4 |
| State | React Query, react-hook-form + Zod |
| Testing | Jest + RTL + MSW (unit), Playwright (E2E) |
| Monorepo | Turborepo + pnpm |
| Node | 22 LTS |

## Quick Start

```bash
pnpm install
pnpm turbo run dev --filter=web
# Ready at http://localhost:3000
```

## Project Structure

```
apps/
  web/                    # Primary Next.js application
    app/                  # App Router routes
    features/             # Feature modules (tasks, etc.)
    lib/                  # Shared utilities
    e2e/                  # Playwright E2E tests
packages/
  ui/                     # Shared component library (Storybook)
  eslint-config/          # ESLint flat config
  tailwind-config/        # TailwindCSS + DaisyUI theme
  typescript-config/      # Shared tsconfig
```

## Essential Commands

```bash
pnpm turbo run dev --filter=web          # Dev server (port 3000)
pnpm turbo run build                     # Production build
pnpm turbo run check-types               # TypeScript check
pnpm turbo run lint                      # ESLint
pnpm turbo run test:ci --filter=web      # Unit tests (CI mode)
pnpm turbo run test:e2e --filter=web     # Playwright E2E
pnpm format:check                        # Prettier check
```

## AI Agent Skills

This template includes 8 Claude Code skills in `.claude/skills/`:

| Skill | Concern | What It Covers |
|-------|---------|---------------|
| **ui** | Build | DaisyUI v5 components, semantic colors, variant maps, accessibility |
| **data** | Build | React Query, API routes, Server Actions, forms (react-hook-form + Zod) |
| **nextjs** | Build | App Router, Server Components, routing, performance, SEO |
| **auth** | Build | NextAuth.js, session management, security headers, CSP |
| **testing** | Verify | Jest + RTL + MSW, Playwright E2E, browser verification |
| **debugging** | Process | Systematic 4-phase debugging, root-cause tracing |
| **devops** | Ship | Turborepo, Git workflow, GitHub Actions CI/CD |
| **skill-creator** | Meta | Create, validate, and improve agent skills |

### Agent

| Agent | Purpose |
|-------|---------|
| **reviewer** | Code review against CLAUDE.md conventions + verification gates |

## Customizing for Your Project

1. **Replace placeholders** in `CLAUDE.md`:
   - `{project-name}` — your project name
   - `{app-name}` — Turborepo filter name (e.g., `web`)
   - `{app-1}`, `{app-2}` — app directory names under `apps/`

2. **Update branding** — search for "Project" in the codebase and replace with your project name (sidebar, header, footer, metadata)

3. **Remove unused skills** — each skill in `.claude/skills/` is self-contained. Delete directories you don't need.

4. **Configure environment** — copy `.env.example` to `.env.local` and fill in values.

## CI/CD

Two GitHub Actions workflows:

- **ci.yaml** — Runs on PRs and pushes to main: format check, types, lint, unit tests, build, E2E tests
- **monitor-dependencies.yaml** — Daily vulnerability scanning with `pnpm audit`

## MCP Servers

Configured in `.claude/settings.json`:

- **chrome-devtools** — Headless browser automation for visual verification
- **next-devtools** — Next.js 16 runtime diagnostics via `/_next/mcp` endpoint
