# React Query Basics

Query keys, query functions, custom hooks, error handling, selection, and provider setup.

## Query Key Conventions

```typescript
// Static -- singleton data
queryKey: ['user']
queryKey: ['notifications']

// Parameterized -- keyed by ID
queryKey: ['product', productId]
queryKey: ['order', orderId]

// Compound -- keyed by filters/pagination
queryKey: ['items', { filters, page }]
queryKey: ['search-results', { query, sort, page }]

// Hierarchical -- parent/child relationships
queryKey: ['user', userId, 'orders']
queryKey: ['product', productId, 'reviews']
```

## Query Function Structure

Standalone, typed functions that return data directly:

```typescript
// queries/products.ts
export type Product = { id: string; name: string; price: number; status: 'active' | 'archived' }

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error('Failed to fetch products')
  const json = await res.json()
  return json.data
}

export async function getProduct(productId: string): Promise<Product> {
  const res = await fetch(`/api/products/${productId}`)
  if (!res.ok) throw new Error('Product not found')
  const json = await res.json()
  return json.data
}
```

## Custom Hook Pattern

Combine router params or search params with `useQuery`.

```typescript
// hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getProduct } from 'queries/products'

export function useProduct() {
  const { productId } = useParams<{ productId: string }>()

  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  })
}
```

For filters from `useSearchParams`, derive `{ page, status }` and use `queryKey: ['products', filters]` with `queryFn: () => searchProducts(filters)`.

## Error Handling

```typescript
const { data, error, isError } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
  throwOnError: false,
  retry: false,
})

if (isError) {
  return <ErrorCard message="Could not load products" />
}
```

## Query Selection

Use `select` to derive/transform cached data without refetching:

```typescript
const { data: activeCount } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
  select: (data) => data.filter((p) => p.status === 'active').length,
})
```

## Provider Setup

```typescript
// providers/query-provider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## Testing Configuration

```typescript
// test-utils/query-client.ts
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

// test-utils/render.tsx
export function renderWithQuery(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}
```

**Mock mode:** When running with MSW, set `staleTime: Infinity` and `retry: false` to prevent refetching over mock data.
