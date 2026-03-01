---
name: auth
description: "Authentication, authorization, and security hardening (NextAuth.js). Use when debugging 401/403 errors, session issues, permission denied, CSRF errors, CSP violations, or implementing auth/security."
globs: ['**/auth/**/*', '**/*auth*.{ts,tsx,js}', '**/middleware.*', '**/*session*.{ts,tsx,js}', '**/*permission*.{ts,tsx,js}', '.env*', 'next.config.*']
---

# Authentication, Authorization & Security

NextAuth.js patterns for JWT-based auth, role-based permissions, route protection, and security hardening.

## Quick Patterns

### Session Usage (Client)

```typescript
const { data: session, status } = useSession()
// status: 'loading' | 'authenticated' | 'unauthenticated'
```

### Session Usage (Server)

```typescript
const session = await getServerSession(authOptions)
```

### Permission Check (Hook)

```typescript
const isAuthorized = useIsAuthorized([permissions.MANAGE_PRODUCTS])
```

### Route Protection (Middleware)

```typescript
export { default } from 'next-auth/middleware'
export const config = {
  matcher: ['/((?!api/status|_next/static|_next/image|favicon.ico).*)'],
}
```

## Debugging Quick Reference

| Symptom                  | Likely Cause                 | Fix                                    |
| ------------------------ | ---------------------------- | -------------------------------------- |
| CSRF token mismatch      | `NEXTAUTH_URL` wrong         | Set to actual dev server URL           |
| Session is `null`        | Missing `SessionProvider`    | Wrap app root in `<SessionProvider>`   |
| 403 on protected routes  | Permission mapping wrong     | Check role-permission mapping + session |
| Token refresh fails      | Expired refresh token        | User must re-authenticate              |
| Callback URL mismatch    | Provider config stale        | Update redirect URIs in provider       |

## Security Quick Reference

- **CSP**: Generate nonce per request in middleware, set `Content-Security-Policy` header
- **Headers**: `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- **Env vars**: Server secrets stay server-side; only `NEXT_PUBLIC_*` for client code
- **CSRF**: NextAuth handles CSRF tokens automatically; ensure `NEXTAUTH_URL` is correct
- **Input validation**: Zod schemas at every API boundary (see data skill)
- **Session cookies**: `HttpOnly`, `Secure`, `SameSite` flags set by NextAuth

## Key Files

- `app/api/auth/[...nextauth]/config.ts` + `route.ts` -- NextAuth config and route handler
- `middleware.ts` -- Route protection + security headers
- `constants/auth.ts` -- Roles and permissions
- `hooks/useIsAuthorized.ts` -- Client-side permission check
- `helpers/auth/server.ts` -- Server-side permission wrapper
- `lib/env.ts` -- Environment variable validation

## Session Inspection

```typescript
// Client-side
const { data: session } = useSession()
console.log('Session:', session)

// Server-side
const session = await getServerSession(authOptions)

// Browser console
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```

## References

- [NextAuth Config](references/nextauth-config.md) -- JWT strategy, providers, callbacks
- [Middleware & Env Vars](references/nextauth-providers.md) -- Route protection, environment checklist
- [Role-Based Permissions](references/permissions-groups.md) -- Roles, hooks, API wrappers, ProtectedComponent
- [Auth Debugging](references/auth-debugging.md) -- Debugging table, mock sessions, testing patterns
- [Security Hardening](references/security-hardening.md) -- CSP, headers, input validation, checklists
