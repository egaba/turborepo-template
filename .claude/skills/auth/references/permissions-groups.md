# Role-Based Permissions

Role-based permission system: constants, helpers, hooks, and API wrappers. Works with any auth source (OAuth, credentials, database).

## Constants

```typescript
// constants/auth.ts
export const permissions = {
  MANAGE_PRODUCTS: 'manage-products',
  MANAGE_CATEGORIES: 'manage-categories',
  PUBLISH_CONTENT: 'publish-content',
  ADMIN_ACCESS: 'admin-access',
} as const

export type Permission = (typeof permissions)[keyof typeof permissions]

export const roles = {
  VIEWER: 'viewer',
  EDITOR: 'editor',
  ADMIN: 'admin',
} as const

export type Role = (typeof roles)[keyof typeof roles]

export const rolePermissionMap = {
  [roles.VIEWER]: [],
  [roles.EDITOR]: [permissions.MANAGE_PRODUCTS, permissions.MANAGE_CATEGORIES],
  [roles.ADMIN]: [
    permissions.MANAGE_PRODUCTS,
    permissions.MANAGE_CATEGORIES,
    permissions.PUBLISH_CONTENT,
    permissions.ADMIN_ACCESS,
  ],
} as const satisfies Record<Role, readonly Permission[]>
```

## permissionsFromRole Helper

```typescript
// helpers/auth/client.ts
import type { Permission, Role } from '@/constants/auth'
import { rolePermissionMap } from '@/constants/auth'

export const permissionsFromRole = (role: Role): Permission[] => {
  return [...(rolePermissionMap[role] ?? [])]
}
```

## useIsAuthorized Hook

```typescript
// hooks/useIsAuthorized.ts
import { useSession } from 'next-auth/react'
import { permissionsFromRole } from '@/helpers/auth/client'
import type { Permission, Role } from '@/constants/auth'

export const useIsAuthorized = (requiredPermissions: Permission[]) => {
  const { data: session } = useSession()

  if (!requiredPermissions?.length) return true

  const userRole = (session?.role ?? 'viewer') as Role
  const userPermissions = permissionsFromRole(userRole)

  return requiredPermissions.some((p) => userPermissions.includes(p))
}
```

## withPermission API Route Wrapper

```typescript
// helpers/auth/server.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { StatusCodes } from 'http-status-codes'
import { authOptions } from '@/app/api/auth/[...nextauth]/config'
import { permissionsFromRole } from '@/helpers/auth/client'
import type { Permission, Role } from '@/constants/auth'

type RouteHandler = (req: NextRequest) => Promise<NextResponse>

export function withPermission(
  handler: RouteHandler,
  requiredPermission: Permission,
): RouteHandler {
  return async (req) => {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: StatusCodes.UNAUTHORIZED },
      )
    }

    const userPermissions = permissionsFromRole(session.role as Role)

    if (!userPermissions.includes(requiredPermission)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: StatusCodes.FORBIDDEN },
      )
    }

    return handler(req)
  }
}
```

## ProtectedComponent for Conditional Rendering

```typescript
// components/auth/protected-component.tsx
'use client'

import { useIsAuthorized } from '@/hooks/useIsAuthorized'
import type { Permission } from '@/constants/auth'

type ProtectedComponentProps = Readonly<{
  permissions: Permission[]
  children: React.ReactNode
  fallback?: React.ReactNode
}>

export function ProtectedComponent({
  permissions,
  children,
  fallback = null,
}: ProtectedComponentProps) {
  const isAuthorized = useIsAuthorized(permissions)
  return isAuthorized ? <>{children}</> : <>{fallback}</>
}
```

### Usage

```tsx
<ProtectedComponent permissions={[permissions.MANAGE_PRODUCTS]}>
  <DeleteButton />
</ProtectedComponent>

<ProtectedComponent permissions={[permissions.ADMIN_ACCESS]} fallback={<p>Admin only</p>}>
  <AdminPanel />
</ProtectedComponent>
```
