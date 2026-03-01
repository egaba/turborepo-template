# NextAuth.js Configuration

Generic NextAuth.js setup with JWT strategy, multiple providers, and callbacks.

## Key Files

- `app/api/auth/[...nextauth]/config.ts` -- `AuthOptions` export
- `app/api/auth/[...nextauth]/route.ts` -- Route handler
- `middleware.ts` -- Route protection

## Route Handler (App Router)

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from './config'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

## Auth Config (JWT Strategy)

```typescript
// app/api/auth/[...nextauth]/config.ts
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const user = await authenticateUser({
          email: credentials?.email,
          password: credentials?.password,
        })
        if (!user) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    jwt: jwtCallback,   // see below
    session: sessionCallback, // see below
  },
}
```

## JWT Callback

Runs on every request. Populate token on initial sign-in, handle updates, refresh expired tokens.

```typescript
async function jwtCallback({ token, user, account, trigger, session }) {
  if (account && user) {
    token.userId = user.id
    token.email = user.email
    token.role = user.role
    token.provider = account.provider
    token.accessToken = user.accessToken
    token.refreshToken = user.refreshToken
    token.expiresAt = Date.now() + 3600 * 1000
  }
  if (trigger === 'update' && session) {
    token = { ...token, ...session }
  }
  if (token.expiresAt && Date.now() > token.expiresAt && token.refreshToken) {
    try {
      const refreshed = await refreshAccessToken(token.refreshToken as string)
      token.accessToken = refreshed.accessToken
      token.expiresAt = Date.now() + 3600 * 1000
    } catch {
      token.error = 'RefreshTokenError'
    }
  }
  return token
}
```

## Session Callback

Maps JWT token fields to the client-visible session object.

```typescript
async function sessionCallback({ session, token }) {
  session.userId = token.userId as string
  session.email = token.email as string
  session.role = token.role as string
  session.accessToken = token.accessToken as string
  session.error = token.error as string | undefined
  return session
}
```

## Type Augmentation

Extend NextAuth types to include custom fields on Session, User, and JWT.

```typescript
// types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    userId: string
    email: string
    role: string
    accessToken: string
    error?: string
  }
  interface User {
    role: string
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    role: string
    provider: string
    accessToken: string
    refreshToken?: string
    expiresAt: number
    error?: string
  }
}
```
