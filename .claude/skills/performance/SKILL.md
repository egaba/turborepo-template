---
name: performance
description: 'Web performance optimization — Core Web Vitals, bundle analysis, rendering performance, Lighthouse CI. Use when pages are slow, optimizing load times, or measuring performance.'
globs:
  [
    '**/next.config.*',
    '**/loading.tsx',
    '**/layout.tsx',
  ]
---

# Performance Optimization

Measure, identify bottlenecks, apply targeted fixes, and re-measure. Never optimize without measurement.

## Investigation Workflow

1. **Measure** — Run Lighthouse or check CWV in Chrome DevTools
2. **Identify bottleneck** — Which metric is failing? LCP, CLS, INP, or bundle size?
3. **Apply targeted fix** — Use the recipes in [optimization-recipes.md](references/optimization-recipes.md)
4. **Re-measure** — Verify the fix improved the metric. No claims without fresh evidence.

## Core Web Vitals Quick Reference

| Metric  | Good    | Poor    | Measures                                   |
| ------- | ------- | ------- | ------------------------------------------ |
| **LCP** | < 2.5s  | > 4.0s  | Largest Contentful Paint — main content visible |
| **CLS** | < 0.1   | > 0.25  | Cumulative Layout Shift — visual stability |
| **INP** | < 200ms | > 500ms | Interaction to Next Paint — responsiveness |

## Bundle Analysis

```bash
# Requires @next/bundle-analyzer configured in next.config.ts
ANALYZE=true pnpm turbo run build --filter=web
```

Reading the treemap: large rectangles = large modules. Look for duplicate dependencies, unused imports, and libraries that could be dynamically imported.

## Server vs Client Component Performance

Server Components ship zero JS to the browser. Use `"use client"` only when interactivity is required (event handlers, hooks, browser APIs). Every `"use client"` boundary adds to the client bundle.

## React Query Caching

| Option      | What It Controls                              | Default |
| ----------- | --------------------------------------------- | ------- |
| `staleTime` | How long data is considered fresh (no refetch) | 0       |
| `gcTime`    | How long inactive cache stays in memory        | 5 min   |

Set `staleTime` generously for data that rarely changes. Set short for real-time data.

## Memoization: Only When Measured

Use `React.memo`, `useMemo`, `useCallback` ONLY with measured justification:
- Profile first with React DevTools Profiler
- Confirm unnecessary re-renders cause visible jank
- Memoization has its own cost — wrong usage makes things slower

## Image Optimization

- Always use `next/image` with correct `sizes` attribute
- Add `priority` for LCP/above-fold images (skips lazy loading)
- Static imports get automatic blur placeholder
- Use `fill` with a sized container for responsive images

## Font Optimization

Use `next/font` (Google or local) with `display: 'swap'`. Eliminates FOIT, FOUT, and layout shift. Configure as CSS variable for use in Tailwind.

## Code Splitting

- `next/dynamic` for heavy components: `dynamic(() => import('./Heavy'), { ssr: false })`
- Route-level splitting is automatic in App Router
- Set `ssr: false` for client-only components (charts, maps)

## Streaming

- `loading.tsx` — route-level instant shell while data loads
- `<Suspense>` — component-level granular streaming
- Nest Suspense boundaries so faster data renders first

## References

- [optimization-recipes.md](references/optimization-recipes.md) — Targeted fix recipes organized by CWV metric
- [profiling-tools.md](references/profiling-tools.md) — Lighthouse CI, React DevTools Profiler, bundle analyzer setup
