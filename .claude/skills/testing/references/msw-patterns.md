# MSW Patterns

Patterns for Mock Service Worker (MSW) API mocking in tests. Covers both v1 (legacy) and v2 (preferred) syntax.

## MSW v2 Syntax (Preferred)

MSW v2 uses `http` and `HttpResponse` instead of `rest`, `res`, and `ctx`.

### Handler Examples

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // GET -- return JSON array
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: '1', name: 'Product 1', price: 10.99 },
      { id: '2', name: 'Product 2', price: 15.99 },
    ])
  }),

  // POST -- read request body, return created resource
  http.post('/api/products', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: '3', ...body }, { status: 201 })
  }),

  // GET with path params
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({ id, name: `Product ${id}`, price: 9.99 })
  }),

  // PATCH -- partial update
  http.patch('/api/products/:id', async ({ params, request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: params.id, ...body })
  }),

  // DELETE -- no content
  http.delete('/api/products/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
```

### Auth-Aware Handler

```typescript
http.get('/api/user/profile', ({ request }) => {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) {
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return HttpResponse.json({ id: 1, name: 'Test User', email: 'test@example.com' })
}),
```

### Error Response Handler

```typescript
http.get('/api/products', () => {
  return HttpResponse.json(
    { error: 'Internal server error' },
    { status: 500 },
  )
}),
```

## MSW v1 Syntax (Legacy)

MSW v1 uses `rest` with `(req, res, ctx)` callback pattern. Some older codebases still use this.

### Handler Examples

```typescript
// mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  // GET
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: 'Product 1', price: 10.99 },
        { id: '2', name: 'Product 2', price: 15.99 },
      ]),
    )
  }),

  // POST
  rest.post('/api/products', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: '3', name: 'New Product' }))
  }),

  // Auth-aware
  rest.get('/api/user/profile', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }))
    }
    return res(ctx.json({ id: 1, name: 'Test User' }))
  }),

  // Error response
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'Server error' }))
  }),
]
```

## Server Setup

The same setup pattern works for both MSW v1 and v2.

```typescript
// mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

### Test Lifecycle

```typescript
// jest.setup.ts or setupFilesAfterSetup
import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

**Key lifecycle methods**:
- `server.listen()` -- start intercepting requests
- `server.resetHandlers()` -- remove runtime overrides, restore default handlers
- `server.close()` -- stop intercepting, clean up

## Handler Organization

Organize handlers by domain for maintainability.

```typescript
// mocks/handlers/index.ts
import { productHandlers } from './products'
import { userHandlers } from './users'
import { authHandlers } from './auth'

export const handlers = [
  ...productHandlers,
  ...userHandlers,
  ...authHandlers,
]
```

```typescript
// mocks/handlers/products.ts (v2)
import { http, HttpResponse } from 'msw'

export const productHandlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts)
  }),
  http.post('/api/products', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: crypto.randomUUID(), ...body }, { status: 201 })
  }),
]
```

## Runtime Handler Overrides

Override default handlers for specific test scenarios using `server.use()`.

```typescript
import { http, HttpResponse } from 'msw'
import { server } from 'mocks/server'

describe('ProductList', () => {
  it('shows error state when API fails', async () => {
    // Override the default success handler for this test only
    server.use(
      http.get('/api/products', () => {
        return HttpResponse.json({ error: 'Server error' }, { status: 500 })
      }),
    )

    render(<ProductList />)

    await waitFor(() => {
      expect(screen.getByText('Error loading products')).toBeInTheDocument()
    })
  })

  it('shows empty state when no products', async () => {
    server.use(
      http.get('/api/products', () => {
        return HttpResponse.json([])
      }),
    )

    render(<ProductList />)

    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeInTheDocument()
    })
  })

  // Default handler is restored automatically by afterEach(() => server.resetHandlers())
})
```

## Migration Notes: v1 to v2

| Concept            | MSW v1                                    | MSW v2                                   |
| ------------------ | ----------------------------------------- | ---------------------------------------- |
| Import             | `import { rest } from 'msw'`             | `import { http, HttpResponse } from 'msw'` |
| Handler            | `rest.get(url, (req, res, ctx) => ...)`   | `http.get(url, ({ request }) => ...)`    |
| JSON response      | `res(ctx.json(data))`                     | `HttpResponse.json(data)`               |
| Status code        | `res(ctx.status(201), ctx.json(data))`    | `HttpResponse.json(data, { status: 201 })` |
| Request body       | `req.body` (sync)                         | `await request.json()` (async)           |
| Request headers    | `req.headers.get('Authorization')`        | `request.headers.get('Authorization')`   |
| Path params        | `req.params.id`                           | `params.id` (destructured from handler)  |
| Query params       | `req.url.searchParams.get('q')`           | `new URL(request.url).searchParams.get('q')` |
| No content         | `res(ctx.status(204))`                    | `new HttpResponse(null, { status: 204 })` |
| Delay              | `res(ctx.delay(200), ctx.json(data))`     | `await delay(200); return HttpResponse.json(data)` |
| Server setup       | Same: `setupServer(...handlers)`          | Same: `setupServer(...handlers)`         |

**Key difference**: v2 handler callbacks are async-friendly and use standard `Request`/`Response` objects. v1 uses a custom `req`/`res`/`ctx` pattern.
