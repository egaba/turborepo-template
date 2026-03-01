# MSW (Mock Service Worker)

Server setup, handler patterns, and runtime overrides. v2 syntax preferred.

## Server Setup

```typescript
// mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

## Test Lifecycle

```typescript
// jest.setup.ts
import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

- `server.listen()` — start intercepting requests
- `server.resetHandlers()` — remove runtime overrides, restore defaults
- `server.close()` — stop intercepting, clean up

## Preferred: MSW v2 Handlers

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: '1', name: 'Product 1', price: 10.99 },
      { id: '2', name: 'Product 2', price: 15.99 },
    ])
  }),

  http.post('/api/products', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: '3', ...body }, { status: 201 })
  }),

  http.get('/api/products/:id', ({ params }) => {
    return HttpResponse.json({ id: params.id, name: `Product ${params.id}` })
  }),

  http.delete('/api/products/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/user/profile', ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return HttpResponse.json({ id: 1, name: 'Test User', email: 'test@example.com' })
  }),
]
```

## Handler Organization

```typescript
// mocks/handlers/index.ts
import { productHandlers } from './products'
import { userHandlers } from './users'
import { authHandlers } from './auth'

export const handlers = [...productHandlers, ...userHandlers, ...authHandlers]
```

## Runtime Overrides

Override defaults per-test with `server.use()`. Restored by `afterEach(() => server.resetHandlers())`.

```typescript
import { http, HttpResponse } from 'msw'
import { server } from 'mocks/server'

it('shows error state when API fails', async () => {
  server.use(
    http.get('/api/products', () => {
      return HttpResponse.json({ error: 'Server error' }, { status: 500 })
    }),
  )
  render(<ProductList />)
  await waitFor(() => expect(screen.getByText('Error loading products')).toBeInTheDocument())
})
```

## Legacy: MSW v1

```typescript
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: '1', name: 'Product 1' }]))
  }),
]
```

### Migration Table: v1 to v2

| Concept       | v1                                      | v2                                         |
| ------------- | --------------------------------------- | ------------------------------------------ |
| Import        | `import { rest } from 'msw'`            | `import { http, HttpResponse } from 'msw'` |
| Handler       | `rest.get(url, (req, res, ctx) => ...)` | `http.get(url, ({ request }) => ...)`      |
| JSON response | `res(ctx.json(data))`                   | `HttpResponse.json(data)`                  |
| Status code   | `res(ctx.status(201), ctx.json(data))`  | `HttpResponse.json(data, { status: 201 })` |
| Request body  | `req.body` (sync)                       | `await request.json()` (async)             |
| Path params   | `req.params.id`                         | `params.id` (destructured)                 |
| No content    | `res(ctx.status(204))`                  | `new HttpResponse(null, { status: 204 })`  |
