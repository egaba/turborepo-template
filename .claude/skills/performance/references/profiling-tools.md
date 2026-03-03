# Profiling Tools

Setup and usage for performance measurement tools.

## Lighthouse CI

### Setup and Configuration

```bash
pnpm add -D @lhci/cli
```

```jsonc
// lighthouserc.json
{
  "ci": {
    "collect": {
      "startServerCommand": "pnpm turbo run start --filter=web",
      "startServerReadyPattern": "Ready",
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3,
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["warn", { "maxNumericValue": 0.1 }],
      },
    },
  },
}
```

### GitHub Actions

```yaml
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
      - uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: ./lighthouserc.json
          uploadArtifacts: true
```

### CLI (Local)

```bash
npx lighthouse http://localhost:3000 --output=json --output=html --output-path=./lighthouse-report
npx lighthouse http://localhost:3000 --only-categories=performance
```

## React DevTools Profiler

1. Open React DevTools > Profiler tab
2. Click "Start profiling", interact with the page, click "Stop"
3. Flame chart shows each component render and duration

**What to look for:**

- Components re-rendering when props/state haven't changed
- Render times >16ms (blocks a frame at 60fps)
- Deep components causing cascading re-renders

Enable "Highlight updates when components render" in settings to visualize re-renders as flashing borders.

## Chrome DevTools Performance Tab

1. Open DevTools > Performance tab
2. Record, perform the interaction, stop
3. Analyze the timeline

**Key indicators:**

- **Long tasks**: Red triangles = tasks >50ms blocking main thread (hurts INP)
- **Layout shifts**: Blue markers in Experience lane (CLS events)
- **Network waterfall**: Sequential requests that could be parallelized

| Symptom           | Look For                 | Fix                           |
| ----------------- | ------------------------ | ----------------------------- |
| Slow initial load | Large JS in network      | Code split with next/dynamic  |
| Scroll jank       | Long tasks during scroll | Debounce, virtualize lists    |
| Slow click        | Long task after click    | startTransition, Web Worker   |
| Layout jumping    | Layout Shift markers     | Reserve space, set dimensions |

## Next.js Bundle Analyzer

```bash
pnpm add -D @next/bundle-analyzer
```

```typescript
// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env['ANALYZE'] === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

```bash
ANALYZE=true pnpm turbo run build --filter=web
```

Opens a treemap — each rectangle = a module, size = bytes. Common fixes:

- Large rectangle → dynamic import or lighter alternative
- Duplicate library → deduplicate with pnpm overrides
- Unused modules → remove import or use named imports

## Core Web Vitals Field Measurement

```typescript
import { onCLS, onINP, onLCP } from 'web-vitals'

onLCP(console.log)
onCLS(console.log)
onINP(console.log)
```

| Source                | Type  | Best For                       |
| --------------------- | ----- | ------------------------------ |
| Lighthouse            | Lab   | Pre-deploy CI checks           |
| Chrome DevTools       | Lab   | Local debugging                |
| web-vitals library    | Field | Real user measurement          |
| Google Search Console | Field | Aggregate CWV from real users  |
| Lighthouse CI         | Lab   | Automated regression detection |
