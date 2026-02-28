# Pages Router Patterns

Patterns for Next.js Pages Router applications that proxy API requests through `/api/*` endpoints to backend services.

## Architecture Overview

```
Browser --> /api/proxy/* --> Backend Service (BACKEND_API_HOST)
                 |
          Auth header injection (JWT from NextAuth)
          Path transformation (/api/proxy/users --> /v2/users/:userId)
```

- All API requests go through `/api/*` endpoints in `src/pages/api/*`
- A unified handler proxies requests to the backend, injecting auth headers automatically
- `getServerSideProps` prefetches data server-side with React Query dehydration

## API Route Handler Patterns

### Unified Handler (Proxy for All CRUD Methods)

A single handler that routes all HTTP methods to the backend service.

```typescript
// helpers/api-route-handlers/apiProxyHandler.ts
import { getToken } from 'next-auth/jwt'
import { StatusCodes } from 'http-status-codes'

const ALLOWED_CLIENT_HEADERS = ['content-type', 'accept-language']

export default async function proxyHandler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method?.toLowerCase()
  const token = await getToken({ req })
  let headers = pick(req.headers, ALLOWED_CLIENT_HEADERS)

  if (token?.accessToken && token?.userId) {
    headers = { ...headers, ...getAuthHeaders(token) }
  }

  const path = getPath(req.url, headers)

  try {
    const response = await backendClient.request({
      url: path,
      method,
      data: req.body,
      headers,
    })
    res.status(response.status).json(response.data)
  } catch (error) {
    const status = error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR
    res.status(status).json(error.response?.data || { error: 'Proxy error' })
  }
}
```

### Re-Export Pattern (One-Liner Endpoint Files)

```typescript
// pages/api/proxy/users/index.ts
export { default } from 'helpers/api-route-handlers/apiProxyHandler'

// Request: localhost:3000/api/proxy/users
// Proxies to: ${BACKEND_API_HOST}/v2/users/:userId
// With automatic auth headers
```

### Standalone Endpoint (Direct Service Integration)

```typescript
// pages/api/catalog/products.ts
import { StatusCodes } from 'http-status-codes'

export default async function productCatalog(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
  }

  const { country, language } = req.query
  const { data, status } = await catalogClient.get('/v2/products/tiers', {
    params: { country, language },
  })

  res.status(status).json(data)
}
```

### Simple Utility Endpoint

```typescript
// pages/api/status.ts
export default function status(req: NextApiRequest, res: NextApiResponse) {
  res.send('ok')
}
```

## API Proxy Architecture

### Path Transformation

```typescript
// helpers/services.ts
export function getPath(url: string, headers: Record<string, string>) {
  let path = url.replace('/api/proxy', '')

  // Inject user ID into user-scoped endpoints
  if (path.includes('/users')) {
    path = path.replace('/users', `/users/${headers['x-user-id']}`)
  }

  return path
}
```

### Auth Header Injection

```typescript
export function getAuthHeaders(token: JWT) {
  return {
    authorization: `Bearer ${token.accessToken}`,
    'x-user-id': token.userId,
    'x-client-id': token.clientId || process.env.API_CLIENT_ID,
  }
}
```

### Backend Client Setup

```typescript
// helpers/api-clients.ts
import axios from 'axios'

// Server-side client for proxying to backend
export const backendClient = axios.create({
  baseURL: `${process.env.BACKEND_API_HOST}/v2`,
})
```

## Server-Side Data Fetching (SSR)

### preloadQueryClient Pattern

Central helper for session management, auth redirects, and React Query prefetching.

```typescript
// helpers/default-gssp.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'

type PrefetchItem = {
  queryKey: unknown[]
  queryFn: (...args: any[]) => Promise<unknown>
  args?: Record<string, unknown>
}

type PreloadOptions = {
  prefetches?: PrefetchItem[]
  prefetchesNoAuth?: PrefetchItem[]
}

export default async function preloadQueryClient(
  context: GetServerSidePropsContext,
  { prefetches = [], prefetchesNoAuth = [] }: PreloadOptions = {},
) {
  const queryClient = new QueryClient()
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: { destination: '/account/login', permanent: false },
    }
  }

  // Prefetch common queries for authenticated users
  const queries = [
    queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: prefetch(getUser, {}, context),
    }),
    queryClient.fetchQuery({
      queryKey: ['notifications'],
      queryFn: prefetch(getNotifications, {}, context),
    }),
  ]

  // Add page-specific prefetches
  prefetches.forEach(({ queryKey, queryFn, args }) => {
    queries.push(
      queryClient.fetchQuery({
        queryKey,
        queryFn: prefetch(queryFn, args || {}, context),
      }),
    )
  })

  await Promise.allSettled(queries)

  return { queryClient, session }
}
```

### Usage in getServerSideProps

```typescript
// pages/dashboard.tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await preloadQueryClient(context, {
    prefetches: [
      {
        queryKey: ['dashboard', context.query.date],
        queryFn: getDashboardData,
        args: { date: context.query.date },
      },
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

### Prefetch Helper (Server-Side Axios with Cookies)

```typescript
// helpers/prefetch.ts
import axios from 'axios'

export function prefetch<T>(
  queryFn: (opts: { client?: AxiosInstance }) => Promise<T>,
  args: Record<string, unknown>,
  context: GetServerSidePropsContext,
) {
  return () => {
    const client = axios.create({
      baseURL: process.env.APP_HOST_INTERNAL,
      headers: { common: { cookie: context.req.headers.cookie || '' } },
    })

    return queryFn({ ...args, client })
  }
}
```

## Browser Client Setup

```typescript
// queries/index.ts
import axios from 'axios'

// Client-side requests go through the local /api/* proxy
export const browserClient = axios.create({
  baseURL: process.env.NEXTAUTH_URL || '',
})
```

## Query Function Pattern

Query functions accept an optional `client` parameter so they work both client-side (browserClient) and server-side (prefetch client with cookies).

```typescript
// queries/user.ts
import { browserClient } from 'queries'

export async function getUser({ client = browserClient } = {}): Promise<User> {
  const { data } = await client.get('/api/proxy/users')
  return data
}

// Client-side usage
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: () => getUser(),
})

// Server-side usage (in prefetch)
prefetch(getUser, {}, context)
// Creates a server-side client with cookies and passes it as `client`
```
