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

**Next.js major:**
- Read official migration guide first
- Update `next.config` (config shape may change)
- Test middleware (API often changes between majors)
- Verify `app/` router behavior changes

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
