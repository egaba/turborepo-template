# Security Hardening

## Core Principle — Defense in Depth

Single validation: "We fixed the bug." Multiple layers: "We made the bug impossible."

Validate at every layer data passes through:

1. **Entry point** — Reject invalid input at API boundary (Zod schemas)
2. **Business logic** — Ensure data makes sense (authorization, ownership checks)
3. **Environment guards** — Prevent dangerous operations in wrong context (rate limits, test safety)
4. **Debug instrumentation** — Capture context for forensics (structured logging)

## CSP Nonce Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `frame-ancestors 'none'`,
  ].join('; ')

  const res = NextResponse.next()
  res.headers.set('Content-Security-Policy', csp)
  res.headers.set('x-nonce', nonce)
  return res
}
```

## Security Headers Checklist

- [ ] `Content-Security-Policy` configured (restrict resource loading)
- [ ] `Strict-Transport-Security` with appropriate max-age
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY` or `SAMEORIGIN`
- [ ] `Referrer-Policy` configured
- [ ] `Permissions-Policy` set (disable unused browser APIs)
- [ ] `Server` / `X-Powered-By` headers removed

## Input Validation

Always validate at API boundaries with Zod. See the **data skill** for detailed Zod schema patterns and form validation.

```typescript
const parsed = schema.safeParse(body)
if (!parsed.success) {
  return NextResponse.json(
    { error: 'Validation failed', details: parsed.error.flatten() },
    { status: StatusCodes.BAD_REQUEST },
  )
}
```

Rules: whitelist validation, type/length/format checks, parameterized queries (never string interpolation), ReDoS-safe regex, safe JSON parsing (never `eval`).

## Environment Variable Validation

```typescript
// lib/env.ts — validate at startup
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

Server-only: `process.env.DATABASE_URL`, `process.env.AUTH_SECRET`
Client-safe: `process.env.NEXT_PUBLIC_*` (prefix required)

Never import server-only env vars in files with `'use client'`.

## Auth Security Checklist

- [ ] Strong auth mechanism (OAuth 2.0, JWT, OIDC)
- [ ] MFA/2FA for sensitive operations
- [ ] Account lockout after failed attempts
- [ ] API keys never in code or version control
- [ ] Session tokens cryptographically generated
- [ ] Logout invalidates session/token

## API Security Checklist

- [ ] HTTPS/TLS enforced for all endpoints
- [ ] Rate limiting implemented
- [ ] Auth required on all non-public endpoints
- [ ] Input validation on all parameters
- [ ] CORS headers properly configured
- [ ] Pagination limits prevent enumeration
- [ ] Proper HTTP status codes (401 vs 403)
- [ ] Error messages never expose internals

## Session Security Checklist

- [ ] Cookies: `HttpOnly`, `Secure`, `SameSite` flags set
- [ ] Session timeout (idle + absolute)
- [ ] Session invalidation on logout
- [ ] Session fixation protection (regenerate on login)
- [ ] CSRF tokens for state-changing operations

## Verify Headers

```bash
curl -I https://your-site.com | grep -iE "(content-security|strict-transport|x-content|x-frame|referrer|permissions)"
```
