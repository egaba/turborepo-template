---
name: testing
description: "Quality verification — unit/integration (Jest + RTL + MSW), E2E (Playwright), browser verification, testing pyramid, and pre-release checklist."
globs: ['**/*.{test,spec}.{ts,tsx,js,jsx}', '**/mocks/**/*', '**/test-utils/**/*', '**/__tests__/**/*', '**/factories/**/*']
---

# Testing — Unit, Integration & Browser Verification

Unified quality verification covering automated tests and visual browser debugging.

## Unit & Integration Testing

### Universal Guidelines

- **File naming**: `component-name.test.tsx` (dasherized-case)
- **Test syntax**: Use `it()` not `test()`
- **Query priority**: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- **Async elements**: Use `findBy*` (returns promise) instead of `getBy*` + `waitFor`
- **Absence checks**: Use `queryBy*` (returns null) not `getBy*` (throws)
- **User interactions**: Always use `@testing-library/user-event` over `fireEvent`

### Component Test (Minimal Example)

```typescript
it('calls onClick when clicked', async () => {
  render(<Button onClick={handleClick}>Submit</Button>)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Decision Process

1. **Check which app** — determines MSW version and test conventions
2. **Check MSW version** — v1 uses `rest`/`res`/`ctx`, v2 uses `http`/`HttpResponse`
3. **Examine existing tests** — follow established patterns

## Feature Verification Workflow

Two-layer approach: agent browser verification during development + Playwright E2E for CI.

### During Development (Agent Browser MCP)

After any UI change, visually verify before moving on:

1. Start dev server if not running (`pnpm turbo run dev --filter=web`)
2. `browser_navigate` to affected page
3. `browser_snapshot` — verify DOM structure rendered correctly
4. `browser_click` / `browser_fill` — test interactive elements
5. `browser_console_messages` — check for errors/warnings
6. `browser_resize` — check responsive at 375px, 768px, 1024px
7. Fix issues, re-verify

MCP tool reference: [browser-verification.md](references/browser-verification.md)

### Before Merge (Playwright E2E)

Write Playwright E2E tests for P0/P1 features. E2E tests live in `apps/web/e2e/`. Run with `pnpm test:e2e`.

When to write an E2E test vs. rely on unit tests + browser check → [e2e-testing.md](references/e2e-testing.md)

## Testing Pyramid

| Context | Unit | Integration | E2E | Rationale |
|---------|------|-------------|-----|-----------|
| Classic | 70% | 20% | 10% | Most apps |
| Heavy frontend | 60% | 25% | 15% | UI-heavy with complex interactions |
| API-heavy | 75% | 15% | 10% | Backend-focused |

### Priority Matrix

| Priority | Category | Examples |
|----------|----------|----------|
| P0 | Critical flows | Signup, login, checkout, payment |
| P1 | Major features | Search, CRUD, navigation |
| P2 | Secondary | Filters, sorting, preferences |
| P3 | Edge cases | Empty states, boundary values |

## E2E Testing (Playwright)

**Selector priority**: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS selectors

```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('user@example.com')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL('/dashboard')
})
```

Full setup, API mocking, CI/CD, and commands → [e2e-testing.md](references/e2e-testing.md)

## Anti-Flakiness Patterns

- **Explicit waits**: Never hard waits (`setTimeout`). Use `expect(locator).toBeVisible()` or Playwright auto-wait.
- **Test isolation**: Each test independent — no shared state. Use `beforeEach` for setup.
- **Disable animations in E2E**: Inject CSS to set `animation-duration: 0s` and `transition-duration: 0s`.

## Visual Regression

Playwright screenshot comparison (`toHaveScreenshot`) detects unintended UI changes. Use after component library updates, theme changes, or layout refactors. Update baselines with `npx playwright test --update-snapshots`. Full examples → [e2e-testing.md](references/e2e-testing.md)

## Automated Accessibility

Automation catches ~30-50% of a11y issues — pair with manual keyboard/screen-reader testing.

### Playwright + axe-core (E2E)

```typescript
import AxeBuilder from '@axe-core/playwright'

test('homepage is accessible', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
})
```

### Jest + jest-axe (Component-Level)

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

it('has no a11y violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  expect(await axe(container)).toHaveNoViolations()
})
```

## Pre-Release Checklist

- [ ] All tests pass (unit, integration, E2E)
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Responsive: 375px, 768px, 1024px, 1920px
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] No console errors or warnings
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Security headers present (CSP, HSTS, X-Content-Type-Options)
- [ ] Accessibility audit passed (axe-core or Lighthouse)
- [ ] Visual regression baselines updated (if UI changed)

## References

- **[component-testing.md](references/component-testing.md)** — Custom render, assertions, forms, React Query, App Router testing
- **[msw.md](references/msw.md)** — Server setup, v2 syntax (preferred), v1 legacy, handler organization
- **[browser-verification.md](references/browser-verification.md)** — Chrome DevTools MCP, Cursor Browser MCP, Next.js DevTools, context management
- **[e2e-testing.md](references/e2e-testing.md)** — Playwright setup, visual regression, agent verification checklist, CI/CD
- **[performance-testing.md](references/performance-testing.md)** — Core Web Vitals thresholds, Playwright perf tests, Lighthouse CI, Next.js optimizations
