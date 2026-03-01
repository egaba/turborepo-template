# API Route Handlers

Route handler patterns, error handling, validation, and middleware for Next.js API routes.

## CRUD Route (App Router)

```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { StatusCodes } from 'http-status-codes'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '20')

  const { items, total } = await getProducts({ page, limit })

  return NextResponse.json({
    data: { items, pagination: { page, limit, total, hasNext: page * limit < total } },
    status: 'success',
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = createProductSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', code: 'VALIDATION_ERROR', details: parsed.error.flatten() },
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  const product = await createProduct(parsed.data)
  return NextResponse.json({ data: product, status: 'success' }, { status: StatusCodes.CREATED })
}
```

## Dynamic Route

```typescript
// app/api/products/[id]/route.ts
import type { NextRequest } from 'next/server'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found', code: 'NOT_FOUND' },
      { status: StatusCodes.NOT_FOUND },
    )
  }

  return NextResponse.json({ data: product, status: 'success' })
}
```

## Error Handling Wrapper

```typescript
type RouteHandler = (req: NextRequest, context?: any) => Promise<NextResponse>

function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      return await handler(req, context)
    } catch (error) {
      console.error('[API Error]', error)
      return NextResponse.json(
        { error: 'Internal server error', code: 'INTERNAL_ERROR' },
        { status: StatusCodes.INTERNAL_SERVER_ERROR },
      )
    }
  }
}

export const GET = withErrorHandling(async (req) => {
  const data = await fetchData()
  return NextResponse.json({ data, status: 'success' })
})
```

Validate request bodies with Zod `safeParse`. Return `{ error, code: 'VALIDATION_ERROR', details: parsed.error.flatten() }` on failure. See CRUD Route example above.

## Middleware Patterns

### Authentication Middleware

```typescript
// lib/api-middleware.ts
import { getServerSession } from 'next-auth'

async function requireAuth(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required', code: 'UNAUTHORIZED' },
      { status: StatusCodes.UNAUTHORIZED },
    )
  }
  return session
}
```

### Rate Limiting (Simple In-Memory)

```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string, max = 100, windowMs = 60_000): boolean {
  const now = Date.now()
  const r = rateLimitMap.get(ip)
  if (!r || now > r.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  if (r.count >= max) return false
  r.count++
  return true
}
```

## Client-Side API Integration

Use typed `fetch` with `ApiResponse<T>`. Build `URLSearchParams` for query params. Throw on `!res.ok`. Return `json.data`.
