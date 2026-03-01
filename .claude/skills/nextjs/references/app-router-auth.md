# App Router Authentication

Middleware for route protection, server/client session access, and permission-protected routes.

## Middleware for Route Protection

```typescript
// middleware.ts
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!api/status|_next/image|_next/static|images|favicon.ico).*)'],
}
```

This requires a valid session for all routes except health checks and static assets. It does NOT check permissions -- only that the user is authenticated.

## Authentication

### Server-Side Session Access

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/config'

// In a Server Component or Route Handler
const session = await getServerSession(authOptions)
const userGroups = session?.user.groups || []
```

### Client-Side Session Access

```typescript
'use client'

import { useSession } from 'next-auth/react'

export default function ProfileBadge() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <Skeleton />
  if (status === 'unauthenticated') return <LoginButton />

  return <span>{session?.user?.name}</span>
}
```

### Permission-Protected API Route

```typescript
import { withPermission } from 'helpers/auth/server'
import { permissions } from 'constants/auth'

export const POST = withPermission(async (req: NextRequest) => {
  const body = await req.json()
  // ... handler logic
  return NextResponse.json({ success: true })
}, permissions.MANAGE_PRODUCTS)
```
