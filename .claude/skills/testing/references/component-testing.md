# Component Testing Patterns

Patterns for testing React components with Jest, React Testing Library, and provider wrappers.

## Custom Render with Providers

Most components need QueryClient, theme, and session providers. Create a custom render utility.

```typescript
// test-utils/render.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import { theme } from '../src/theme'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

type CustomRenderOptions = RenderOptions & {
  session?: any
}

export function renderWithProviders(
  ui: React.ReactElement,
  { session = null, ...options }: CustomRenderOptions = {},
) {
  const queryClient = createTestQueryClient()

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
```

## Component Testing Patterns

### Basic Rendering and Assertions

```typescript
import { render, screen } from 'test-utils'
import { Button } from 'components/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Submit')
  })

  it('shows loading spinner when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### User Interactions

```typescript
import userEvent from '@testing-library/user-event'

describe('Toggle', () => {
  it('toggles state on click', async () => {
    const onChange = jest.fn()
    render(<Toggle label="Dark mode" onChange={onChange} />)

    await userEvent.click(screen.getByRole('switch', { name: /dark mode/i }))

    expect(onChange).toHaveBeenCalledWith(true)
  })
})
```

## Form Testing

### Validation and Submission

```typescript
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'
import { render, screen, waitFor } from 'test-utils'
import LoginForm from 'components/LoginForm'

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signIn: jest.fn(),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    ;(signIn as jest.Mock).mockClear()
  })

  it('shows validation error if password is blank', async () => {
    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(signIn).not.toHaveBeenCalled()
  })

  it('calls signIn with correct credentials', async () => {
    ;(signIn as jest.Mock).mockResolvedValue({ ok: true })
    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({
          username: 'user@example.com',
          password: 'password123',
        }),
      )
    })
  })
})
```

## Page Testing with Mock Data

```typescript
import { render, screen, waitFor } from 'test-utils'
import SettingsPage from 'pages/settings'

const mockSession = {
  user: { id: '1', name: 'Test User', email: 'test@example.com' },
}

describe('SettingsPage', () => {
  it('renders settings links', async () => {
    render(<SettingsPage />, { session: mockSession })

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /account settings/i }),
      ).toBeInTheDocument()
    })
  })

  it('hides admin link for non-admin users', async () => {
    render(<SettingsPage />, { session: mockSession })

    await waitFor(() => {
      expect(
        screen.queryByRole('link', { name: /admin/i }),
      ).not.toBeInTheDocument()
    })
  })
})
```

## React Query Integration Testing

```typescript
import { render, screen, waitFor } from 'test-utils'
// MSW server setup assumed (see msw-patterns.md)

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then((r) => r.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <ul>
      {data?.map((p: any) => <li key={p.id}>{p.name}</li>)}
    </ul>
  )
}

describe('ProductList', () => {
  it('shows loading then data', async () => {
    render(<ProductList />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
    })
  })

  it('shows error state on API failure', async () => {
    // Override handler for this test (see msw-patterns.md)
    server.use(
      http.get('/api/products', () => {
        return HttpResponse.json({ error: 'fail' }, { status: 500 })
      }),
    )

    render(<ProductList />)

    await waitFor(() => {
      expect(screen.getByText('Error loading products')).toBeInTheDocument()
    })
  })
})
```

## App Router Testing

### Server Components

```typescript
import { render, screen } from 'test-utils'
import ProductsPage from '@/app/products/page'

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
  expect(screen.getByText('Product 2')).toBeInTheDocument()
})
```

### API Route Handlers

```typescript
import { GET, POST } from '@/app/api/products/route'

it('GET /api/products returns product list', async () => {
  const request = new Request('http://localhost:3000/api/products')
  const response = await GET(request)
  const data = await response.json()

  expect(response.status).toBe(200)
  expect(Array.isArray(data)).toBe(true)
})

it('POST /api/products creates a product', async () => {
  const request = new Request('http://localhost:3000/api/products', {
    method: 'POST',
    body: JSON.stringify({ name: 'New Product', price: 10 }),
  })

  const response = await POST(request)
  const data = await response.json()

  expect(response.status).toBe(201)
  expect(data.name).toBe('New Product')
})
```

## Pages Router Testing

### getServerSideProps

```typescript
import { getServerSideProps } from '@/pages/dashboard'

jest.mock('next-auth', () => ({
  getSession: jest.fn().mockResolvedValue({
    user: { id: '1', name: 'Test User' },
  }),
}))

it('returns user data from getServerSideProps', async () => {
  const context = { req: {}, res: {}, params: {}, query: {} }
  const result = await getServerSideProps(context as any)

  expect(result).toEqual({
    props: expect.objectContaining({
      user: expect.objectContaining({ id: '1' }),
    }),
  })
})
```

### API Handlers (node-mocks-http)

```typescript
import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/products'

it('GET /api/products returns products', async () => {
  const { req, res } = createMocks({ method: 'GET' })

  await handler(req, res)

  expect(res._getStatusCode()).toBe(200)
  const data = JSON.parse(res._getData())
  expect(Array.isArray(data)).toBe(true)
})
```

## Error Boundary Testing

```typescript
const ThrowError = () => {
  throw new Error('Test error')
}

it('renders fallback on error', () => {
  // Suppress console.error for this test
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

  render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThrowError />
    </ErrorBoundary>,
  )

  expect(screen.getByText('Something went wrong')).toBeInTheDocument()

  spy.mockRestore()
})
```

## Test Organization

```
__tests__/
  components/
    Button.test.tsx
    LoginForm.test.tsx
  pages/
    dashboard.test.tsx
  api/
    products.test.ts
  hooks/
    useProducts.test.ts
```

## Assertion Patterns

```typescript
// Prefer semantic queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email address/i)

// Use findBy for async elements
await screen.findByText('Success message')

// Use queryBy to test absence
expect(screen.queryByText('Error')).not.toBeInTheDocument()

// Test accessibility attributes
expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'false')

// Test link targets
expect(screen.getByRole('link', { name: /settings/i })).toHaveAttribute('href', '/settings')
```

## Turborepo Testing Commands

```bash
# Test specific workspace
pnpm turbo run test --filter=my-app

# CI mode (non-interactive)
pnpm turbo run test:ci --filter=my-app

# Watch mode
pnpm turbo run test --filter=my-app -- --watch

# Single test file
pnpm turbo run test --filter=my-app -- --testPathPatterns="Button.test"

# Coverage
pnpm turbo run test:coverage --filter=my-app
```
