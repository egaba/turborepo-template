# Optimization Recipes

Targeted fixes organized by Core Web Vital metric.

## LCP Optimization

### Hero Images

```tsx
import Image from 'next/image'
import heroImg from '@/public/hero.jpg'

<Image src={heroImg} alt="Hero" priority sizes="100vw" />
```

- Add `priority` to the LCP image (largest above-fold image)
- Set `sizes` to match rendered width (e.g., `(max-width: 768px) 100vw, 50vw`)

### Fonts

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

// In layout.tsx: <body className={inter.variable}>
```

`next/font` self-hosts, generates `size-adjust` for fallback matching, eliminates render-blocking requests.

### Streaming

```tsx
// Route-level: loading.tsx provides instant shell
// Component-level: Suspense for granular streaming
<Suspense fallback={<MetricsSkeleton />}>
  <LiveMetrics />
</Suspense>
```

### Data Fetching Deduplication

```tsx
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
})
```

## CLS Optimization

### Images — Always Reserve Space

```tsx
// Explicit dimensions
<Image src="/photo.jpg" alt="" width={800} height={600} />

// Fill mode with sized container
<div className="relative aspect-video">
  <Image src="/photo.jpg" alt="" fill className="object-cover" />
</div>
```

### Skeleton Loaders

Match exact dimensions of loaded content:

```tsx
export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-64 w-full" />
      <div className="skeleton h-4 w-full" />
    </div>
  )
}
```

### Dynamic Content — Reserve Space

```tsx
<div className="min-h-[300px]">
  <Suspense fallback={<AdSkeleton />}>
    <DynamicContent />
  </Suspense>
</div>
```

## INP Optimization

### Code Splitting

```tsx
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  loading: () => <EditorSkeleton />,
  ssr: false,
})
```

Split components that are large AND not needed at initial render (below-fold, tabs, modals).

### Non-Urgent State Updates

```tsx
import { startTransition } from 'react'

function handleSearch(value: string) {
  setQuery(value)                                      // urgent
  startTransition(() => setResults(search(value)))     // non-urgent
}
```

### Deferred Values

```tsx
import { useDeferredValue } from 'react'

function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query)
  return <Results query={deferredQuery} />
}
```

## Bundle Size

```tsx
import { format } from 'date-fns'      // Good: named import, tree-shakeable
import debounce from 'lodash/debounce'  // Good: deep import path
import _ from 'lodash'                  // Bad: pulls entire library
```

Barrel files (`index.ts` re-exporting everything) can defeat tree-shaking. If a barrel re-exports a client component, importing anything from it may pull the entire module.

Analyze with `ANALYZE=true pnpm turbo run build --filter=web`. Look for: duplicate packages, large modules (>50KB), dependencies that could be lazily loaded.
