---
name: nextjs
description: Next.js routing and API patterns for Pages Router and App Router applications.
globs: ['**/pages/**/*', '**/app/**/*', 'next.config.*', 'middleware.*']
---

# Next.js Routing & API Patterns

Patterns for building Next.js applications with both the Pages Router and App Router.

## Router Comparison

| Feature          | Pages Router (`pages/`)             | App Router (`app/`)                     |
| ---------------- | ----------------------------------- | --------------------------------------- |
| Routes           | `pages/products/index.tsx`          | `app/products/page.tsx`                 |
| API endpoints    | `pages/api/products.ts` (handler)   | `app/api/products/route.ts` (GET/POST) |
| Data fetching    | `getServerSideProps` / `getStaticProps` | Server Components / `fetch`         |
| Layouts          | `_app.tsx` + per-page `.getLayout`  | `layout.tsx` (nested, automatic)        |
| Middleware       | `middleware.ts` at app root         | `middleware.ts` at app root             |
| Auth protection  | `getServerSideProps` redirect       | `middleware.ts` + `next-auth/middleware` |
| Client state     | React Query + `dehydrate`           | React Query or Server Components        |

## Key Patterns

### Pages Router API Route (proxy pattern)

```typescript
// pages/api/proxy/[...path].ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req })
  const path = (req.query.path as string[]).join('/')
  const headers = token ? { authorization: `Bearer ${token.accessToken}` } : {}

  const response = await backendClient.request({
    url: `/${path}`,
    method: req.method,
    data: req.body,
    headers,
  })

  res.status(response.status).json(response.data)
}
```

### App Router API Route

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { data } = await apiClient.get('/products')
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { data } = await apiClient.post('/products', body)
  return NextResponse.json(data, { status: 201 })
}
```

## References

- [Pages Router Patterns](references/pages-router-patterns.md) -- proxy architecture, SSR prefetching, auth headers
- [App Router Patterns](references/app-router-patterns.md) -- route handlers, server components, middleware
