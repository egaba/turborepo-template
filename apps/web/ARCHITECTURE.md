# Web App Architecture

## Stack

Next.js (App Router) + React Query + DaisyUI v5 + TailwindCSS v4, in a Turborepo monorepo.

## Directory Layout

```
apps/web/
├── app/              # Routes only — thin pages importing from features/
│   ├── (marketing)/  # Public pages (header + footer)
│   ├── (app)/        # App area (sidebar)
│   ├── api/          # API route handlers
│   ├── error.tsx     # Error boundary
│   └── not-found.tsx # 404
├── features/         # Self-contained feature modules
├── components/       # App-level shared components
├── lib/              # Shared utilities (cn, format, collections, etc.)
├── providers/        # React context providers (QueryProvider)
├── types/            # Global shared types (API shapes)
├── e2e/              # Playwright E2E tests
└── __tests__/        # Jest test infrastructure
```

## Key Conventions

- **Features** are self-contained in `features/{name}/` with actions, components, hooks, queries, schemas, types, and a barrel `index.ts`.
- **Route groups** `(marketing)` and `(app)` organize layouts without affecting URLs.
- **Import alias** `@/*` maps to `apps/web/*`.
- **Shared UI** lives in `packages/ui` (`@repo/ui/*`). App-specific components in `components/`.
- **Tests co-locate** next to source files. Test infra in `__tests__/`.

## Testing

| Layer          | Tool        | Runs                            |
| -------------- | ----------- | ------------------------------- |
| Unit/component | Jest + RTL  | `pnpm test:ci`                  |
| E2E            | Playwright  | `pnpm test:e2e`                 |
| Visual (dev)   | Browser MCP | Agent-driven during development |

## Agent-Specific Documentation

Detailed patterns for building features, testing, and verification are in `.claude/skills/`:

- `nextjs/SKILL.md` — Feature module architecture, route patterns, completion checklist
- `testing/SKILL.md` — Two-layer verification workflow, testing pyramid
- `data/SKILL.md` — React Query, Server Actions, forms, caching
- `ui/SKILL.md` — DaisyUI patterns, variant maps, accessibility
