# Component Testing

Custom render, assertions, forms, React Query, error boundaries, and App Router testing.

## Custom Render with Providers

```typescript
// __tests__/render.tsx — import as @/__tests__/render
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })

export function renderWithProviders(ui: React.ReactElement, options: RenderOptions = {}) {
  const queryClient = createTestQueryClient()
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return render(ui, { wrapper: Wrapper, ...options })
}
export * from '@testing-library/react'
export { renderWithProviders as render }
// Add SessionProvider wrapper when auth is configured
```

## Rendering & Interactions

```typescript
import { render, screen, waitFor } from 'test-utils'
import userEvent from '@testing-library/user-event'

it('renders with correct text', () => {
  render(<Button>Submit</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Submit')
})

it('toggles state on click', async () => {
  const onChange = jest.fn()
  render(<Toggle label="Dark mode" onChange={onChange} />)
  await userEvent.click(screen.getByRole('switch', { name: /dark mode/i }))
  expect(onChange).toHaveBeenCalledWith(true)
})
```

**Assertion cheat sheet:**

```typescript
screen.getByRole('button', { name: /submit/i }) // role first
screen.getByLabelText(/email address/i) // label second
await screen.findByText('Success message') // async: findBy*
expect(screen.queryByText('Error')).not.toBeInTheDocument() // absence: queryBy*
```

## Form Testing

```typescript
jest.mock('next-auth/react', () => ({ ...jest.requireActual('next-auth/react'), signIn: jest.fn() }))

it('calls signIn with correct credentials', async () => {
  ;(signIn as jest.Mock).mockResolvedValue({ ok: true })
  render(<LoginForm />)
  await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
  await userEvent.type(screen.getByLabelText(/password/i), 'password123')
  await userEvent.click(screen.getByRole('button', { name: /log in/i }))
  await waitFor(() =>
    expect(signIn).toHaveBeenCalledWith(
      'credentials',
      expect.objectContaining({ username: 'user@example.com', password: 'password123' }),
    ),
  )
})
```

## React Query Integration

```typescript
it('shows loading then data', async () => {
  render(<ProductList />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument())
})

it('shows error state on API failure', async () => {
  server.use(http.get('/api/products', () => HttpResponse.json({ error: 'fail' }, { status: 500 })))
  render(<ProductList />)
  await waitFor(() => expect(screen.getByText('Error loading products')).toBeInTheDocument())
})
```

## Error Boundary Testing

```typescript
it('renders fallback on error', () => {
  const ThrowError = () => { throw new Error('Test error') }
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  render(<ErrorBoundary fallback={<div>Something went wrong</div>}><ThrowError /></ErrorBoundary>)
  expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  spy.mockRestore()
})
```

## App Router — Server Components

```typescript
jest.mock('@/lib/api', () => ({
  getProducts: jest.fn().mockResolvedValue([
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
  ]),
}))

it('renders products from server component', async () => {
  const Component = await ProductsPage()
  render(Component)
  expect(screen.getByText('Product 1')).toBeInTheDocument()
})
```

## App Router — API Route Handlers

```typescript
import { GET, POST } from '@/app/api/products/route'

it('GET returns product list', async () => {
  const response = await GET(new Request('http://localhost:3000/api/products'))
  expect(response.status).toBe(200)
})

it('POST creates a product', async () => {
  const req = new Request('http://localhost:3000/api/products', {
    method: 'POST',
    body: JSON.stringify({ name: 'New Product', price: 10 }),
  })
  const response = await POST(req)
  expect(response.status).toBe(201)
})
```

## Test Organization

Structure: `features/{feature}/components/*.test.tsx` colocated with components, or `__tests__/` for cross-cutting tests. Commands: see devops skill.
