---
name: testing
description: Testing patterns using Jest, React Testing Library, and MSW. Use when writing tests, debugging test failures, or setting up mock API handlers.
globs: ['**/*.{test,spec}.{ts,tsx,js,jsx}', '**/mocks/**/*', '**/test-utils/**/*', '**/__tests__/**/*', '**/factories/**/*']
---

# Testing Patterns

Patterns for unit and integration testing with Jest, React Testing Library (RTL), and Mock Service Worker (MSW).

## Universal Guidelines

- **File naming**: `ComponentName.test.tsx` or `ComponentName.spec.tsx`
- **Test syntax**: Use `it()` not `test()` for individual cases
- **Query priority**: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- **Async elements**: Use `findBy*` (returns promise) instead of `getBy*` + `waitFor`
- **Absence checks**: Use `queryBy*` (returns null) not `getBy*` (throws)
- **User interactions**: Always use `@testing-library/user-event` over `fireEvent`

## Quick Patterns

### Component Test

```typescript
import { render, screen } from 'test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Submit</Button>)

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### MSW Handler (v2 -- Preferred)

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([{ id: '1', name: 'Product 1' }])
  }),
]
```

### MSW Handler (v1 -- Legacy)

```typescript
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([{ id: '1', name: 'Product 1' }]))
  }),
]
```

### Custom Render with Providers

```typescript
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>,
  )
}
```

## Decision Process

1. **Check which app** -- determines MSW version and test conventions
2. **Check MSW version** -- v1 uses `rest`/`res`/`ctx`, v2 uses `http`/`HttpResponse`
3. **Examine existing tests** -- follow the patterns already established in the codebase

## References

- [Component Testing](references/component-testing.md) -- render setup, forms, pages, router-specific patterns
- [MSW Patterns](references/msw-patterns.md) -- handler setup, v1 vs v2 syntax, runtime overrides
