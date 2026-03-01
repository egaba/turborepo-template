# App Router Route Handlers

Route handler patterns for `app/api/*/route.ts` with direct backend calls.

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
