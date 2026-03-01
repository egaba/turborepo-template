# App Router Advanced Patterns

PPR, streaming with nested Suspense, and bundle analysis.

## Partial Prerendering (PPR)

PPR combines static shell rendering with dynamic content streamed via Suspense boundaries. The static parts are served instantly from the edge; dynamic parts stream in as they resolve.

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    ppr: true,
  },
}
```

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      {/* Static shell -- prerendered at build time */}
      <h1>Dashboard</h1>
      <nav>{/* static navigation */}</nav>

      {/* Dynamic content -- streamed via Suspense */}
      <Suspense fallback={<MetricsSkeleton />}>
        <LiveMetrics />
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}
```

## Streaming with Nested Suspense

Use nested `<Suspense>` boundaries to progressively reveal page sections as data resolves:

```tsx
export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<ProductHeaderSkeleton />}>
        <ProductHeader id={params.id} />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Suspense fallback={<ReviewsSkeleton />}>
          <ProductReviews id={params.id} />
        </Suspense>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <RelatedProducts id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
```

Each Suspense boundary streams independently -- faster data sources render first without waiting for slower ones.

## Bundle Analysis

Use `@next/bundle-analyzer` to identify large dependencies and code-splitting opportunities:

```bash
pnpm add -D @next/bundle-analyzer
```

```typescript
// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

```bash
ANALYZE=true pnpm turbo run build --filter=web
```

Use `next/dynamic` to code-split heavy components identified by the analyzer:

```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})
```
