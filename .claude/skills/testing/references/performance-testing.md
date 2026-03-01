# Performance Testing — Core Web Vitals

## Thresholds

| Metric | Good | Needs Work | Poor | What It Measures |
|--------|------|------------|------|------------------|
| **LCP** | < 2.5s | 2.5–4.0s | > 4.0s | Largest Contentful Paint — when main content is visible |
| **CLS** | < 0.1 | 0.1–0.25 | > 0.25 | Cumulative Layout Shift — visual stability |
| **INP** | < 200ms | 200–500ms | > 500ms | Interaction to Next Paint — input responsiveness |

## Measuring with Lighthouse

### CLI (local)

```bash
# Single run
npx lighthouse http://localhost:3000 --output=json --output=html --output-path=./lighthouse-report

# Performance only
npx lighthouse http://localhost:3000 --only-categories=performance
```

### Playwright (automated)

```typescript
import { test, expect } from '@playwright/test'

test('Core Web Vitals are within thresholds', async ({ page }) => {
  await page.goto('/')

  // Wait for page to fully load
  await page.waitForLoadState('networkidle')

  const vitals = await page.evaluate(() => {
    return new Promise<{ lcp: number; cls: number }>((resolve) => {
      let lcp = 0
      let cls = 0

      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        lcp = entries[entries.length - 1]?.startTime ?? 0
      }).observe({ type: 'largest-contentful-paint', buffered: true })

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as LayoutShift).hadRecentInput) {
            cls += (entry as LayoutShift).value
          }
        }
      }).observe({ type: 'layout-shift', buffered: true })

      // Allow observers to collect data
      setTimeout(() => resolve({ lcp, cls }), 1000)
    })
  })

  expect(vitals.lcp).toBeLessThan(2500)
  expect(vitals.cls).toBeLessThan(0.1)
})

// Declare LayoutShift type for TypeScript
interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}
```

### Lighthouse CI (GitHub Actions)

```yaml
# .github/workflows/lighthouse.yaml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm turbo run build --filter=web
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: ./lighthouserc.json
          uploadArtifacts: true
```

```jsonc
// lighthouserc.json
{
  "ci": {
    "collect": {
      "startServerCommand": "pnpm turbo run start --filter=web",
      "startServerReadyPattern": "Ready",
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["warn", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

## Next.js-Specific Optimizations

### LCP

| Optimization | How |
|-------------|-----|
| Images | `next/image` with `priority` on above-fold hero images, correct `sizes` attribute |
| Fonts | `next/font` with `display: 'swap'` — eliminates FOIT and layout shift |
| Streaming | `loading.tsx` + `<Suspense>` — show content progressively |
| Preloading | `<link rel="preload">` for critical resources in `<head>` |

### CLS

| Optimization | How |
|-------------|-----|
| Images | Always set `width`/`height` or use `fill` with a sized container |
| Fonts | `next/font` auto-generates `size-adjust` to match fallback metrics |
| Dynamic content | Reserve space with skeleton loaders (`loading.tsx`) |
| Ads/embeds | Fixed-size containers with `min-height` |

### INP

| Optimization | How |
|-------------|-----|
| Heavy computation | Move to Web Workers or Server Actions |
| Long tasks | Break up with `startTransition` for non-urgent updates |
| Code splitting | `next/dynamic` for heavy components not needed at initial render |
| Event handlers | Debounce rapid inputs (search, resize) |

## Bundle Size

Analyze after build: `ANALYZE=true pnpm turbo run build --filter=web` (requires `@next/bundle-analyzer` configured in `next.config.ts` with `bundleAnalyzer({ enabled: process.env['ANALYZE'] === 'true' })`).
