# Migration Recipes

Step-by-step upgrade patterns for common library migrations.

## useQuery -> useSuspenseQuery

```typescript
// Before
const { data, isLoading, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
})
if (isLoading) return <Spinner />
if (error) return <Error error={error} />

// After -- data is guaranteed non-null
const { data } = useSuspenseQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
})
```

**Steps:**

1. Add `<Suspense>` boundary with fallback in parent
2. Add `<ErrorBoundary>` in parent
3. Replace `useQuery` with `useSuspenseQuery`
4. Remove loading/error checks from component
5. `data` is now typed as `T` (not `T | undefined`)

**Gotcha:** `useSuspenseQuery` cannot have `enabled: false` -- use `useQuery` for conditionally-fetched data.

## MSW v1 -> v2

```typescript
// v1
import { rest } from 'msw'
rest.get('/api/tasks', (req, res, ctx) => {
  return res(ctx.json({ tasks: [] }))
})

// v2
import { http, HttpResponse } from 'msw'
http.get('/api/tasks', () => {
  return HttpResponse.json({ tasks: [] })
})
```

**Steps:**

1. Update `msw` package
2. Replace `rest` -> `http`
3. Replace `res(ctx.json())` -> `HttpResponse.json()`
4. Update `setupServer`/`setupWorker` imports
5. Update handler signatures (no more `req, res, ctx` triple)

**Request access in v2:**

```typescript
http.post('/api/tasks', async ({ request }) => {
  const body = await request.json()
  return HttpResponse.json(body, { status: 201 })
})
```

## Dependency Upgrade Workflow

1. Check changelogs for breaking changes
2. Update in `package.json` (use caret ranges per convention)
3. Run `pnpm install`
4. Run `pnpm turbo run check-types` -- fix type errors
5. Run `pnpm turbo run test:ci` -- fix test failures
6. Run `pnpm turbo run build` -- fix build issues
7. Browser verify if UI-related

## Common Upgrade Patterns

**React 18 -> 19:**

- Check for removed APIs (`ReactDOM.render`, legacy context)
- Update `@types/react` and `@types/react-dom`
- Test Suspense boundaries (behavior changes)

**Next.js major upgrade workflow:**

1. **Pre-upgrade assessment**
   - Read the official migration guide for the target version
   - Run `npx @next/codemod@latest upgrade` — applies automated transforms for known breaking changes
   - Review codemod diff before committing (codemods are good but not perfect)

2. **Common breaking change categories across versions**
   - **Config shape**: `next.config.js` → `next.config.ts`, new/renamed options, plugin API changes
   - **Async APIs**: Server-side functions (`cookies()`, `headers()`, `params`, `searchParams`) becoming async
   - **Caching defaults**: Default caching behavior changes (e.g., `fetch` no longer cached by default in 15+)
   - **Middleware**: Signature changes, new matchers, edge runtime constraints
   - **Router behavior**: `useRouter` return shape, navigation interception, redirect semantics
   - **Bundler**: Webpack → Turbopack transition, `next.config` bundler-specific options

3. **Post-upgrade verification**
   - `pnpm turbo run check-types` — catch new/changed API signatures
   - `pnpm turbo run test:ci` — catch behavioral changes
   - `pnpm turbo run build` — catch config and bundling issues
   - Browser verify: hydration warnings, console errors, rendering regressions
   - Test middleware routes explicitly (auth, redirects, rewrites)

4. **Gotchas**
   - Codemods won't catch dynamic usage patterns (e.g., `cookies()` stored in a variable then awaited later)
   - Third-party packages may lag behind — check compatibility before upgrading
   - If using `output: 'standalone'`, verify Docker builds separately

**DaisyUI major:**

- Check theme/class name changes
- Verify component rendering (class names may differ)
- Update variant maps if class names changed

**TypeScript major:**

- Run `check-types` first to see new errors
- Fix new strict errors (often catches real bugs)
- Check for removed/changed compiler options

## Migration Commit Strategy

- One commit per logical migration step (not one giant commit)
- Each commit should leave the app in a working state
- Tag commits clearly: `refactor: migrate useQuery to useSuspenseQuery in tasks`
- If migration touches 10+ files, consider a feature branch
