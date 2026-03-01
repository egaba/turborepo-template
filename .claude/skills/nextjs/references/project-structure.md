# Project Structure

Full directory layout, feature module conventions, and step-by-step guide for adding features.

## Directory Tree

```
apps/web/
├── app/                         # Routes only — thin wrappers that import from features/
│   ├── (marketing)/             # Public pages (header + footer layout)
│   │   ├── layout.tsx
│   │   └── page.tsx             # /
│   ├── (app)/                   # App area (sidebar layout)
│   │   ├── layout.tsx
│   │   └── dashboard/page.tsx   # /dashboard
│   ├── api/                     # API route handlers (public APIs, webhooks)
│   ├── error.tsx                # Global error boundary
│   ├── not-found.tsx            # 404 page
│   ├── globals.css
│   └── layout.tsx               # Root layout (fonts, providers, theme)
├── features/                    # Feature modules (self-contained)
│   └── tasks/                   # Example feature
│       ├── actions/             # Server Actions
│       ├── components/          # UI + co-located .test.tsx
│       ├── hooks/               # Custom hooks
│       ├── queries/             # React Query hooks
│       ├── schemas/             # Zod schemas + .test.ts
│       ├── types/
│       └── index.ts             # Barrel exports
├── components/layouts/          # App-level layout wrappers
├── lib/                         # Shared utilities (pure functions)
│   ├── cn.ts                    # Class name merging
│   ├── format.ts                # Date/string formatting
│   ├── invariant.ts             # Runtime assertions
│   ├── collections.ts           # Array/object helpers
│   ├── url.ts                   # URL builders
│   ├── api-client.ts            # Typed fetch wrapper
│   └── query-client.ts          # React Query client factory
├── providers/                   # React context providers
├── types/api.ts                 # Shared API response types
├── e2e/                         # Playwright E2E tests
├── __tests__/                   # Jest test infrastructure
└── jest.config.ts
```

## Import Aliases

`@/*` maps to `apps/web/*`. Examples:

- `@/features/tasks` — feature barrel export
- `@/lib/cn` — utility function
- `@/providers/providers` — provider wrapper
- `@/types/api` — shared API types
- `@/__tests__/render` — custom test render

Shared UI from monorepo: `@repo/ui/button`, `@repo/ui/card`, etc.

## Route Groups

| Group         | URL prefix        | Layout          | Purpose                      |
| ------------- | ----------------- | --------------- | ---------------------------- |
| `(marketing)` | `/`               | Header + footer | Public: home, about, pricing |
| `(app)`       | `/dashboard` etc. | Sidebar         | Authenticated app area       |

Route groups don't affect URLs. They allow separate layouts and code organization.

## Adding a New Feature

1. **Create directory**: `features/{name}/`
2. **Define types**: `types/index.ts` — TypeScript types for the feature
3. **Write schemas**: `schemas/{name}-schema.ts` — Zod validation with `createSchema` and `updateSchema`
4. **Add Server Actions**: `actions/{name}-actions.ts` — `'use server'`, validate with schema, `revalidatePath`
5. **Add React Query hooks**: `queries/use-{names}.ts` — query + mutation with cache invalidation
6. **Build components**: `components/{name}-card.tsx`, `{name}-list.tsx`, `{name}-form.tsx`
7. **Wire form logic**: `hooks/use-{name}-form.ts` — react-hook-form + zodResolver
8. **Barrel export**: `index.ts` — export public API only
9. **Write tests**: co-locate `.test.ts(x)` next to source files
10. **Add route**: `app/(app)/{name}/page.tsx` — import from feature barrel
11. **Add E2E test**: `e2e/{name}.spec.ts` for P0/P1 features
12. **Browser verify**: run agent browser verification checklist

## File Naming

- Components: `kebab-case.tsx` (e.g., `task-card.tsx`)
- Tests: `{source-file}.test.tsx` (e.g., `task-card.test.tsx`)
- Hooks: `use-{name}.ts` (e.g., `use-task-form.ts`)
- Schemas: `{name}-schema.ts`
- Actions: `{name}-actions.ts`
- E2E: `{name}.spec.ts`

## Rules

- **Barrel exports only**: Other code imports `@/features/tasks`, not `@/features/tasks/components/task-card`
- **No cross-feature imports**: If two features share code, extract to `lib/` or `components/`
- **Routes are thin**: `app/` pages should import and compose feature components, not contain business logic
- **Server Actions for mutations**: Use for in-app writes. Use Route Handlers for public APIs/webhooks.
- **Tests co-locate**: `task-card.test.tsx` lives next to `task-card.tsx`
