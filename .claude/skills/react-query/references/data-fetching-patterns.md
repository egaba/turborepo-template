# Data Fetching Patterns

Comprehensive React Query patterns for client-side fetching, server-side prefetching, mutations, and testing.

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

Query functions should be standalone, typed, and accept an optional `client` parameter for SSR/CSR flexibility.

```typescript
// queries/products.ts
import axios, { AxiosInstance } from 'axios'
import { browserClient } from 'queries'

export type Product = {
  id: string
  name: string
  price: number
  status: 'active' | 'archived'
}

export async function getProducts({
  client = browserClient,
} = {}): Promise<Product[]> {
  const { data } = await client.get('/api/proxy/products')
  return data
}

export async function getProduct(
  productId: string,
  { client = browserClient } = {},
): Promise<Product> {
  const { data } = await client.get(`/api/proxy/products/${productId}`)
  return data
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

```typescript
// hooks/useFilteredProducts.ts
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { searchProducts } from 'queries/products'

export function useFilteredProducts() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const status = searchParams.get('status') || 'active'

  const filters = { page, status }

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => searchProducts(filters),
  })
}
```

## SSR Prefetching with Dehydrate/Hydrate

### Pages Router -- preloadQueryClient Pattern

```typescript
// helpers/default-gssp.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'

export default async function preloadQueryClient(
  context: GetServerSidePropsContext,
  { prefetches = [] }: { prefetches?: PrefetchItem[] } = {},
) {
  const queryClient = new QueryClient()
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return { redirect: { destination: '/login', permanent: false } }
  }

  // Auto-prefetch common queries
  await Promise.allSettled([
    queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: prefetch(getUser, {}, context),
    }),
    ...prefetches.map(({ queryKey, queryFn, args }) =>
      queryClient.fetchQuery({
        queryKey,
        queryFn: prefetch(queryFn, args || {}, context),
      }),
    ),
  ])

  return { queryClient, session }
}
```

### Usage in getServerSideProps

```typescript
export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await preloadQueryClient(context, {
    prefetches: [
      { queryKey: ['dashboard', date], queryFn: getDashboard, args: { date } },
    ],
  })

  if ('redirect' in result) return result

  return {
    props: {
      session: result.session,
      dehydratedState: dehydrate(result.queryClient),
    },
  }
}
```

### Provider Setup with Hydration

```typescript
// pages/_app.tsx
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
```

## Mutation Patterns

### Basic Mutation with onSuccess/onError

```typescript
const queryClient = useQueryClient()

const { mutate, isPending, error } = useMutation({
  mutationFn: (input: CreateProductInput) => createProduct(input),
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
    router.push(`/products/${data.id}`)
  },
  onError: (error) => {
    showToast('error', 'Failed to create product. Please try again.')
  },
})
```

### Cache Invalidation After Mutation

```typescript
const { mutate: deleteProduct } = useMutation({
  mutationFn: (id: string) => apiClient.delete(`/api/products/${id}`),
  onSuccess: () => {
    // Invalidate the list and the specific item
    queryClient.invalidateQueries({ queryKey: ['products'] })
    queryClient.removeQueries({ queryKey: ['product', deletedId] })
  },
})
```

### Optimistic Updates

```typescript
const { mutate: toggleFavorite } = useMutation({
  mutationFn: (productId: string) => apiClient.post(`/api/favorites/${productId}`),
  onMutate: async (productId) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['product', productId] })

    // Snapshot previous value
    const previous = queryClient.getQueryData<Product>(['product', productId])

    // Optimistically update
    queryClient.setQueryData<Product>(['product', productId], (old) =>
      old ? { ...old, isFavorite: !old.isFavorite } : old,
    )

    return { previous }
  },
  onError: (_err, productId, context) => {
    // Roll back on error
    queryClient.setQueryData(['product', productId], context?.previous)
  },
  onSettled: (_data, _err, productId) => {
    // Refetch to ensure server state
    queryClient.invalidateQueries({ queryKey: ['product', productId] })
  },
})
```

## Error Handling

```typescript
// Per-query error handling
const { data, error, isError } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
  throwOnError: false,  // Handle in component instead of error boundary
  retry: false,         // Don't retry on failure
})

if (isError) {
  return <ErrorCard message="Could not load products" />
}
```

## Query Selection and Transformation

```typescript
// Transform server response shape
const { data: productNames } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts,
  select: (data) => data.map((p) => p.name),
})

// Derive computed values
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
            staleTime: 60 * 1000,       // 1 minute
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

### QueryClient for Tests

```typescript
// test-utils/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
```

### Custom Render with QueryClientProvider

```typescript
// test-utils/render.tsx
import { render } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTestQueryClient } from './query-client'

export function renderWithQuery(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}
```

### Mock Mode Config

When running with a mock backend (e.g., MSW or Mirage), set `staleTime: Infinity` to prevent React Query from refetching and overwriting mock data.

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: isMockMode ? Infinity : 60 * 1000,
      retry: isMockMode ? false : 3,
    },
  },
})
```
