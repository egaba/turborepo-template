# E2E Testing

Playwright E2E, visual regression, agent verification, and CI/CD integration.

## When to Write E2E Tests

| Priority | Needs E2E? | Examples |
|----------|-----------|----------|
| P0 Critical | Always | Auth, checkout, onboarding |
| P1 Major | Yes | CRUD, navigation, search |
| P2 Secondary | Rarely | Filters, sorting, preferences |
| P3 Edge cases | No | Empty states, boundary — unit tests sufficient |

## Playwright Setup

```bash
npm init playwright@latest
npx playwright install
```

## Test Pattern

```typescript
import { test, expect } from '@playwright/test'

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should login successfully', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Dashboard')
  })
})
```

**Selector priority**: `getByRole` > `getByLabel` > `getByText` > `getByTestId` > CSS selectors

## API Mocking & Tests

```typescript
await page.route('**/api/users', route =>
  route.fulfill({ status: 200, body: JSON.stringify([]) })
)

test('GET /api/endpoint returns expected shape', async ({ request }) => {
  const response = await request.get('/api/endpoint')
  expect(response.ok()).toBe(true)
})
```

## Visual Regression

Playwright screenshot comparison detects unintended UI changes.

```typescript
test('homepage visual regression', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png')
})

test('component-level check', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('header')).toHaveScreenshot('header.png')
})

test('with thresholds', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page).toHaveScreenshot('dashboard.png', {
    maxDiffPixels: 100, maxDiffPixelRatio: 0.01,
  })
})
```

### Deterministic Screenshots

```typescript
await page.route('**/api/products', route =>
  route.fulfill({ status: 200, body: JSON.stringify([{ id: '1', name: 'Fixed Product' }]) })
)
await page.addStyleTag({
  content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }',
})
await page.goto('/products')
await expect(page).toHaveScreenshot('products.png')
```

```bash
npx playwright test --update-snapshots     # Update all baselines
npx playwright test --grep @visual         # Run only visual tests
```

## Agent Browser Verification Checklist

Run after every UI change. Do not claim completion without visual confirmation.

1. **Functional**: `browser_navigate` -> `browser_snapshot` -> `browser_click`/`browser_fill` -> verify
2. **Console**: `browser_console_messages` -- check for errors (hydration warnings, rejections, 404s)
3. **Responsive**: resize to 375px, 768px, 1024px -- verify no overflow, readable text, correct layout
4. **Interactions**: fill forms, submit, verify validation; click buttons, verify state changes

## CI/CD Integration

```yaml
- run: npx playwright install --with-deps
- run: npx playwright test
- uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/

- run: npx playwright test --grep @visual
- uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: visual-diffs
    path: test-results/
```

Commit baseline screenshots to repo so CI has reference images.

## Commands

```bash
pnpm test:e2e                              # All E2E tests
pnpm test:e2e:ui                           # UI mode (debugging)
npx playwright test --grep "Feature Name"  # Specific tests
npx playwright show-report                 # HTML report
```

## Feature Completion Criteria

- [ ] Unit tests pass (`pnpm test:ci`)
- [ ] Agent browser verification done (functional + responsive + console clean)
- [ ] E2E test written for P0/P1 features (`pnpm test:e2e`)
- [ ] No TypeScript errors (`pnpm check-types`)
- [ ] Visual regression baselines updated (if UI changed)
