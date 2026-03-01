# Next.js Monorepo Skills Template

Reusable AI agent skills for Next.js + Turborepo projects with DaisyUI v5 and TailwindCSS v4.

## Quick Start

1. Clone or copy this repo as your project starting point
2. Customize `CLAUDE.md` -- fill in project name, structure, and commands
3. Find-and-replace all template placeholders (see below)
4. Remove skills you don't need (each skill in `.claude/skills/` is self-contained)

## Template Placeholders

Replace these placeholders across all skill and agent files before use:

| Placeholder | Where Used | Description |
|-------------|------------|-------------|
| `{project-name}` | CLAUDE.md | Your project name (e.g., `Acme Dashboard`) |
| `{YOUR_APP}` | orchestration-playbook.md, workflow-guide.md | Primary application name in the monorepo (e.g., `web`, `dashboard`) |
| `{YOUR_SITE}` | qa.md, orchestration-playbook.md | Your domain for staging URLs (e.g., `myapp.com`) |
| `{YOUR_SHARED_PACKAGE}` | orchestration-playbook.md | Shared package for pre-flight type checks (e.g., `@myorg/ui`) |
| `{app-name}` | CLAUDE.md, dev.md, qa.md | Turborepo filter name for app-specific commands |
| `{app-1}`, `{app-2}` | CLAUDE.md | Application directory names under `apps/` |
| `{PORT}` | dev.md, qa.md, orchestration-playbook.md | Dev server port number (e.g., `3000`) |
| `@{your-org}/ui` | typescript references | Your scoped npm org for shared packages |

**Quick find-and-replace:**

```bash
rg -l '{YOUR_APP}' .claude/ | xargs sed -i '' 's/{YOUR_APP}/web/g'
rg -l '{YOUR_SITE}' .claude/ | xargs sed -i '' 's/{YOUR_SITE}/myapp.com/g'
rg -l '{app-name}' .claude/ CLAUDE.md | xargs sed -i '' 's/{app-name}/web/g'
rg -l '{PORT}' .claude/ | xargs sed -i '' 's/{PORT}/3000/g'
```

## Skills Overview

| Skill | What It Covers |
|-------|---------------|
| **ui** | DaisyUI v5 component patterns, semantic colors, variant maps, accessibility |
| **data** | React Query, API routes, Server Actions, forms (react-hook-form + Zod), caching/revalidation |
| **nextjs** | App Router, Server Components, routing, performance (next/image, next/font), SEO (metadata API) |
| **auth** | NextAuth.js authentication, session management, permissions |
| **security** | CSP, security headers, env var safety, CSRF/XSS prevention, defense-in-depth |
| **testing** | Jest + RTL + MSW (unit/integration), Playwright (E2E), browser verification, pre-release checklist |
| **typescript** | Strict mode, type conventions, discriminated unions, path aliases |
| **debugging** | Systematic 4-phase debugging, root-cause tracing, verification-before-completion |
| **devops** | Turborepo, Git workflow, GitHub Actions, Docker builds, observability, health checks |
| **tasks** | Task orchestration with dev/QA/reviewer/deploy subagents |

## Agents

| Agent | Role |
|-------|------|
| **dev** | Developer subagent -- implements features following project conventions |
| **qa** | QA subagent -- writes tests, runs browser verification |
| **reviewer** | Code reviewer subagent -- reviews diffs against conventions, runs verification gates |
| **deploy** | Deployment subagent -- runs deployment commands, verifies health |

## Specializing This Template

When adopting for a specific project, you can ask your AI agent to:

- Read the project structure and update `CLAUDE.md` with actual paths
- Update Essential Commands with real package names and ports
- Replace all placeholders with project-specific values
- Remove unused skills (e.g., `auth` if not using NextAuth)
- Add project-specific conventions to Code Quality Conventions
