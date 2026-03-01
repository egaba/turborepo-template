# App Router Client-Side Patterns

Query functions, custom hooks, mutations, and Server vs Client Component data fetching.

## Client-Side Patterns

### Query Function Pattern

```typescript
// queries/products.ts
import axios from 'axios'

export async function getProducts(params: ProductParams): Promise<ProductResponse> {
  const { data } = await axios.post('/api/products/search', params)
  return data
}

export async function updateProduct(
  id: string,
  updates: ProductUpdate,
): Promise<ProductResponse> {
  const { data } = await axios.patch(`/api/products/${id}`, updates)
  return data
}
```

### Custom Hook Pattern

Combines URL search params with React Query for filter/pagination state.

```typescript
// hooks/useProducts.ts
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from 'queries/products'

export default function useProducts() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const status = searchParams.get('status') || 'active'

  const filters = { page, status }

  const { data: products, ...rest } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  })

  return { products, ...rest }
}
```

### Mutation with Cache Invalidation

```typescript
// In a client component
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { updateProduct } from 'queries/products'

export default function ProductEditForm({ productId }: { productId: string }) {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductUpdate) => updateProduct(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] })
      push(`/products/${productId}`)
    },
    onError: (error) => {
      console.error('Update failed:', error)
    },
  })

  // form JSX...
}
```

## Server Component vs Client Component Data Fetching

### Server Component (Direct Fetch)

```typescript
// app/products/page.tsx (Server Component by default)
import apiClient from 'app/api/api-client'

export default async function ProductsPage() {
  const { data: products } = await apiClient.get('/v2/products')

  return (
    <ul>
      {products.map((p: Product) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}
```

### Client Component (React Query)

```typescript
// app/products/product-list.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { getProducts } from 'queries/products'

export default function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({}),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <ul>
      {data?.items.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}
```
