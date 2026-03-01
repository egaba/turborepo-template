---
name: data
description: Data management — server state (React Query), API routes, Server Actions, caching/revalidation, forms (react-hook-form + Zod), and client state.
globs:
  [
    '**/queries/**/*',
    '**/hooks/use*Query*.*',
    '**/hooks/use*Mutation*.*',
    '**/app/api/**/*',
    '**/stores/**/*',
  ]
---

# Data — Fetching, Forms & State

How data flows through the application: from user input through API routes to cache to UI.

## Server State (React Query)

### Basic Query

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: () => getProducts(),
})
```

### Suspense Query (Preferred)

Prefer `useSuspenseQuery` over `useQuery` + early return. Wrap with `<Suspense fallback={...}>`. See [react-query-basics.md](references/react-query-basics.md).

### Key Conventions

- **Query keys**: Arrays. Static: `['user']`. Parameterized: `['product', productId]`. Compound: `['items', { filters, page }]`.
- **staleTime**: Default `0`. Set higher for infrequently-changing data. Use `Infinity` in mock/dev mode.
- **retry**: Default `3` in production. Set to `false` in tests.

### Mutations

Basic mutation with `onSuccess` invalidation. Optimistic updates: `onMutate` snapshot, `setQueryData`, `onError` rollback. See [react-query-mutations.md](references/react-query-mutations.md).

### Testing

Use `createTestQueryClient` with `retry: false` and `renderWithQuery` helper. Mock mode: set `staleTime: Infinity` to prevent refetching over MSW data. See [react-query-basics.md](references/react-query-basics.md).

## API Layer

### Response Shapes

`ApiResponse<T>` with `data`, `status: 'success'`. `ApiError` with `error`, `code`, `details`. Use `StatusCodes` from `http-status-codes`. See [api-response-shapes.md](references/api-response-shapes.md).

### Route Handlers

GET/POST handlers return `NextResponse.json({ data, status: 'success' })`. Validate with Zod `safeParse`. Use `withErrorHandling` wrapper. See [api-route-handlers.md](references/api-route-handlers.md).

## Forms (react-hook-form + Zod)

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

Use `FormField` for label + error display. Multi-step forms: per-step schemas, `useState` for accumulated data. Shared schemas in `lib/schemas/` for client + API. See [forms-validation.md](references/forms-validation.md).

## Client State

| Tool                              | Use When                                        |
| --------------------------------- | ----------------------------------------------- |
| **URL state** (`useSearchParams`) | Filters, pagination, search — shareable via URL |
| **Zustand**                       | Global UI: sidebar, theme, preferences          |
| **React Context**                 | Tree-scoped: feature flags, form wizard step    |
| **React Query**                   | Server-derived state                            |
| **Server Actions**                | In-app mutations with `revalidatePath`          |

See [client-state.md](references/client-state.md).

## Server Actions

Preferred mutation path for App Router. Use for in-app mutations; use Route Handlers for public APIs/webhooks.

```tsx
'use server'
export async function createProduct(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }
  await db.insert(products).values(parsed.data)
  revalidatePath('/products')
}
```

Use with `<form action={createProduct}>`.

## Caching & Revalidation

| Strategy | fetch option                | Use When                 |
| -------- | --------------------------- | ------------------------ |
| Static   | `cache: 'force-cache'`      | Content rarely changes   |
| Dynamic  | `cache: 'no-store'`         | User-specific, real-time |
| ISR      | `next: { revalidate: 60 }`  | Periodic updates         |
| Tagged   | `next: { tags: ['posts'] }` | Granular invalidation    |

On-demand: `revalidatePath`, `revalidateTag` in Server Actions. Route config: `dynamic: 'force-dynamic'`, `revalidate: 3600`.

## Optimistic UI

```tsx
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  initialLikes,
  (state, amount) => state + amount,
)
```

Call `addOptimisticLike(1)` before async action.

## Data Fetching Patterns

- **Parallel**: `Promise.all([fetchPosts(), fetchUsers()])`
- **Sequential**: When data depends on prior results
- **Preloading**: `React.cache()` for deduplication

## Performance Hooks

- `useMemo`: expensive derived data (filtering, sorting)
- `useCallback`: stable handlers for memoized children
- `React.memo`: skip re-render when props unchanged

Add memoization only when there's a measured performance problem.

## References

- [react-query-basics.md](references/react-query-basics.md) — Query keys, query functions, custom hooks, error handling, provider setup, testing config
- [react-query-mutations.md](references/react-query-mutations.md) — Mutations, cache invalidation, optimistic updates
- [api-response-shapes.md](references/api-response-shapes.md) — ApiResponse, ApiError, HTTP status codes
- [api-route-handlers.md](references/api-route-handlers.md) — CRUD routes, error wrapper, Zod validation, middleware
- [forms-validation.md](references/forms-validation.md) — react-hook-form + Zod, multi-step forms, shared schemas
- [client-state.md](references/client-state.md) — Zustand, URL state, React Context
- [error-handling.md](references/error-handling.md) — error.tsx boundaries, React Query errors, form validation errors, Server Action try/catch
