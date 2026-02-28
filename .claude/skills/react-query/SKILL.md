---
name: react-query
description: TanStack React Query patterns for data fetching, caching, mutations, and server-state management.
globs: ['**/queries/**/*', '**/hooks/use*Query*.*', '**/hooks/use*Mutation*.*']
---

# React Query Patterns

Patterns for TanStack React Query (`@tanstack/react-query`) covering data fetching, caching, mutations, and server-state synchronization.

## Quick Patterns

### Basic Query

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: () => getProducts(),
})
```

### Basic Mutation

```typescript
const { mutate, isPending } = useMutation({
  mutationFn: (data: CreateProductInput) => createProduct(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  },
})
```

### Query Invalidation After Mutation

```typescript
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: ['products'] })       // exact match
queryClient.invalidateQueries({ queryKey: ['products'], exact: false }) // fuzzy
```

## Key Conventions

- **Query keys**: Arrays that uniquely identify the data. Static: `['user']`. Parameterized: `['product', productId]`. Compound: `['items', { filters, page }]`.
- **staleTime**: Default is `0` (always refetch on mount). Set higher for data that changes infrequently. Use `Infinity` in mock/dev mode to prevent refetching mock data.
- **retry**: Default `3` in production. Set to `false` in tests.
- **Query functions**: Always return typed data. Accept an optional `client` parameter for SSR/CSR flexibility.

## Reference

- [Data Fetching Patterns](references/data-fetching-patterns.md) -- query keys, SSR prefetching, mutations, optimistic updates, testing config
