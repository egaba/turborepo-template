---
name: nextjs
description: Next.js App Router architecture — Server Components, routing, performance, SEO, and API patterns.
globs: ['**/app/**/*', 'next.config.*', 'middleware.*']
---

# Next.js App Router — Routing & API Patterns

Patterns for building Next.js applications with the App Router.

## Feature-Based Module Architecture

Features live in `features/` as self-contained modules, separate from `app/` routes:

```
features/{name}/
  actions/           # Server Actions ('use server')
  components/        # Feature UI + co-located .test.tsx files
  hooks/             # Custom React hooks (form logic, etc.)
  queries/           # React Query hooks (queries + mutations)
  schemas/           # Zod validation schemas + .test.ts
  types/             # TypeScript types
  index.ts           # Barrel exports (public API)
```

Routes in `app/` import from features via barrel: `import { TaskCard } from '@/features/tasks'`

**Key rules:**
- Import features via barrel export only — never reach into internal paths
- No cross-feature imports — extract shared code to `lib/` or `components/`
- Route groups `(marketing)` and `(app)` separate layouts without affecting URLs
- Tests co-locate next to source files

Full directory tree and "Adding a New Feature" guide → [project-structure.md](references/project-structure.md)

### Feature Completion Checklist

- [ ] Unit/component tests pass (`pnpm test:ci`)
- [ ] Agent browser verification done (functional + responsive + console clean)
- [ ] E2E test written for P0/P1 features (`pnpm test:e2e`)
- [ ] No TypeScript errors (`pnpm check-types`)

## Server Components (RSC)

Default to Server Components. Use `"use client"` ONLY when you need:

| Need | Use Client Component |
|------|----------------------|
| Event handlers | `onClick`, `onChange`, `onSubmit` |
| React hooks | `useState`, `useEffect`, `useReducer`, `useContext` |
| Browser APIs | `localStorage`, `window`, `navigator` |
| Third-party libraries | Requiring client features |

### RSC composition patterns

- **Children-as-Server-Component pattern**: Pass Server Components as `children` to Client Components to avoid turning the entire tree client-side
- **Context provider wrappers**: Create a `'use client'` provider wrapper, use it in a Server Component layout
- **Fetch deduplication**: Next.js auto-deduplicates identical fetch requests during render
- **Third-party library integration**: Wrap client-only libs in a `'use client'` file

### Server Actions vs Route Handlers

| Use Case | Prefer |
|----------|--------|
| In-app form handling, mutations, optimistic UI | Server Actions |
| Public APIs, webhooks, cross-app consumption | Route Handlers |

## Performance

### Images

Always use `next/image`. Required: `alt`, `sizes` for responsive. Use `priority` for above-fold. Static imports get automatic blur placeholder.

### Fonts

Use `next/font` (Google or local). Configure CSS variables. Use `display: 'swap'`.

### Streaming

Use `loading.tsx` for route-level loading. Use `<Suspense>` for component-level streaming.

### Code Splitting

Use `next/dynamic` for heavy components. Set `ssr: false` for client-only components.

## SEO / Metadata

- **Static metadata export**: Export `metadata` object from `layout.tsx` or `page.tsx`
- **Dynamic metadata**: Use `generateMetadata` for dynamic pages
- **Metadata files**: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- **Static generation**: Use `generateStaticParams` for static generation of dynamic routes

## Routing Patterns

- **Route groups**: `(marketing)` for organizational grouping without URL impact
- **Parallel routes**: `@modal` for simultaneous rendering
- **Boundary handling**: `not-found.tsx` and `error.tsx`
- **Intercepting routes**: `(.)photo/[id]` pattern

## Key Patterns

- **Route Handlers**: Named GET/POST handlers calling backend directly — see [app-router-handlers](references/app-router-handlers.md)

## References

- [project-structure](references/project-structure.md) — full directory tree, feature module anatomy, adding features, import aliases
- [app-router-handlers](references/app-router-handlers.md) — route handlers, withErrorHandling, API client config
- [app-router-client](references/app-router-client.md) — query functions, custom hooks, mutations, Server vs Client Component data fetching
- [app-router-auth](references/app-router-auth.md) — middleware route protection, session access, permission-protected routes
- [app-router-advanced](references/app-router-advanced.md) — PPR, streaming with nested Suspense, bundle analysis
