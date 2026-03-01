# Error Handling Patterns

Unified error handling across API routes, React Query, forms, Server Actions, and route-level boundaries.

## Error Shape

Use `ApiError` from [api-response-shapes.md](api-response-shapes.md) for all API errors. Use `withErrorHandling` wrapper from [api-route-handlers.md](api-route-handlers.md) for consistent try/catch in route handlers.

## Route-Level Error Boundaries

```tsx
// app/products/error.tsx
'use client'

export default function Error({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <div className="alert alert-error" role="alert">
      <p>{error.message || 'Something went wrong'}</p>
      <button className="btn btn-ghost btn-sm" onClick={reset}>
        Try again
      </button>
    </div>
  )
}
```

**Placement rules:**

- `app/error.tsx` — global fallback for unhandled errors
- `app/{route}/error.tsx` — route-specific error UI (e.g., product not found vs generic)
- `app/global-error.tsx` — catches root layout errors (must include `<html>` and `<body>`)

Error boundaries only catch **rendering** errors. For data fetching errors, handle in React Query or Server Actions.

## React Query Errors

### Per-Query Error Handling

```tsx
const { data, error, isError } = useQuery({
  queryKey: ['product', id],
  queryFn: () => getProduct(id),
})

if (isError) return <div className="alert alert-error">{error.message}</div>
```

### Global Mutation Error Handler

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'Something went wrong'
        toast.error(message)
      },
    },
  },
})
```

### Error Boundaries with Suspense Queries

`useSuspenseQuery` throws on error — caught by the nearest `error.tsx`:

```tsx
// app/products/page.tsx (Server Component wrapper)
<Suspense fallback={<Loading />}>
  <ProductList /> {/* uses useSuspenseQuery — errors bubble to error.tsx */}
</Suspense>
```

## Form Validation Errors

### Zod safeParse in Server Actions

```typescript
'use server'
export async function createProduct(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: parsed.error.flatten() }
    // Returns: { fieldErrors: { name: ['Required'] }, formErrors: [] }
  }

  try {
    await db.insert(products).values(parsed.data)
    revalidatePath('/products')
    return { success: true }
  } catch {
    return { error: { formErrors: ['Failed to create product'], fieldErrors: {} } }
  }
}
```

### Display with react-hook-form

```tsx
{
  errors.name && <p className="text-error text-sm">{errors.name.message}</p>
}
```

For Server Action errors without react-hook-form, use `useActionState`:

```tsx
const [state, formAction] = useActionState(createProduct, null)
// state?.error?.formErrors → general errors
// state?.error?.fieldErrors?.name → field-specific errors
```

## Patterns to Avoid

- **Swallowing errors silently**: Always surface to user or log for observability
- **Generic catch-all messages**: Include enough context to debug ("Product creation failed" not "Error")
- **Throwing in Server Actions**: Return error objects instead — thrown errors show generic UI
- **Nested try/catch**: Use `withErrorHandling` wrapper at the route level, not per-operation
