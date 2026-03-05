# Observability Checklist

Starting template for production error monitoring, performance tracking, and structured logging in a Next.js application. Tool-agnostic — applies to Datadog, Sentry, New Relic, or similar platforms.

## Instrumentation Layers

| Layer              | What to Capture                                                  | Next.js Hook Point                             |
| ------------------ | ---------------------------------------------------------------- | ---------------------------------------------- |
| **Error tracking** | Unhandled exceptions, rejected promises, component render errors | `instrumentation.ts`, error boundaries         |
| **Performance**    | Core Web Vitals (LCP, CLS, INP), TTFB, route transition timing   | `reportWebVitals`, RUM SDK                     |
| **API monitoring** | Response times, error rates, status code distribution            | Route handler middleware, `instrumentation.ts` |
| **Logging**        | Structured server-side logs with request context                 | `instrumentation.ts`, Server Actions           |
| **Alerting**       | Error rate spikes, latency degradation, deployment regressions   | Platform-configured                            |

## Next.js Instrumentation Entry Point

Next.js supports a dedicated `instrumentation.ts` file at the project root for initializing observability SDKs on server startup:

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize server-side SDK (Datadog, Sentry, etc.)
    // This runs once when the server starts
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime initialization (if needed)
  }
}
```

`instrumentation.ts` is stable in Next.js 15+. For Next.js 13-14, enable it explicitly:

```typescript
// next.config.ts (Next.js 13-14 only — not needed in 15+)
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
}
```

## Error Tracking Setup

### Server-Side Errors

Capture unhandled errors in route handlers and Server Actions:

```typescript
// lib/observability.ts
export function captureException(error: unknown, context?: Record<string, unknown>) {
  // Replace with your SDK's capture method
  // e.g., Sentry.captureException(error, { extra: context })
  // e.g., datadogLogs.logger.error('Unhandled error', { error, ...context })
  console.error('[observability]', error, context)
}
```

Integrate with the existing `withErrorHandling` wrapper from the data skill's API route patterns:

```typescript
// In route handlers — errors are caught, logged, and returned as structured responses
export const GET = withErrorHandling(async (request) => {
  // ... handler logic
})
```

### Client-Side Errors

```tsx
// app/global-error.tsx
'use client'

import { captureException } from '@/lib/observability'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  useEffect(() => {
    captureException(error, { source: 'global-error-boundary' })
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <button className="btn btn-primary mt-4" onClick={reset}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
```

### Route-Level Error Boundaries

Each `error.tsx` should report to the observability layer:

```tsx
// app/{route}/error.tsx
'use client'

import { captureException } from '@/lib/observability'
import { useEffect } from 'react'

export default function Error({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  useEffect(() => {
    captureException(error, { source: 'route-error-boundary', route: '/route-name' })
  }, [error])

  return (/* error UI */)
}
```

## Performance Monitoring

### Web Vitals Reporting

```typescript
// app/layout.tsx or a dedicated client component
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to your analytics/observability platform
    // e.g., datadogRum.addTiming(metric.name, metric.value)
    // e.g., sendBeacon('/api/vitals', JSON.stringify(metric))
    const body = {
      name: metric.name, // CLS, FID, LCP, TTFB, INP
      value: metric.value,
      rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      id: metric.id,
    }
    console.debug('[web-vitals]', body)
  })

  return null
}
```

### Thresholds to Alert On

| Metric | Good    | Needs Improvement | Poor    |
| ------ | ------- | ----------------- | ------- |
| LCP    | < 2.5s  | 2.5s – 4.0s       | > 4.0s  |
| CLS    | < 0.1   | 0.1 – 0.25        | > 0.25  |
| INP    | < 200ms | 200ms – 500ms     | > 500ms |
| TTFB   | < 800ms | 800ms – 1.8s      | > 1.8s  |

## Structured Logging

### Server-Side Log Format

Use structured JSON logs for machine-parseable output:

```typescript
// lib/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export function log(level: LogLevel, message: string, context?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  }

  if (level === 'error') {
    console.error(JSON.stringify(entry))
  } else {
    console.log(JSON.stringify(entry))
  }
}
```

### What to Log

| Event                  | Level   | Context to Include                        |
| ---------------------- | ------- | ----------------------------------------- |
| API request received   | `info`  | method, path, userId (if authed)          |
| API response sent      | `info`  | method, path, statusCode, durationMs      |
| Auth failure           | `warn`  | path, reason, IP (if available)           |
| Unhandled exception    | `error` | stack, requestId, userId, route           |
| External service call  | `info`  | service, endpoint, durationMs, statusCode |
| External service error | `error` | service, endpoint, error, retryCount      |

### What NOT to Log

- PII (emails, names, addresses) — mask or omit
- Auth tokens, session IDs, API keys
- Full request/response bodies in production (use debug level only)

## Readiness Checklist

### Before First Deploy

- [ ] `instrumentation.ts` initializes observability SDK
- [ ] `global-error.tsx` reports to error tracking
- [ ] Route-level `error.tsx` files report to error tracking
- [ ] Web Vitals reported to monitoring platform
- [ ] Structured logging in place for API routes and Server Actions
- [ ] Source maps uploaded to error tracking service (for readable stack traces)
- [ ] Environment variables for SDK keys set in deployment target

### Before GA / Public Launch

- [ ] Alerting rules configured (error rate spike, latency degradation)
- [ ] Dashboard created for key metrics (error rate, p50/p95 latency, Web Vitals)
- [ ] On-call rotation or notification channel established
- [ ] Runbook for common alert scenarios documented
- [ ] RUM (Real User Monitoring) enabled for client-side performance
- [ ] Synthetic monitoring for critical user flows (login, checkout, etc.)

### Ongoing

- [ ] Review error trends weekly — new errors should be triaged, not ignored
- [ ] Performance budget: alert if CWV regress past thresholds after deploy
- [ ] Log retention policy configured (cost vs. debuggability trade-off)
