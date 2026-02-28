---
name: nextauth
description: NextAuth.js authentication patterns. Use when debugging 401/403 errors, session issues, permission denied, CSRF errors, or implementing auth features.
globs: ['**/auth/**/*', '**/*auth*.{ts,tsx,js}', '**/middleware.*', '**/*session*.{ts,tsx,js}', '**/*permission*.{ts,tsx,js}']
---

# NextAuth.js Authentication Patterns

Patterns for NextAuth.js covering public applications (multi-provider, JWT) and internal tools (SSO, group-based permissions).

## Architecture Overview

| Aspect          | Public App (Pages Router)           | Internal Tool (App Router)          |
| --------------- | ----------------------------------- | ----------------------------------- |
| Target users    | End customers                       | Internal staff / admins             |
| Providers       | Credentials + Google + Facebook     | Okta SSO (single provider)          |
| Session         | JWT strategy                        | JWT with group claims               |
| Permissions     | Tier-based (free/premium)           | Group-based (roles + permissions)   |
| Route protection| `getServerSideProps` redirect       | `middleware.ts` (next-auth/middleware)|
| Config location | `pages/api/auth/[...nextauth].ts`   | `app/api/auth/[...nextauth]/config.ts` |

## Quick Patterns

### Session Usage (Client)

```typescript
const { data: session, status } = useSession()
// status: 'loading' | 'authenticated' | 'unauthenticated'
```

### Session Usage (Server -- App Router)

```typescript
const session = await getServerSession(authOptions)
```

### Permission Check (Hook)

```typescript
const isAuthorized = useIsAuthorized([permissions.MANAGE_PRODUCTS])
```

## Debugging Quick Reference

| Symptom                    | Likely Cause                       | Fix                                      |
| -------------------------- | ---------------------------------- | ---------------------------------------- |
| CSRF token mismatch        | `NEXTAUTH_URL` wrong               | Set to actual dev server URL             |
| Session is `null`          | Missing `SessionProvider`          | Wrap app in `<SessionProvider>`          |
| Okta groups empty          | Missing `groups` scope             | Add `scope: 'openid profile email groups'` |
| 403 on protected routes    | Permission check failing           | Check user groups and permission mapping |
| Token refresh failing      | Expired refresh token              | User needs to re-login                   |

## Session Inspection

```typescript
// Client-side
const { data: session } = useSession()
console.log('Session:', session)

// Server-side (App Router)
const session = await getServerSession(authOptions)

// Browser console
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```

## Key Files

- `pages/api/auth/[...nextauth].ts` -- Pages Router config
- `app/api/auth/[...nextauth]/config.ts` + `route.ts` -- App Router config
- `middleware.ts` -- Route protection
- `constants/auth.ts` -- Permissions and groups
- `hooks/useIsAuthorized.ts` -- Client-side permission check
- `helpers/auth/server.ts` -- Server-side permission wrapper

## Reference

- [Auth Patterns](references/auth-patterns.md) -- providers, JWT callbacks, permissions, middleware, testing
