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

This template includes 9 Claude Code skills in `.claude/skills/`:

| Skill | Concern | What It Covers |
|-------|---------|---------------|
| **bootstrap** | Setup | Initialize template for a new project — name, branding, metadata |
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

## Getting Started from Template

This is a **GitHub Template Repository**. Click "Use this template" to create your project, then:

### 1. Bootstrap (Day 1)

Open the project in Claude Code and run:

```
/bootstrap
```

This walks you through configuring the project name, description, and whether to keep the demo pages. It handles all the find-and-replace across the codebase automatically.

### 2. Configure as you go

Not everything needs to be decided upfront. Use the built-in skills as you're ready:

| Decision | Skill | Command |
|----------|-------|---------|
| Theme colors & branding | ui | `/ui` |
| Auth provider & sessions | auth | `/auth` |
| Database & data layer | data | `/data` |
| Hosting & CI/CD | devops | `/devops` |

### 3. Track progress

See **`TEMPLATE.md`** for a full checklist of what's been configured and what's still pending. Delete it when everything is set up.

### Environment

Copy `.env.example` to `.env.local` and fill in values as they become available.

## CI/CD

Two GitHub Actions workflows:

- **ci.yaml** — Runs on PRs and pushes to main: format check, types, lint, unit tests, build, E2E tests
- **monitor-dependencies.yaml** — Daily vulnerability scanning with `pnpm audit`

## MCP Servers

Configured in `.claude/settings.json`:

- **chrome-devtools** — Headless browser automation for visual verification
- **next-devtools** — Next.js 16 runtime diagnostics via `/_next/mcp` endpoint
