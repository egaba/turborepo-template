# Auth Debugging & Testing

Common auth errors, debugging strategies, session inspection, and testing patterns.

## Debugging Table

| Issue                   | Cause                            | Solution                                       |
| ----------------------- | -------------------------------- | ---------------------------------------------- |
| CSRF token mismatch     | `NEXTAUTH_URL` wrong             | Set to actual dev server URL                   |
| Session is `null`       | Missing `SessionProvider`        | Wrap app root in `<SessionProvider>`           |
| 403 on protected routes | Permission/role mapping wrong    | Check `rolePermissionMap` + session role field |
| Token refresh fails     | Expired refresh token            | User must re-authenticate                      |
| Callback URL mismatch   | Provider redirect URI stale      | Update authorized redirect URIs in provider    |
| `NEXTAUTH_SECRET` error | Missing or changed secret        | Set consistent secret across environments      |
| Infinite redirect loop  | Middleware matching sign-in page | Exclude `/login` from middleware matcher       |
| OAuth state mismatch    | Multiple tabs or stale state     | Clear cookies, retry sign-in                   |

## Debugging Strategy

### 1. Check Environment Variables

```bash
# Verify required vars are set (never log secret values)
echo "NEXTAUTH_URL=$NEXTAUTH_URL"
echo "NEXTAUTH_SECRET is $([ -n "$NEXTAUTH_SECRET" ] && echo 'set' || echo 'MISSING')"
```

### 2. Inspect Session

```typescript
// Client-side
const { data: session, status } = useSession()
console.log('Session:', JSON.stringify(session, null, 2))
console.log('Status:', status)

// Server-side
const session = await getServerSession(authOptions)
console.log('Server session:', session)

// Browser console
fetch('/api/auth/session')
  .then((r) => r.json())
  .then(console.log)
```

### 3. Check NextAuth Debug Mode

```typescript
// app/api/auth/[...nextauth]/config.ts
export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  // ... rest of config
}
```

### 4. Inspect JWT Token

```typescript
import { getToken } from 'next-auth/jwt'

// In an API route or middleware
const token = await getToken({ req })
console.log('JWT token:', token)
```

## Testing Patterns

### Mock Session in Tests

```typescript
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: { name: 'Test User', email: 'test@example.com' },
      role: 'admin',
      userId: 'user-1',
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))
```

### Mock Unauthenticated State

```typescript
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))
```

### Mock Server Session

```typescript
jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { name: 'Test User', email: 'test@example.com' },
    role: 'editor',
    userId: 'user-1',
  }),
}))
```

### Test Permission Hook

```typescript
import { renderHook } from '@testing-library/react'
import { useIsAuthorized } from '@/hooks/useIsAuthorized'
import { permissions } from '@/constants/auth'

// With the admin mock session above:
it('grants admin permissions', () => {
  const { result } = renderHook(() => useIsAuthorized([permissions.ADMIN_ACCESS]))
  expect(result.current).toBe(true)
})
```

## Common Mistakes

- Forgetting `SessionProvider` in test wrappers or app layout
- Using `getServerSession` without passing `authOptions`
- Not excluding auth routes from middleware matcher
- Hardcoding `NEXTAUTH_URL` instead of using environment variables
- Missing type augmentation for custom session fields (see nextauth-config reference)
