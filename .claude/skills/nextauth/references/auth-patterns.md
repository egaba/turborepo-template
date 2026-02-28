# Authentication Patterns

Detailed NextAuth.js patterns for public applications (multi-provider JWT) and internal tools (SSO with group-based permissions).

## Key Files Reference

### Pages Router

- `pages/api/auth/[...nextauth].ts` -- NextAuth config with providers, callbacks
- `helpers/auth/` -- Provider implementations, token helpers
- No `middleware.ts` -- route protection via `getServerSideProps`

### App Router

- `app/api/auth/[...nextauth]/config.ts` -- AuthOptions export
- `app/api/auth/[...nextauth]/route.ts` -- Route handler (`export { handler as GET, handler as POST }`)
- `middleware.ts` -- Route protection via `next-auth/middleware`
- `constants/auth.ts` -- Permissions, groups, mapping
- `hooks/useIsAuthorized.ts` -- Client-side permission hook
- `helpers/auth/server.ts` -- `withPermission` API wrapper

## Architecture Overview

**Public App**: Multiple OAuth providers (Google, Facebook) + credentials login. JWT strategy with access/refresh tokens. Session contains user profile, tier info, preferences.

**Internal Tool**: Single SSO provider (e.g., Okta). JWT strategy with group claims from the identity provider. Permission system maps groups to granular permissions.

## Public App Auth

### NextAuth Config (JWT Strategy)

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const authToken = await authenticateUser({
          username: credentials?.username,
          password: credentials?.password,
        })
        if (authToken.error) throw new Error(authToken.error)
        return { authToken, loginType: 'credentials' }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: 'openid email profile' } },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account }) { /* see below */ },
    async session({ session, token }) { /* see below */ },
  },
}

export default NextAuth(authOptions)
```

### JWT Callback (Initial Sign-In + Token Refresh)

```typescript
callbacks: {
  async jwt({ token, user, account, trigger, session }) {
    const isInitialSignIn = !!(account && user)

    if (isInitialSignIn) {
      // Map provider-specific data to a standard token shape
      token.accessToken = user.authToken.accessToken
      token.refreshToken = user.authToken.refreshToken
      token.userId = user.authToken.userId
      token.email = user.authToken.email
      token.provider = account.provider
      token.expiresAt = Date.now() + 3600 * 1000 // 1 hour
    }

    // Handle session update trigger (e.g., after account creation flow)
    if (trigger === 'update' && session) {
      token = { ...token, ...session }
    }

    // Refresh expired tokens
    if (token.expiresAt && Date.now() > token.expiresAt && token.refreshToken) {
      try {
        const refreshed = await refreshAccessToken(token.refreshToken)
        token.accessToken = refreshed.accessToken
        token.expiresAt = Date.now() + 3600 * 1000
      } catch {
        token.error = 'RefreshTokenError'
      }
    }

    return token
  },
}
```

### Session Callback

```typescript
callbacks: {
  async session({ session, token }) {
    session.userId = token.userId
    session.email = token.email
    session.provider = token.provider
    session.accessToken = token.accessToken
    session.error = token.error
    return session
  },
}
```

## Internal Tools Auth

### Okta SSO Config (App Router)

```typescript
// app/api/auth/[...nextauth]/config.ts
import { AuthOptions } from 'next-auth'
import OktaProvider from 'next-auth/providers/okta'

export const authOptions: AuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID!,
      clientSecret: process.env.OKTA_CLIENT_SECRET!,
      issuer: process.env.OKTA_ISSUER,
      authorization: {
        params: {
          scope: 'openid profile email groups',
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          groups: profile.groups || [],
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.groups = user.groups
      }
      return token
    },
    async session({ session, token }) {
      session.user.groups = token.groups as string[]
      return session
    },
  },
}
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from './config'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### Group-Based Permission System

#### Constants

```typescript
// constants/auth.ts
export const permissions = {
  MANAGE_PRODUCTS: 'manage-products',
  MANAGE_CATEGORIES: 'manage-categories',
  PUBLISH_CONTENT: 'publish-content',
  ADMIN_ACCESS: 'admin-access',
} as const

export type Permission = (typeof permissions)[keyof typeof permissions]

export const groups = {
  READ_ONLY: 'app-read_only',
  EDITOR: 'app-editor',
  ADMIN: 'app-admin',
} as const

export type Group = (typeof groups)[keyof typeof groups]

export const groupPermissionMapping: Record<Group, Permission[]> = {
  [groups.READ_ONLY]: [],
  [groups.EDITOR]: [
    permissions.MANAGE_PRODUCTS,
    permissions.MANAGE_CATEGORIES,
  ],
  [groups.ADMIN]: [
    permissions.MANAGE_PRODUCTS,
    permissions.MANAGE_CATEGORIES,
    permissions.PUBLISH_CONTENT,
    permissions.ADMIN_ACCESS,
  ],
}
```

#### permissionsFromGroups Helper

