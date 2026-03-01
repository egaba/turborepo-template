# Middleware & Environment Variables

Route protection middleware and environment variable management for NextAuth.js.

## Middleware for Route Protection

Require a valid session for all routes except static assets and health checks.

```typescript
// middleware.ts
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!api/status|_next/image|_next/static|images|favicon.ico).*)'],
}
```

This checks for a valid session only -- it does NOT check roles or permissions. Use `withPermission` (see permissions reference) for authorization.

## Custom Middleware (Auth + Security Headers)

Combine route protection with security headers in a single middleware.

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const publicPaths = ['/login', '/register', '/api/auth', '/api/status']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip auth check for public paths
  const isPublic = publicPaths.some((p) => pathname.startsWith(p))

  if (!isPublic) {
    const token = await getToken({ req })
    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  const res = NextResponse.next()

  // Security headers
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

## Environment Variables Checklist

```bash
# Required for all NextAuth apps
NEXTAUTH_SECRET=           # Session encryption key (generate: openssl rand -base64 32)
NEXTAUTH_URL=              # Canonical URL (e.g., http://localhost:3000)

# OAuth providers (add as needed)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Application
DATABASE_URL=              # If using database adapter
NEXT_PUBLIC_API_URL=       # Public API base URL
```

## Environment Variable Rules

| Rule | Example |
| ---- | ------- |
| Server secrets stay server-side | `AUTH_SECRET`, `DATABASE_URL` |
| Client-safe values use `NEXT_PUBLIC_` prefix | `NEXT_PUBLIC_API_URL` |
| Never import server env in `'use client'` files | Use API routes or Server Components instead |
| Validate at startup with Zod | See security-hardening reference |

## Adding a New OAuth Provider

1. Install: `pnpm add next-auth` (providers are built-in)
2. Create OAuth app in provider's developer console
3. Add `CLIENT_ID` and `CLIENT_SECRET` to `.env.local`
4. Add provider to `authOptions.providers` array
5. Add authorized redirect URI in provider console: `{NEXTAUTH_URL}/api/auth/callback/{provider}`
6. Test sign-in flow end-to-end
