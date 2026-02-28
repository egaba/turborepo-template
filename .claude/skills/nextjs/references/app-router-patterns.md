# App Router Patterns

Patterns for Next.js App Router applications with direct API routes, server components, and client-side React Query.

## Architecture Overview

```
Browser --> app/api/*/route.ts --> Backend Service (direct)
                  |
           No proxy layer -- route handlers call services directly
```

- API routes live in `app/api/*/route.ts` and export named HTTP method functions
- Axios clients connect directly to backend services (no proxy indirection)
- Authentication via NextAuth.js with route-level middleware protection
- Client-side data fetching with React Query custom hooks

## Route Handler Patterns

### Simple GET Handler

```typescript
// app/api/status/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'healthy' })
}
```

### POST with Request Body Parsing

```typescript
// app/api/items/search/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import apiClient from 'app/api/api-client'

const postSearchItems = async (req: NextRequest) => {
  const body = await req.json()
  const { data } = await apiClient.post('/search/items', body)
  return NextResponse.json(data)
}

export const POST = withErrorHandling(postSearchItems)
```

### CRUD Route Handler (GET + POST in Same File)

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import apiClient from '../api-client'

const getProducts = async () => {
  const { data } = await apiClient.get('/v2/products?status=all')
  return NextResponse.json(data)
}

const createProduct = async (req: NextRequest) => {
  const body = await req.json()
  const { data } = await apiClient.post('/v2/products', body)
  return NextResponse.json(data, { status: 201 })
}

export const GET = withErrorHandling(getProducts)
export const POST = withErrorHandling(createProduct)
```

### withErrorHandling Wrapper

```typescript
// app/api/helpers/error-handling.ts
import { NextRequest, NextResponse } from 'next/server'
import { StatusCodes } from 'http-status-codes'

type RouteHandler = (req: NextRequest, context?: any) => Promise<NextResponse>

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      return await handler(req, context)
    } catch (error: any) {
      const status = error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR
      const message = error.response?.data?.message || 'Internal server error'

      console.error(`[API Error] ${req.method} ${req.url}:`, message)

      return NextResponse.json({ error: message }, { status })
    }
  }
}
```

## API Client Configuration

```typescript
// app/api/api-client.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.BACKEND_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
```

For multiple backend services, create separate clients:

```typescript
// app/api/clients/catalog-client.ts
export const catalogClient = axios.create({
  baseURL: process.env.CATALOG_SERVICE_URL,
})

// app/api/clients/auth-client.ts
export const authClient = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL,
})
```

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
      {data?.items.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  )
}
```

## Middleware for Route Protection

```typescript
// middleware.ts
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!api/status|_next/image|_next/static|images|favicon.ico).*)'],
}
```

This requires a valid session for all routes except health checks and static assets. It does NOT check permissions -- only that the user is authenticated.

## Authentication

### Server-Side Session Access

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/config'

// In a Server Component or Route Handler
const session = await getServerSession(authOptions)
const userGroups = session?.user.groups || []
```

### Client-Side Session Access

```typescript
'use client'

import { useSession } from 'next-auth/react'

export default function ProfileBadge() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <Skeleton />
  if (status === 'unauthenticated') return <LoginButton />

  return <span>{session?.user?.name}</span>
}
```

### Permission-Protected API Route

```typescript
import { withPermission } from 'helpers/auth/server'
import { permissions } from 'constants/auth'

export const POST = withPermission(
  async (req: NextRequest) => {
    const body = await req.json()
    // ... handler logic
    return NextResponse.json({ success: true })
  },
  permissions.MANAGE_PRODUCTS,
)
```