```typescript
// helpers/auth/client.ts
export const permissionsFromGroups = (userGroups: Group[]): Permission[] => {
  const permissionSet = new Set<Permission>()

  userGroups.forEach((group) => {
    const perms = groupPermissionMapping[group]
    if (perms) {
      perms.forEach((p) => permissionSet.add(p))
    }
  })

  return Array.from(permissionSet)
}
```

#### useIsAuthorized Hook

```typescript
// hooks/useIsAuthorized.ts
import { useSession } from 'next-auth/react'
import { permissionsFromGroups } from 'helpers/auth/client'
import type { Permission, Group } from 'constants/auth'

export const useIsAuthorized = (requiredPermissions: Permission[]) => {
  const { data: session } = useSession()

  if (!requiredPermissions?.length) return true

  const assignedGroups: Group[] = session?.user?.groups || []
  const userPermissions = permissionsFromGroups(assignedGroups)

  return requiredPermissions.some((p) => userPermissions.includes(p))
}
```

#### withPermission API Route Wrapper

```typescript
// helpers/auth/server.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { StatusCodes } from 'http-status-codes'
import { authOptions } from 'app/api/auth/[...nextauth]/config'
import { permissionsFromGroups } from 'helpers/auth/client'
import type { Permission } from 'constants/auth'

type RouteHandler = (req: NextRequest, context?: any) => Promise<NextResponse>

export function withPermission(handler: RouteHandler, requiredPermission: Permission): RouteHandler {
  return async (req, context) => {
    const session = await getServerSession(authOptions)
    const userGroups = session?.user?.groups || []
    const userPermissions = permissionsFromGroups(userGroups)

    if (userPermissions.includes(requiredPermission)) {
      return handler(req, context)
    }

    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: StatusCodes.FORBIDDEN },
    )
  }
}
```

#### ProtectedComponent for Conditional Rendering

```typescript
// components/auth/protected-component.tsx
'use client'

import { useIsAuthorized } from 'hooks/useIsAuthorized'
import type { Permission } from 'constants/auth'

type Props = {
  permissions: Permission[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedComponent({ permissions, children, fallback = null }: Props) {
  const isAuthorized = useIsAuthorized(permissions)
  return isAuthorized ? <>{children}</> : <>{fallback}</>
}

// Usage
<ProtectedComponent permissions={[permissions.MANAGE_PRODUCTS]}>
  <DeleteButton />
</ProtectedComponent>
```

## Middleware for Route Protection

```typescript
// middleware.ts
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!api/status|_next/image|_next/static|images|favicon.ico).*)'],
}
```

Requires a valid session for all routes except health checks and static assets. Does NOT check permissions.

## Environment Variables Checklist

```bash
# Required for all apps
NEXTAUTH_SECRET=           # Session encryption key
NEXTAUTH_URL=              # Canonical URL (e.g., http://localhost:3000)

# Public app -- OAuth providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Internal tools -- SSO
OKTA_CLIENT_ID=
OKTA_CLIENT_SECRET=
OKTA_ISSUER=               # e.g., https://company.okta.com/oauth2/default

# Development/testing
NEXT_PUBLIC_MOCK_API_ENABLED=false
MOCK_SSO_GROUP=            # Override user group when mock enabled
```

## Debugging

| Issue                    | Cause                              | Solution                                    |
| ------------------------ | ---------------------------------- | ------------------------------------------- |
| CSRF token mismatch      | `NEXTAUTH_URL` wrong              | Match the actual dev server URL             |
| Session is `null`         | Missing `SessionProvider`         | Wrap app root in `<SessionProvider>`        |
| SSO groups empty          | Missing `groups` scope            | Add `scope: 'openid profile email groups'`  |
| 403 on protected routes   | Permission mapping wrong          | Check `groupPermissionMapping` + user groups|
| Token refresh fails       | Expired refresh token             | User must re-authenticate                   |
| Callback URL mismatch     | Provider config stale             | Update authorized redirect URIs in provider |

## Testing

### Mock Session in Tests

```typescript
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: { name: 'Test User', email: 'test@example.com', groups: ['app-admin'] },
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))
```

### Mock Groups for Development

```bash
# .env.local
NEXT_PUBLIC_MOCK_API_ENABLED=true
MOCK_SSO_GROUP=app-admin
```

In the NextAuth config, override groups when mock mode is enabled:

```typescript
async session({ session, token }) {
  if (process.env.NEXT_PUBLIC_MOCK_API_ENABLED === 'true') {
    session.user.groups = process.env.MOCK_SSO_GROUP
      ? [process.env.MOCK_SSO_GROUP]
      : token.groups
  } else {
    session.user.groups = token.groups
  }
  return session
}
```

### Session Inspection

```typescript
// Client-side
const { data: session, status } = useSession()
console.log('Session:', JSON.stringify(session, null, 2))
console.log('Status:', status)

// Server-side
const session = await getServerSession(authOptions)
console.log('Server session:', session)

// Browser console
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```
